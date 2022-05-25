(ns s02.CreatingChannels
  (:require [clojure.core.async :refer [chan <!! >!!]]))

(let [c (chan)]
  (future (dotimes [x 10]
            (>!! c x)))
  (future (dotimes [x 10]
            (>!! c x)))
  (future (dotimes [x 20]
            (println (<!! c)))))