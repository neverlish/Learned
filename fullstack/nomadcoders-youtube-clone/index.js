const express = require("express");
const app = express();

const PORT = 4000;

function handlerListening() {
  console.log(`Listening on http://localhost:${PORT}`);
}

app.listen(PORT, handlerListening);
