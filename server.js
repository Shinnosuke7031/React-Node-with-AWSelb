import path from 'path';
import express from 'express';

const PORT = process.env.HTTP_PORT || 4001;
const app = express();
const fs = require("fs");

const text_json = require('./text.json');


app.use(express.static(path.join(__dirname, 'client', 'build')));// <-- Get front-end

app.get('/', (req, res) => {
  res.send('just gonna send it');
});

app.get('/flower', (req, res) => {
  console.log(text_json);
  res.json(text_json);

});

app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}.`);
});