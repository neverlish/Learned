## 12 User Sign Up: Save User in DB

`$ postgres`

`$ createdb reddice`

`$ npm i -g knex`

`$ knex init`

`$ knex migrate:make users`
 
```
Using environment: development
Created Migration: /Users/jinhohyeon/Desktop/dev/Learned/react/yt-remzolothky-reactredux/migrations/20180517173129_users.js
```

`$ knex migrate:latest`
```
Batch 1 run: 1 migrations 
/Users/jinhohyeon/Desktop/dev/Learned/react/yt-remzolothky-reactredux/migrations/20180517173129_users.js
```

`$ psql reddice`

`$ select * from users`
