(ns s02.AsyncOperations
  (:require [clojure.core.async :refer [chan put! take!]]))

(let [c (chan)]
  (put! c 42 (fn [v] (println "Sent: " v)))
  (take! c (fn [v] (println "Got: " v))))