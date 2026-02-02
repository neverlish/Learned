package com.spark.cassandra

import org.apache.spark.SparkConf
import com.datastax.spark.connector._
import org.apache.spark.SparkContext

/**
 * Retrieve all books with genre “crime”
 * Output format should be Author name: Book Name (publish year) [rating]
 * 
 */

object SparkCassandraProcess {
  
   def main(args: Array[String]): Unit = {
     
     val conf = new SparkConf()
      conf.set("spark.cassandra.connection.host", "localhost")
      conf.setMaster("local[*]")
      conf.setAppName("Spark Cassandra Integration")
      
     
      val sc = new SparkContext(conf)
      val books = sc.cassandraTable("popularbooks","books_by_author")
	                  .select("author_name","book_name","publish_year","rating","genres")
	                  
	                  
	    val filteredBooks = books.filter { row  => row.getSet[String]("genres").contains("Crime")}
      filteredBooks.map{row =>
                              row.getString("author_name")+":"+
                              row.getString("book_name")+
                              "("+ row.getInt("publish_year")+")"+
                               "["+row.getFloatOption("rating").getOrElse("No Rating")+"]"
                    }.collect.foreach(println)

     
   }
  
}