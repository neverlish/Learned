import "./db";
import app from './app';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 4000;

const handlerListening = () => console.log(`Listening on http://localhost:${PORT}`);

app.listen(PORT, handlerListening);
