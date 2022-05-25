(ns s02.Buffers
  (:require [clojure.core.async :refer [chan <!! >!!]]))

(let [c (chan 1)]
  (future
    (dotimes [x 3]
      (>!! c x)
      (println "Sent: " x))
    (println "done"))
  (future
    (dotimes [x 3]
      (println "Got: " (<!! c)))
    (println "done getting")))