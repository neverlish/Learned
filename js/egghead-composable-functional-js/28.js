// 28 Retrieve and use data from an api with pure functional constructs

const Task = require('data.task')
const Either = require('data.either')
const request = require('request')
const { first, eitherToTask } = require('./lib')

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

const related = name =>
  findArtist(name)
  .map(parse)
  .map(artist => artist.id)
  .chain(relatedArtists)
  .map(artists => artists.map(artist => artist.name))

const main = ([name1, name2]) =>
  Task.of(rels1 => rels2 => [rels2, rels2])
  .ap(related(name1))
  .ap(related(name2))

names.chain(main).fork(console.error, console.log)
