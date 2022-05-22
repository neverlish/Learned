(ns s04.Conditionals)

(defn CondIf
  []
  (println "\nCondIf:")
  (if (= 5 5)
    (println "Equal")
    (println "Not Equal")))

(defn CondIfdo
  []
  (println "\nCondIfDo:")
  (if (= 5 5)
    (do (println "Equal first statement")
        (println "Second statement"))
    (do (println "Not equal first statement")
        (println "Second statement"))))

(defn CondNestedIf
  []
  (println "\nNestedIf:")
  (if (and (= 5 5) (or (= 2 2) (not true)))
    (println "True")
    (println "False")))

(defn CondCase
  [pet]
  (println "\nCondCase:")
  (case pet
    "cat" (println "I have a cat")
    "dog" (println "I have a dog")
    "fish" (println "I have a goldfish")))

(defn CondCond
  [amount]
  (println "\nCondCond:")
  (cond
    (<= amount 2) (println "Few")
    (<= amount 10) (println "Several")
    (<= amount 100) (println "Many")
    :else (println "Loads")))
