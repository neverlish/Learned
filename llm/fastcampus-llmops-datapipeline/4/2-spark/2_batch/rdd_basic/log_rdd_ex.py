from pyspark import SparkContext, RDD
from pyspark.sql import SparkSession

from typing import List

from datetime import datetime

if __name__ == "__main__":
    spark: SparkSession = (SparkSession.builder
                           .master("local")
                           .appName("rdd example ver")
                           .getOrCreate())
    
    sc: SparkContext = spark.sparkContext

    log_rdd: RDD[str] = sc.textFile("data/log.txt")

    # print(f"count of RDD ==> {log_rdd.count()}")
    
    # log_rdd.foreach(print)

    def parse_lint(row: str) -> List[str]:
        return row.strip().split(" | ")
    
    parsed_log_rdd: RDD[List[str]] = log_rdd.map(parse_lint)

    def get_only_404(row: List[str]) -> bool:
        status_code = row[3]

        return status_code == "404"
    
    rdd_404: RDD[List[str]] = parsed_log_rdd.filter(get_only_404)

    def get_only_2xx(row: List[str]) -> bool:
        status_code = row[3]

        return status_code.startswith("2")
    
    rdd_normal: RDD[List[str]] = parsed_log_rdd.filter(get_only_2xx)

    def get_post_request_and_playbooks_api(row: List[str]) -> bool:
        log = row[2].replace("\"", "")

        return log.startswith("POST") and "/playbooks" in log
    
    rdd_post_playbooks: RDD[List[str]] = parsed_log_rdd.filter(get_post_request_and_playbooks_api)

    def extract_api_method(row: List[str]) -> tuple[str, int]:
        api_method = row[2].replace("\"", "").split(" ")[0]

        return api_method, 1
    
    rdd_count_by_api_method = parsed_log_rdd.map(extract_api_method).reduceByKey(lambda c1, c2: c1 + c2).sortByKey()

    
    def extract_hour_and_minute(row: List[str]) -> tuple[str, int]:
        date_time = row[1].replace("[", "").replace("]", "")

        date_format = "%d/%b/%Y:%H:%M:%S"
        date_time_obj = datetime.strptime(date_time, date_format)

        return f"{date_time_obj.hour}:{date_time_obj.minute}", 1
    
    rdd_count_by_hour = parsed_log_rdd.map(extract_hour_and_minute).reduceByKey(lambda c1, c2: c1 + c2).sortByKey()

    rdd_count_by_hour.foreach(print)

    def extract_cols(row: List[str]) -> tuple[str, str, str]:
        ip = row[0]
        status_code = row[3]
        api_log = row[2].replace("\"", "")
        api_method = api_log.split(" ")[0]

        return status_code, api_method, ip
    
    rdd = parsed_log_rdd.map(extract_cols).map(lambda x: ((x[0], x[1]), x[2])).groupByKey().mapValues(list)

    # rdd.foreach(print)

    (parsed_log_rdd.map(extract_cols).map(lambda x: ((x[0], x[1]), x[2]))
     .reduceByKey(lambda i1, i2: f"{i1}, {i2}")
     .map(lambda row: (row[0], row[1].split(",")))
     .foreach(print))
    
    
    