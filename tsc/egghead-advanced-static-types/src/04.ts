// 04 Make Properties and Index Signatures Readonly in TypeScript

interface User {
  readonly id: number;
  name: string;
}

const user: User = {
  id: 42,
  name: 'Marius'
};

// user.id++; // Cannot assign to 'id' because it is a constant or a read-only property.
user.name += ' Schulz';


class User2 {
  readonly id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

const user2 = new User2(42, 'Marius');
// user2.id++; // Cannot assign to 'id' because it is a constant or a read-only property.
user2.name += ' Schulz';

const weekdays: ReadonlyArray<string> = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

// weekdays[0] = 'Fancyday'; //  Index signature in type 'ReadonlyArray<string>' only permits reading.
// weekdays.length = 0; // Cannot assign to 'length' because it is a constant or a read-only property.
