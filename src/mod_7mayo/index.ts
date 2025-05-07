import express from 'express';
import bodyParser from 'body-parser';
import { songRouter } from './routes.model.js';
import './db.js';

const app = express();
const port = 3000;

app.use(express.json());

app.use(bodyParser.json());

app.use('/api', songRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});