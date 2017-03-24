interface SuperHero {
  powers: string[];
  savesTheDay: () => void;
}

let dazzler: SuperHero = {
  powers: ['transduces sonic vibrations into light','a'],
  savesTheDay() { console.log(`Dazzler ${this.powers} to save the day!!!`); }
};

interface BadGuy {
  badDeeds: string[];
  getRandomBadDeed: () => string;
  commitBadDeed: () => void;
}

let badGuy: BadGuy = {
  badDeeds: ['farts on old folks', "doesn't picks up his dog's poop", 'steals from babies'],
  getRandomBadDeed() { return this.badDeeds[Math.floor(Math.random() * this.badDeeds.length)]; },
  commitBadDeed() { console.log(`BadGuy ${this.getRandomBadDeed()}`); }
}

function saveDayOrBadDeed(something: SuperHero | BadGuy) {
  // if (something.powers) { 
  // 에러: roperty 'powers' does not exist on type 'SuperHero | BadGuy'. Property 'powers' does not exist on type 'BadGuy'

  if ((something as SuperHero).powers) {
    (something as SuperHero).savesTheDay();
  } else {
    (something as BadGuy).commitBadDeed();
  }
}

saveDayOrBadDeed(dazzler);
saveDayOrBadDeed(badGuy);
