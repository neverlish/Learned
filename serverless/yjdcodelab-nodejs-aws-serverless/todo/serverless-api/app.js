const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/*', (req, res, next) => {
  res.status(200).send("Hello 양재동 코드랩!");
});

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
