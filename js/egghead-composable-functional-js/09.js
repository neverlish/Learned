// 09 A curated collection of Monoids and their uses

const { List } = require('immutable-ext');
const { Right, First, Sum, fromNullable } = require('./lib');

const Product = x =>
({
  x,
  concat: ({x: y}) => Product(x * y)
})

Product.empty = () => Product(1)

///////

const Any = x =>
({
  x,
  concat: ({x: y}) => Any(x || y)
})

///////

const Max = x =>
({
  x,
  concat: ({x: y}) => Max(x > y ? x : y)
})

Max.empty = () => Max(-Infinity)

const Min = x =>
({
  x,
  x,
  concat: ({x: y}) => Max(x < y ? x : y)
})

Min.empty = () => Min(Infinity)

const stats = List.of({page: 'Home', views: 40},
                      {page: 'About', views: 10},
                      {page: 'Blog', views: 4})

stats.foldMap(x =>
  fromNullable(x.views).map(Sum), Right(Sum(0)))

///////

const find = (xs, f) =>
  List(xs)
  .foldMap(x =>
    First(f(x) ? Right(x) : Left()), First.empty())
  .fold(x => x)

///////

const Fn = f =>
({
  fold: f,
  concat: o =>
    Fn(x => f(x).concat(o.fold(x)))
})

const hasVowels = x => !!x.match(/[aeiou]/g)
const longWord = x => x.length > 5

const both = Fn(compse(All, hasVowels))
              .concat(Fn(compose(All, longWord)))

