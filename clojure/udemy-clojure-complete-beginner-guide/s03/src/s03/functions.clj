(ns s03.functions
  (:gen-class))

(defn -main
  "First Function"
  []
  (println "My name is John")
  (println "loving Clojure so far")
  (+ 2 5))


(def increment (fn [x] (+ x 1)))

(defn increment_set
  [x]
  (map increment x))
