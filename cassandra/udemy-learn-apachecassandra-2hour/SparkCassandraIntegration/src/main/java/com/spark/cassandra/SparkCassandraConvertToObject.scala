package com.spark.cassandra

import org.apache.spark.SparkConf
import com.datastax.spark.connector._
import org.apache.spark.SparkContext

/**
 * Use case class
 * Retrieve all books with genre “crime”
 * Output format should be Author name: Book Name (publish year) [rating]
 * 
 */


case class Books(author_name:String,book_name:String,publish_year:Int,rating:Option[Float],genres:Set[String])

object SparkCassandraConvert {
  
    def main(args: Array[String]): Unit = {
      
       val conf = new SparkConf()
      conf.set("spark.cassandra.connection.host", "localhost")
      conf.setMaster("local[*]")
      conf.setAppName("Spark Cassandra Integration")
      
     
      val sc = new SparkContext(conf)
      val books = sc.cassandraTable[Books]("popularbooks","books_by_author")
	                  .select("author_name","book_name","publish_year","rating","genres")
	              
	                  
	    val filteredBooks = books.filter { book  => book.genres.contains("Crime")}
      filteredBooks.map{book =>
                              book.author_name+":"+
                              book.book_name+
                              "("+ book.publish_year+")"+
                               "["+book.rating.getOrElse("No Rating")+"]"
                    }.collect.foreach(println)
    }
}