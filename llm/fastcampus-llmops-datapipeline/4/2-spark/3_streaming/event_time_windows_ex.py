from pyspark.sql import SparkSession
from pyspark.sql.window import Window
import pyspark.sql.functions as F
from pyspark.sql.types import StructType, StructField, StringType, IntegerType, TimestampType

if __name__ == "__main__":
    ss: SparkSession = SparkSession.builder \
        .master("local[2]") \
        .appName("Event time windows ex") \
        .getOrCreate()

    domain_traffic_schema = StructType([
        StructField("id", StringType(), False),
        StructField("domain", StringType(), False),
        StructField("count", IntegerType(), False),
        StructField("time", TimestampType(), False),
    ])

    def read_traffics_from_socket():
        return ss.readStream \
            .format("socket") \
            .option("host", "localhost") \
            .option("port", 12345).load() \
            .select(F.from_json(F.col("value"),
                                domain_traffic_schema)
                    .alias("traffic")).selectExpr("traffic.*")

    # 윈도우 별 트래픽 카운트를 집계

    def aggregate_traffic_counts_by_sliding_window():
        traffics_df = read_traffics_from_socket()
        # window
        window_by_hours = traffics_df.groupby(
            F.window(F.col("time"),
                     windowDuration="2 hours",
                     slideDuration="1 hour"
                     ).alias("time")
        ).agg(F.sum("count").alias("total_count")).select(
            F.col("time").getField("start").alias("start"),
            F.col("time").getField("end").alias("end"),
            F.col("total_count")
        ).orderBy(F.col("start"))

        (window_by_hours.writeStream.format("console")
         .outputMode("complete").start().awaitTermination())


    def aggregate_traffic_counts_by_tumbling_window():
        traffics_df = read_traffics_from_socket()
        # window
        window_by_hours = traffics_df.groupby(
            F.window(F.col("time"),
                     windowDuration="1 hour",
                     slideDuration="1 hour"
                     ).alias("time")
        ).agg(F.sum("count").alias("total_count")).select(
            F.col("time").getField("start").alias("start"),
            F.col("time").getField("end").alias("end"),
            F.col("total_count")
        ).orderBy(F.col("start"))

        (window_by_hours.writeStream.format("console")
         .outputMode("complete").start().awaitTermination())

    # aggregate_traffic_counts_by_sliding_window()

    aggregate_traffic_counts_by_tumbling_window()