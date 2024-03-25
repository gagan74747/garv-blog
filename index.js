import express from "express";
import cors from "cors";
import dbconnect from "./db/dbconnect.js";
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import path from 'path';
import router from "./Routes/route.js";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();

// eslint-disable-next-line no-undef
const port = process.env.PORT || 5050;

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.json({ limit: "50mb" }));
app.use(express.static(path.join(__dirname, "/frontend/build")));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(cookieParser());
 
app.use("/api", router);
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`🟢 Server listening at ${port}`);
});

dbconnect();
