interface Crocodile { personality: string; }
interface Taxes { year: number; }
interface Container<T> { unit: T; }

let crocContainer: Container<Crocodile> = { unit: { personality: "mean" } };
let taxContainer: Container<Taxes> = { unit: { year: 2011 } };

interface RedCroc extends Crocodile { color: 'red'; }
interface BlueCroc extends Crocodile { color: 'blue'; }
interface CrocContainer<T extends Crocodile> { crocUnit: T; }

let redCrocContainer: CrocContainer<RedCroc> = { crocUnit: { personality: 'irate', color: 'red' } };
let blueCrocContainer: CrocContainer<BlueCroc> = { crocUnit: { personality: 'cool', color: 'blue' } };

class ClassyContainer<T extends Crocodile> {
  classyCrocUnit: T;
}

let classyCrocContainer = new ClassyContainer();
classyCrocContainer.classyCrocUnit = { personality: 'classy'};

let classyCrocContainer2 = new ClassyContainer<RedCroc>();
classyCrocContainer2.classyCrocUnit = { personality: 'classy', color: 'red' };

class CCC<T extends Crocodile> {
  constructor(public cccUnit: T) {}
}

let ccc = new CCC({ personality: 'ultra classy', likesCheetos: true });
// let ccc2 = new CCC<BlueCroc>({ personality: 'ultra classy', likesCheetos: true, color: 'blue' });
// Argument of type '{ personality: string; likesCheetos: boolean; color: "blue"; }' is not assignable to parameter of type 'BlueCroc'.

let ccc2 = new CCC<BlueCroc>({ personality: 'ultra classy', color: 'blue' });
