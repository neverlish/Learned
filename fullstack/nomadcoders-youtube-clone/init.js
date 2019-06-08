import dotenv from "dotenv";
import app from "./app";
import "./db";

import "./models/Comment";
import "./models/Video";
import "./models/User";

dotenv.config();

const PORT = process.env.PORT || 4000;

const handlerListening = () =>
  console.log(`Listening on http://localhost:${PORT}`);

app.listen(PORT, handlerListening);
