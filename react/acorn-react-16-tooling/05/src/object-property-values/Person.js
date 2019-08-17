// @flow
import React from 'react';

type Person = {
  name: string,
  age: number
};

type Props = {
  person: Person
};

export default ({ person }: Props) => (
  <section>
    <h3>Person</h3>
    <p><strong>Name: </strong>{person.name}</p>
    <p><strong>Age: </strong>{person.age}</p>
  </section>
);
