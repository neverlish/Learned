package com.coralogix;


import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.NullWritable;
import org.apache.hadoop.mapreduce.Job;
import org.apache.hadoop.mapreduce.Mapper;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.input.TextInputFormat;
import org.elasticsearch.hadoop.mr.EsOutputFormat;
import org.elasticsearch.hadoop.util.WritableUtils;

import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.Map;

public class AccessLogIndexIngestion {

    public static class AccessLogMapper extends Mapper {
        @Override
        protected void map(Object key, Object value, Context context) throws IOException, InterruptedException {

            String logEntry = value.toString();
            // Split on space
            String[] parts = logEntry.split(" ");
            Map<String, String> entry = new LinkedHashMap<>();

            // Combined LogFormat "%h %l %u %t \"%r\" %>s %b \"%{Referer}i\" \"%{User-agent}i\"" combined
            entry.put("ip", parts[0]);
            // Cleanup dateTime String
            entry.put("dateTime", parts[3].replace("[", ""));
            // Cleanup extra quote from HTTP Status
            entry.put("httpStatus", parts[5].replace("\"",  ""));
            entry.put("url", parts[6]);
            entry.put("responseCode", parts[8]);
            // Set size to 0 if not present
            entry.put("size", parts[9].replace("-", "0"));

            context.write(NullWritable.get(), WritableUtils.toWritable(entry));
        }
    }


    public static void main(String[] args) throws IOException, ClassNotFoundException, InterruptedException {
        // Set system properties first
        System.setProperty("HADOOP_USER_NAME", System.getProperty("user.name"));
        System.setProperty("hadoop.home.dir", "/tmp");
        
        // Create a new configuration
        Configuration conf = new Configuration();
        
        // Disable security
        conf.set("hadoop.security.authentication", "simple");
        conf.set("hadoop.security.authorization", "false");
        conf.set("dfs.permissions.enabled", "false");
        
        // Set job configuration
        conf.set("mapreduce.framework.name", "local");
        conf.set("mapreduce.jobtracker.address", "local");
        conf.set("fs.defaultFS", "file:///");
        
        // Elasticsearch configuration
        conf.set("es.nodes", "localhost:9200");
        conf.set("es.resource", "logs");
        conf.set("es.nodes.wan.only", "true");
        conf.set("es.index.auto.create", "true");
        conf.set("es.batch.write.retry.count", "3");
        
        // Create job instance with configuration
        Job job = Job.getInstance(conf, "AccessLogIndexingJob");
        
        // Set job properties
        job.getConfiguration().setBoolean("mapreduce.map.speculative", false);
        job.getConfiguration().setBoolean("mapreduce.reduce.speculative", false);
        job.getConfiguration().set("mapreduce.job.user.name", System.getProperty("user.name"));
        job.setInputFormatClass(TextInputFormat.class);
        job.setOutputFormatClass(EsOutputFormat.class);
        job.setMapperClass(AccessLogMapper.class);
        job.setNumReduceTasks(0);

        FileInputFormat.addInputPath(job, new Path(args[0]));
        System.exit(job.waitForCompletion(true) ? 0 : 1);
    }

}
