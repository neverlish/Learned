from pyspark.sql import SparkSession

if __name__ == "__main__":
    ss: SparkSession = SparkSession.builder \
        .master("local") \
        .appName("spark_jobs_ex") \
        .config("spark.sql.adaptive.enabled", False) \
        .getOrCreate()

    df = ss.read.option("header", "true") \
        .option("inferSchema", "true") \
        .csv("data/titanic_data.csv")

    # 1. repartition ex)

    df1 = df.repartition(10)
    df2 = df.repartition(10, "Age")
    # SparkUI Storage tab에서 각 partition의 사이즈를 확인.
    df1.cache()
    df2.cache()

    df1.count()
    df2.count()

    # 2. coalesce ex)
    df3 = df.repartition(20) \
        .where("Pclass = 1") \
        .select("PassengerId", "Survived") \
        .coalesce(5) \
        .where("Age >= 20") \

    # trigger action
    df3.count()

    df3.count()

    while True:
        pass
