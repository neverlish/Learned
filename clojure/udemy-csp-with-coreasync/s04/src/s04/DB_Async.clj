(ns s04.DB-Async
  (:require [clojure.core.async :as async :refer [put! chan <!! close!]])
  (:import (com.datastax.driver.core Cluster Row)
           (com.datastax.driver.core.querybuilder QueryBuilder)))

(defn new-connection
  [ip keyspace]
  (let [cluster (Cluster/builder)]
    (.addContactPoint cluster ip)
    (.connect (.build cluster) keyspace)))

(defn execute-async
  [session stmt ch]
  (let [rsf (.executeAsync session stmt)]
    (.addListener
     rsf
     (fn []
       (let [resultset (.getUninterruptibly rsf)]
         (doseq [row (iterator-seq (.iterator resultset))]
           (let [converted (reduce
                            (fn [acc idx]
                              (conj acc (.getString ^Row row (int idx))))
                            []
                            (range (.size (.getColumnDefinitions row))))]
             (put! ch converted)))
         (close! ch)))
     clojure.core.async.impl.exec.threadpool/the-executor)
    ch))

(let [session (new-connection "localhost" "testdb")]
  (<!! (execute-async session "CREATE TABLR user_test
                               (first varchar, last varchar)
                               PRIMARY KEY (first, last)"
                      (chan))))

(let [session (new-connection "localhost" "testdb")]
  (<!! (execute-async session (.. (QueryBuilder/insertInto "user_test")
                                  (value "first" "jim")
                                  (value "last" "smith"))
                      (chan))))

(let [session (new-connection "localhost" "testdb")
      results (execute-async session (.. (QueryBuilder/select)
                                         (from "user_test"))
                             (chan))]
  [(<!! results)
   (<!! results)])
