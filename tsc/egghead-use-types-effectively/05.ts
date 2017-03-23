interface AttackFunction {
  (opponent: {alias: string; health: number;}, attackWith: number): number;
}

interface KrustyTheClown {
  alias: string;
  health: number;
  inebriationLevel: number;
  attack: AttackFunction;
}

interface OptionalAttributes{
  strength?: number;
  insanity?: number;
  dexterity?: number;
  healingFactor?: number;
}

interface ComicBookCharacter extends OptionalAttributes {
  secretIdentity?: string;
  alias: string;
  health: number;
  attack: AttackFunction;
}


function attackFunc(opponent, attackWith) {
  opponent.health -= attackWith;
  console.log(`${this.alias} attacked ${opponent.alias}, who's health = ${opponent.health}`);
  return opponent.health;
}

let superHero: ComicBookCharacter = {
  // alias: true,
  alias: 'She-Hulk',
  health: 500,
  strength: 5000,
  attack: attackFunc
}

let superVillian: ComicBookCharacter = {
  secretIdentity: 'Jack Napier',
  alias: 'Joker',
  health: 75,
  insanity: 145,
  attack: attackFunc
}

function getSecretIdentity(character: ComicBookCharacter) {
  if (character.secretIdentity) {
    console.log(`${character.alias} is ${character.secretIdentity}`);
  } else {
    console.log(`${character.alias} has no secret identity`);
  }
}

superHero.attack(superVillian, superHero.strength);
