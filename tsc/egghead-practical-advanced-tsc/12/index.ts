const numbers = [2, 1];

const someObject = {
  id: 21,
  name: 'Jonathan'
};

const someBoolean = true;

type FlattenArray<T extends any[]> = T[number];
type FlattenObject<T extends object> = T[keyof T];

type Flatten<T> = T extends any[] ? T[number] :
  T extends object ? T[keyof T] :
  T;

type NumbersArrayFlattened = FlattenArray<typeof numbers>; // --> number
type SomeObjectFlattened = FlattenObject<typeof someObject>; // --> number | string
type SomeBooleanFlattened = Flatten<typeof someObject>; // --> boolean
