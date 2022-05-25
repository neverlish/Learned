(ns s03.Lightweight-Threads
  (:require [clojure.core.async :refer [chan <! >! go <!! >!!]]))

(let [c (chan)]
  (go (dotimes [x 3]
        (>! c x)))
  (go (dotimes [x 3]
        (println "Take: " (<! c)))))
