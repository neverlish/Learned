const API_URL = "http://localhost:8888";
const AUTH_URL = "http://localhost:3000";

let ACCESS_TOKEN = undefined;
const webAuth = new auth0.WebAuth({
  domain: 'neverlish.auth0.com',
  clientID: 'jMZC5EuecTFE7T8YeSSWC36iMmwxJ9Zg',
  responseType: 'token',
  audience: 'egghead-demo',
  scope: '',
  redirectUri: window.location.href
});

const headlineBtn = document.querySelector("#headline");
const secretBtn = document.querySelector("#secret");
const loginBtn = document.querySelector("#loginBtn");
const logoutBtn = document.querySelector("#logoutBtn");

headlineBtn.addEventListener("click", () => {
  fetch(`${API_URL}/resource`).then(resp => {
    return resp.text();
  }).then(data => {
    UIUpdate.alertBox(data);
  });
});

secretBtn.addEventListener("click", (event) => {
  let headers = {};
  if (ACCESS_TOKEN) {
    headers = {
      'Authorization': `Bearer ${ACCESS_TOKEN}`
    };
  }
  fetch(`${API_URL}/resource/secret`, { headers }).then(resp => {
    UIUpdate.updateCat(resp.status);
    return resp.text();
  }).then(data => {
    UIUpdate.alertBox(data);
  });
});

logoutBtn.addEventListener("click", (event) => {
  ACCESS_TOKEN = undefined;
  UIUpdate.loggedOut();
});

loginBtn.addEventListener("click", (event) => {
  webAuth.authorize();
});

const parseHash = () => {
  webAuth.parseHash((err, authResult) => {
    if (authResult && authResult.accessToken) {
      window.location.hash = '';
      ACCESS_TOKEN = authResult.accessToken;
      UIUpdate.loggedIn();
    }
  });
};

window.addEventListener('DOMContentLoaded', parseHash);
