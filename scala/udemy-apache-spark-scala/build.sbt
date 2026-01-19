name := "SparkScalaCourse"

version := "0.2"

scalaVersion := "2.12.20"

libraryDependencies ++= Seq(
  "org.apache.spark" %% "spark-core" % "3.5.6",
  "org.apache.spark" %% "spark-sql" % "3.5.6",
  "org.apache.spark" %% "spark-mllib" % "3.5.6",
  "org.apache.spark" %% "spark-streaming" % "3.5.6",
  "org.twitter4j" % "twitter4j-core" % "4.0.4",
  "org.twitter4j" % "twitter4j-stream" % "4.0.4"
)
