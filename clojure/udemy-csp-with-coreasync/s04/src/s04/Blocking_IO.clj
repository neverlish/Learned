(ns s04.Blocking-IO
  (:require [clojure.core.async :refer [<!! >!! chan]]))

(def logging-chan (chan 24))

(future
  (loop []
    (when-some [v (<!! logging-chan)]
      (println v)
      (recur))))

(defn log [& args]
  (>!! logging-chan (apply str args)))


(do (future
      (dotimes [x 100]
        (log "(..." x "...)")))
    (future
      (dotimes [x 100]
        (log "(..." x "...)"))))