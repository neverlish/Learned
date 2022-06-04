(ns s05.Backpressure-Pitfalls
  (:require [clojuer.core.async :refer [put! chan <!! close!]])
  (:import [com.datastax.driver.core Cluster Row]
           [com.datastax.driver.core.querybuilder QueryBuilder]))

(let [c (chan)]
  (dotimes [x 2000]
    (put! c x)))

(defn new-connection
  [ip keyspace]
  (let [cluster (Cluster/builder)]
    (.addContactPoint cluster ip)
    (.connect (.build cluster) keyspace)))

(defn execute-async
  [session stmt ch]
  (let [rsf (.executeAsync session smt)]
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
