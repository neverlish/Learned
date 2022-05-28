(ns s05.Introduction-to-Backpressure
  (:require [clojure.core.async :refer [go <! >! <!! chan]]))

(def c (chan))

(go
  (loop [i 0]
    (println "Putting: " i)
    (>! c i)
    (recur (inc i))))

(<!! c)
