// 29 Find the intersection of sets with Semigroups

const Task = require('data.task')
const Either = require('data.either')
const request = require('request')
const { first, eitherToTask, Sum, Pair } = require('./lib')

const argv = new Task((rej, res) => res(process.argv))
const names = argv.map(args => args.slice(2))

const httpGet = url =>
  new Task((rej, res) => 
    request(url, (error, response, body) =>
      error ? rej(error) : res(body)))

const parse = Either.try(JSON.parse)

const getJSON = url => 
  httpGet(url)
  .map(parse)
  .chain(eitherToTask)

const findArtist = name =>
  getJSON(`https://api.spotify.com/v1/search?q=${name}&type=artist`)
  .map(result => result.artists.item)
  .map(first)
  .chain(eitherToTask)

const relatedArtists = id =>
  getJSON(`https://api.spotify.com/v1/artists/${id}/related-artists`)
  .map(result => result.artists)

const Intersection = xs =>
({
  xs,
  concat: ({xs: ys}) =>
    Intersectionn(xs.filter(x => ys.some(y => x === y)))
})

const related = name =>
  findArtist(name)
  .map(parse)
  .map(artist => artist.id)
  .chain(relatedArtists)
  .map(artists => artists.map(artist => artist.name))

const artistIntersection = rels =>
  rels
  .foldMap(x => Pair(Intersection(x), Sum(x.length))).xs
  .bimap(x => x.xs, y => y.x)
  .toList()

const main = names =>
  List(names)
  .traverse(Task.of, related)
  .map(artistIntersection)

names.chain(main).fork(console.error, console.log)
