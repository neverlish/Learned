package com.spark.cassandra

import org.apache.spark.SparkConf
import com.datastax.spark.connector._
import org.apache.spark.SparkContext

object SparkCassandraConvertToTuple {
  
   def main(args: Array[String]): Unit = {
      
       val conf = new SparkConf()
      conf.set("spark.cassandra.connection.host", "localhost")
      conf.setMaster("local[*]")
      conf.setAppName("Spark Cassandra Integration")
      
     
      val sc = new SparkContext(conf)
      val books = sc.cassandraTable[(String,String,Int,Option[Float],Set[String])]("popularbooks","books_by_author")
	                  .select("author_name","book_name","publish_year","rating","genres")
	                  .collect.foreach(println)
    }
  
}