from pyspark.sql import SparkSession
from pyspark.sql.types import *


def load_user_names(ss: SparkSession):
    schema = StructType([
        StructField("user_id", IntegerType(), False),
        StructField("name", StringType(), False),
    ])

    data = [
        (1, "Andrew"),
        (2, "Chris"),
        (3, "John"),
        (4, "Bob"),
        (6, "Ryan"),
        (7, "Mali"),
        (8, "Tony"),
    ]

    return ss.createDataFrame(data, schema)


def load_user_visits(ss: SparkSession):
    schema = StructType([
        StructField("user_id", IntegerType(), False),
        StructField("visits", IntegerType(), False),
    ])

    data = [
        (1, 10),
        (2, 27),
        (3, 2),
        (4, 5),
        (5, 88),
        (6, 1),
        (7, 5)
    ]

    return ss.createDataFrame(data, schema)


if __name__ == "__main__":
    ss: SparkSession = SparkSession.builder \
        .master("local") \
        .appName("dataframe join ex") \
        .getOrCreate()

    user_names_df = load_user_names(ss)
    user_visits_df = load_user_visits(ss)

    user_names_df.createOrReplaceTempView("user_names")
    user_visits_df.createOrReplaceTempView("user_visits")

    ss.sql(
        f"""
            SELECT *
            FROM user_names AS n
            JOIN user_visits AS v ON n.user_id = v.user_id
        """
    ).show()

    # 1) 컬럼 지정 X : cartesian join (row : M x N 생성) -> 지양!
    user_names_df.join(user_visits_df).show()

    # 2) inner join
    user_names_df.join(user_visits_df, on="user_id").show()

    # 3) left outer join
    user_names_df.join(user_visits_df, on="user_id", how="left")

    # 4) right outer join
    user_names_df.join(user_visits_df, on="user_id", how="right")

    # 5) full outer join
    user_names_df.join(user_visits_df, on="user_id", how="outer").show()

    while True:
        pass


