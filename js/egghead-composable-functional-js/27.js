// 27 Build a data flow for a real world app

const Task = require('data.task')

const argv = new Task((rej, res) => res(process.argv))
const names = argv.map(args => args.slice(2))

const related = name =>
  findArtist(name)
  .map(artist => artist.id)
  .chain(relatedArtists)

const main = ([name1, name2]) =>
  Task.of(rels1 => rels2 => [rels2, rels2])
  .ap(related(name1))
  .ap(related(name2))

names.map(main).fork(console.error, console.log)

// https://api.spotify.com/v1/search?q=${query}&type=artists
// https://api.spotify.com/v1/artists/${id}/related-artists

