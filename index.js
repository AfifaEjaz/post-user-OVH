import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import { urlencoded } from 'express';
import express from 'express';
import connectMongo from './db/dbconnection.js';
import router from './user/router.js';
import { fileURLToPath } from 'url';
import path from 'path'
const app = express()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientPath = path.join(__dirname, './client/dist');
console.log(clientPath);
app.use('/', express.static(clientPath))

const port = 3000

app.use(express.json())
app.use(urlencoded({ extended: false }));
app.use(cors(
  {
      origin: "http://localhost:5173",
      credentials: "true"
  }
))

// Connect to MongoDB
const databaseName = process.env.DB_NAME;
const URL = process.env.URL ;
connectMongo(URL, databaseName);

app.use('/api/user', router);

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'./client/dist/index.html'))
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})