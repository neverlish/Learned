const fetch = require('node-fetch');

async function fetchFromGithub(endpoint) {
  const url = `https://api.github.com${endpoint}`;
  const response = await fetch(url);
  return await response.json();
}

async function showUserAndRepos(handle) {
  // const user = await fetchFromGithub(`/users/${handle}`);
  // const repos = await fetchFromGithub(`/users/${handle}/repos`);
  // console.log(user.name);
  // console.log(`${repos.length} repos`);

  const userPromise = fetchFromGithub(`/users/${handle}`);
  const reposPromise = fetchFromGithub(`/users/${handle}/repos`);

  const user = await userPromise;
  const repos = await reposPromise;
  
  console.log(user.name);
  console.log(`${repos.length} repos`);
}

showUserAndRepos('mariusschulz');
