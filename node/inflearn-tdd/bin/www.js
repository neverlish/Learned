const app = require('../');
const syncDb = require('./sync-db');

syncDb().then(_ => {
  console.log('Sync database!');
  app.listen(3000, () => {
    console.log('Server is running ion port 3000!');
  })
})
