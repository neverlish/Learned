(ns s04.Sequences)

(defn Seq
  []
  (def colors (seq ["red" "green" "blue"]))
  (println colors)

  (println (cons "yellow" colors))
  (println (cons colors "yellow"))

  (println (conj colors "yellow"))
  (println (conj ["red" "green" "blue"] "yellow"))

  (println (concat colors (seq ["black" "white"])))

  (println (distinct (seq [1 2 3 5 3 5 2 4])))

  (println (reverse colors))

  (println (first colors))
  (println (rest colors))
  (println (last colors))

  (println (sort (seq [1 2 3 5 3 5 2 4]))))

(Seq)