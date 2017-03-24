function pushSomethingIntoCollection<T>(something: T, collection: T[]) {
  collection.push(something);
  console.log(collection);
}

let jeanGrey = { name: 'Jean Grey' };
let wolverine = { name: 'Wolverine' };

let superHeroes = [jeanGrey];
let powers = ['telekinesis', 'esp'];

// pushSomethingIntoCollection(wolverine, superHeroes);
// pushSomethingIntoCollection('adamantium claws', powers);
// 함수에 <T>를 지정해도 되고, 지정하지 않아도 됨

interface SuperHero { name: string; }

pushSomethingIntoCollection<SuperHero>(wolverine, superHeroes);
pushSomethingIntoCollection<string>('adamantium claws', powers);

// pushSomethingIntoCollection('meh', superHeroes);
// The type argument for type parameter 'T' cannot be inferred from the usage. Consider specifying the
//  type arguments explicitly.
//   Type argument candidate '"meh"' is not a valid type argument because it is not a supertype of candidate '{ name: string; }'
