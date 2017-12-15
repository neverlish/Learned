// poi src/index.js

import {Observable} from 'rxjs'

Observable.interval(1000).subscribe(
  i => (document.getElementById('app').innerHTML = `
    <h1>${i}</h1>
  `)
)

