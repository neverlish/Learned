(ns s03.petstore)

(defn petToHumanAge
  "This function returns the age of a pet in human years"
  [x]
  (def petStore {'dog 7, 'cat 5, 'goldfish 10})
  (get petStore x))

(defn age
  "This function retus the age of a pet"
  [petName petType petAge]
  (def ratio (petToHumanAge petType))
  (println petName "is" (* ratio petAge) "years old in human years"))

