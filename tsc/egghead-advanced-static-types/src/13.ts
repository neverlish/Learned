// 13 Transform Existing Types Using Mapped Types in TypeScript

interface Point {
  x: number;
  y: number;
}

// const origin: Point = { x: 0, y: 0 };
const origin =  Object.freeze({ x: 0, y: 0 }); // freeze<T>(o: T): Readonly<T>;
// origin.x = 1; // Cannot assign to 'x' because it is a constant or a read-only property.
// origin.y = 1; // Cannot assign to 'y' because it is a constant or a read-only property.

// type ReadonlyPoint = Readonly<Point>;
type ReadonlyPoint = {
  readonly [P in keyof Point]: Point[P];
};

///////////

let point: Partial<Point>;
point = { x: 0, y: 0 };
point = { x: 0 };
point = { y: 0 };
point = {};

type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

// type NullablePoint = Nullable<Point>;
type NullablePoint = Nullable<Point>;

// let point2: Nullable<Point>;
let point2: NullablePoint;
point2 = { x: 0, y: 0 };
point2 = { x: 0, y: null };
point2 = { x: null, y: 0 };

// point2 = { x: null }; 
/* 
Type '{ x: null; }' is not assignable to type 'Nullable<Point>'. 
Property 'y' is missing in type '{ x: null; }'. 
Partial 이 적용된 type 이면 가능함
*/

type Stringify<T> = {
  [P in keyof T]: string;
}

type PartialNullablePoint = Partial<Nullable<Stringify<Point>>>;
let point3: PartialNullablePoint;
point3 = { x: '0', y: '0' };
point3 = { x: '0' };
point3 = { x: undefined, y: null };
