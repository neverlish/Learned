from pyspark.sql import SparkSession
import pyspark.sql.functions as F

if __name__ == "__main__":
    ss: SparkSession = SparkSession.builder \
        .master("local[2]") \
        .appName("streaming dataframe join examples") \
        .getOrCreate()

    authors = ss.read \
        .option("inferSchema", True).json("data/authors.json")

    books = ss.read \
        .option("inferSchema", True).json("data/books.json")

    # 1. join (static, static)
    authors_books_df = authors.join(books,
                                    authors["book_id"] == books["id"],
                                    "inner")

    # 2. join (static, stream)
    def join_static_with_stream():
        streamed_books = (
            ss.readStream.format("socket")
            .option("host", "localhost")
            .option("port", 12345)
            .load()
            .select(F.from_json(F.col("value"), books.schema)
                    .alias("book"))
            .selectExpr("book.id as id",
                        "book.name as name",
                        "book.year as year")

        )

        authors_books_df = \
            authors.join(streamed_books,
                         authors["book_id"] == streamed_books["id"],
                         "right"
                         )

        (authors_books_df
         .writeStream
         .format("console")
         .outputMode("append")
         .start().awaitTermination())

    # join_static_with_stream()

    def join_stream_with_stream():
        streamed_books = (
            ss.readStream.format("socket")
            .option("host", "localhost")
            .option("port", 12345)
            .load()
            .select(F.from_json(F.col("value"), books.schema)
                    .alias("book"))
            .selectExpr("book.id as id",
                        "book.name as name",
                        "book.year as year")

        )

        streamed_authors = (
            ss.readStream.format("socket")
            .option("host", "localhost")
            .option("port", 12346)
            .load()
            .select(F.from_json(F.col("value"), authors.schema)
                    .alias("author"))
            .selectExpr("author.id as id",
                        "author.name as name",
                        "author.book_id as book_id")

        )

        authors_books_df = streamed_authors.join(
            streamed_books,
            streamed_authors["book_id"] == streamed_books["id"],
            "inner",
            #  "full"
        )

        (authors_books_df
         .writeStream
         .format("console")
         .outputMode("append").trigger(processingTime="2 seconds")
         .start().awaitTermination())

    join_stream_with_stream()
