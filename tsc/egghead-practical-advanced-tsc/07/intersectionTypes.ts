type Cat = IPet & IFeline;

interface ICat extends IPet, IFeline {

}

let cat: ICat;

interface IPet {
  pose(): void;
}

interface IFeline {
  nightvision: boolean;
}
