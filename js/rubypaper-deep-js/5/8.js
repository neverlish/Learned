// 5 디자인 패턴 - 8 Self-invoking constructor 패턴

(function() {
  function Employee(name, manMonth) {
    if (!(this instanceof Employee)) {
      return new Employee(name, manMonth);
    }

    this.name = name;
    this.manMonth = manMonth;
  }

  var unikys = Employee('Unikys', 1),
      world = new Employee('World', 2);

  console.log(unikys);
  console.log(world);
}());
