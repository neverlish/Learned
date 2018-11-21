import express from 'express';
const app = express();

const PORT = 4000;

const handlerListening = () => console.log(`Listening on http://localhost:${PORT}`);

const handleHome = (req, res) => res.send('Hello from home');

const handleProfile = (req, res) => res.send('You are on my profile');

const betweenHome = (req, res, next) => {
  console.log('Between');
  next();
};

app.use(betweenHome);

app.get('/', handleHome);

app.get('/profile', handleProfile);

app.listen(PORT, handlerListening);
