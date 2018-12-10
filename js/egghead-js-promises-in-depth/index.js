const API_URL = "https://starwars.egghead.training/";
const output = document.getElementById("output");

output.innerText = "Loading ...";

fetch(API_URL + "films")
  .then(response => {
    if (!response.ok) {
      throw Error('Unsuccessful response');
    }
    return response.json().then(films => {
      output.innerText = getFilmTitles(films);
    });
  })
  .catch(error => {
    console.warn(error);
    output.innerText = ':(';
  });

function getFilmTitles(films) {
  return films
    .sort((a, b) => a.episode_id - b.episode_id)
    .map(film => `${film.episode_id}. ${film.title}`)
    .join("\n");
}
