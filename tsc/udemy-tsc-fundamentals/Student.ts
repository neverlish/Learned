class Students {
  // private lName: string;
  // private fName: string;

  // constructor(lName, fName) {

  constructor(private lName, private fName) {
    this.lName = lName;
    this.fName = fName;
  }
  

  GetFullName(): string
  {
    return this.lName + ' ' + this.fName;
  }
}

export = Students
