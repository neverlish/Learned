package com.spark.cassandra

import org.apache.spark.SparkConf
import com.datastax.spark.connector._
import org.apache.spark.SparkContext

/**
 * Retrive author_name, book_name and rating of the books that are published after 
 * 2008 by author “James Patterson” using Spark Cassandra Datastax API.
 * 
 */


object SparkCassandra {
  
  
    def main(args: Array[String]): Unit = {
      
      val conf = new SparkConf()
      conf.set("spark.cassandra.connection.host", "localhost")
      conf.setMaster("local[*]")
      conf.setAppName("Spark Cassandra Integration")
      
     
      val sc = new SparkContext(conf)
      sc.setLogLevel("WARN")
      sc.cassandraTable("popularbooks", "books_by_author")
                       .select("author_name","book_name","rating")
                       .where("author_name='James Patterson' AND publish_year > 2008")
                       .collect()  
                       .foreach(println)
     
    
    }
  
}