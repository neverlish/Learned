class ComicBookCharacter {
  constructor(
    public alias: string, public health: number, public strength: number,
    private secretIdentity: string
  ) {}
  getSecretId() { console.log(this.secretIdentity); }
}

class SuperHero extends ComicBookCharacter {
  traits = ['empathy', 'strong moral code'];
}

class SuperVillain extends ComicBookCharacter {
  flaws = ['hubris', 'always explains evil plan'];
  constructor(a,b,c,d) {
    super(a,b,c,d);
    console.log(`${this.alias} eats kittens!!!`);
  }
}

let jubilee = new SuperHero("Jubilee", 23, 233, "Jubilation Lee");
let scarletWitch = new SuperVillain("Scarlet Witch", 233, 4444, "Wanda Maximoff");

console.log(jubilee);
console.log("///");
console.log(scarletWitch)

jubilee.getSecretId();

