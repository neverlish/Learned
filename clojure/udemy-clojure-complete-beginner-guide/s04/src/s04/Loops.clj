(ns s04.Loops)

(defn Loop
  []
  (println "\nLoop:")
  (loop [x 0]
    (when (< x 10)
      (println x)
      (recur (inc x)))))

(defn DoTimes
  []
  (println "\nDoTimes:")
  (dotimes [x 10]
    (println x)))

(defn WhileDo
  [count]
  (println "\nWhileDo:")
  (def x (atom 0))
  (while (< @x count)
    (do
      (println @x)
      (swap! x inc))))

(defn DoSeq
  [seq]
  (println "\nDoSeq:")
  (doseq [x seq]
    (println (inc x))))