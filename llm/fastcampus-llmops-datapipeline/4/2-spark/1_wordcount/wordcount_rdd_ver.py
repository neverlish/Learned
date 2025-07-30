from pyspark import SparkContext, RDD
from pyspark.sql import SparkSession

if __name__ == "__main__":
    spark: SparkSession = SparkSession.builder.master("local").appName("wordCount RDD ver").getOrCreate()

    sc: SparkContext = spark.sparkContext

    text_file: RDD[str] = sc.textFile("data/words.txt")

    counts = text_file.flatMap(lambda line: line.split(" ")) \
        .map(lambda word: (word, 1)) \
        .reduceByKey(lambda count1, count2: count1 + count2)

    output = counts.collect()

    for word, count in output:
        print(f"{word}: {count}")