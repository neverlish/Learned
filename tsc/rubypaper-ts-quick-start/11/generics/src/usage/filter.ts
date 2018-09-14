// 11-4-2 인터페이스를 상속해 제네릭 확장하기 - IFilter 제네릭 인터페이스와 Filter 제네릭 클래스

interface IFilter<T> {
  unique(array: Array<T>): Array<T>
}

class Filter<T> implements IFilter<T> {
  unique(array: Array<T>): Array<T> {
    return array.filter((v, i, array) => array.indexOf(v) === i);
  }
}

let myFilter = new Filter<string>();
let resultFilter = myFilter.unique(['a', 'b', 'c', 'a', 'b']);
console.log(resultFilter);

