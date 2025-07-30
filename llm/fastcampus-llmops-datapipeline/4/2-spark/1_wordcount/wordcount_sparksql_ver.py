from pyspark.sql import SparkSession

import pyspark.sql.functions as f

if __name__ == "__main__":
    spark: SparkSession = (SparkSession.builder
                           .master("local")
                           .appName("wordCount SparkSQL ver")
                           .getOrCreate())
    
    df = spark.read.text("data/words.txt")

    # df.show(truncate=False)
    df = (df.withColumn('word', f.explode(f.split(f.column('value'), ' ')))
          .withColumn('count', f.lit(1))
          .groupBy('word')
          .sum())
    
    df.orderBy('word').show()