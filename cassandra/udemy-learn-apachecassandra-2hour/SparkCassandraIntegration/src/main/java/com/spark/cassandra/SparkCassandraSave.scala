package com.spark.cassandra


import org.apache.spark.SparkConf
import com.datastax.spark.connector._
import org.apache.spark.SparkContext

/**
 * Save Books that belongs to Crime to below Table
 * 
 * CREATE TABLE crime_books (
 * author_name TEXT,
 * publish_year INT,
 * book_name TEXT,
 * rating FLOAT,
 * PRIMARY KEY((author_name),publish_year)
)
 */


case class Books_Info(author_name:String,book_name:String,publish_year:Int,rating:Option[Float],genres:Set[String])


object SparkCassandraSave {
  
  def main(args: Array[String]): Unit = {
      val conf = new SparkConf()
      conf.set("spark.cassandra.connection.host", "localhost")
      conf.setMaster("local[*]")
      conf.setAppName("Spark Cassandra Integration")
      
     
      val sc = new SparkContext(conf)
      val books = sc.cassandraTable[Books_Info]("popularbooks","books_by_author")
	                  .select("author_name","book_name","publish_year","rating","genres")
	                  
	                  
	    val crime_Books = books.filter(book => book.genres.contains("Crime"))  
	    crime_Books.saveToCassandra("popularbooks", "crime_books", SomeColumns("author_name","publish_year","book_name","rating"))
	    
  }
}