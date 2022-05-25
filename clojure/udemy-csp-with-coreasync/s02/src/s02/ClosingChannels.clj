(ns s02.ClosingChannels
  (:require [clojure.core.async :refer [chan <!! >!! close!]]))

(let [c (chan)]
  (future
    (dotimes [x 2]
      (>!! c x))
    (close! c)
    (println "Closed."))
  (future
    (loop []
      (when-some [v (<!! c)]
        (println "Got: " v)
        (recur)))
    (println "Existing")))
