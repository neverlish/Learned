from pyspark import SparkContext, StorageLevel
from pyspark.sql import SparkSession

if __name__ == "__main__":
    ss: SparkSession = (
        SparkSession.builder
        .master("local")
        .appName("cache_persistence_ex")
        .config("spark.driver.memory", "4g")
        .getOrCreate()
    )
    sc: SparkContext = ss.sparkContext

    data = [i for i in range(1, 50000000)]

    rdd = ((sc.parallelize(data)
           .map(lambda v: [v, v ** 2, v ** 3]))
           .filter(lambda v : v[0] <= 1000000))
    rdd.persist(StorageLevel.DISK_ONLY)
    rdd.count()
    rdd.count()
    rdd.count()

    while True:
        pass
