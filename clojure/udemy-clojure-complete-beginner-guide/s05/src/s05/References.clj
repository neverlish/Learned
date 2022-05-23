(ns s05.References)

(defn Refs
  []
  (def amount (ref 1000))
  (println @amount)

  (dosync
   (ref-set amount 110))

  (println @amount)

  (dosync
   (alter amount inc))

  (println @amount))

(Refs)