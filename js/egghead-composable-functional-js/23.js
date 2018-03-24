// 23 Maintaining structure whilst asyncing

const fs = require('fs')
const Task = require('data.task')
const { List, Map } = require('immutable-ext')

const httpGet = (path, params) =>
  Task.of(`${path} result`)

Map({home: (['/', '/home']), about: ['/about-us']})
// .map(route => httpGet(route, {}))
.traverse(Task.of, routes => 
  List(routes)
  .traverse(Task.of, route => httpGet(route, {})))
.fork(console.error, console.log)
/*
Map { "home": List [ "/ result", "/home result" ], "about": List [ "/about-us result" ] }
*/
