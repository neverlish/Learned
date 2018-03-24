// 19 Apply multiple functors as arguments to a function (Applicatives)

const { liftA2, Right } = require('./lib');

const $ = selector =>
  Right({selector, height: 10})

const getScreenSize = screen => head => foot =>
  screen - (head.height + foot.height)

const res = liftA2(getScreenSize(800), $('header') ,$('footer'))
console.log(res) // Right(780)

const res2 = Right(getScreenSize(800))
              .ap($('header'))
              .ap($('footer'))
console.log(res2) // Right(780)

$('header').chain(head =>
  $('footer').map(footer =>
    getScreenSize(800, head, footer)))
