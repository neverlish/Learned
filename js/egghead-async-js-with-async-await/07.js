const Bluebird = require('bluebird');

async function main() {
  console.log('Working ...');
  // await Promise.resolve(Bluebird.delay(2000));
  await Bluebird.delay(2000);
  console.log('Done.');
}

main();
