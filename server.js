import path from 'path';
import express from 'express';

const PORT = process.env.HTTP_PORT || 4001;
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const mysql = require("mysql");

const connection = mysql.createConnection({
  host: process.env.RDS_HOSTNAME,
  user: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  port: process.env.RDS_PORT,
  database: process.env.RDS_DB_NAME
});

connection.connect(function(err) {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
});


app.use(express.static(path.join(__dirname, 'client', 'build')));// <-- Get front-end

app.get('/', (req, res) => {
  res.send('just gonna send it');
});

app.get('/data', (req, res) => {
  connection.query(
    'SELECT * FROM comments',
    (error, results) => {
      //console.log(results);
      res.json(results);
    }
  );

});

app.post('/data/create', (req, res) => {
  //console.log(req.body);
  const name = req.body.name;
  const text = req.body.text;
  //console.log(`${name} and ${text}`);
  connection.query('INSERT INTO comments (name, text) VALUES (?, ?)', [name, text], (err, result) => {
    if (err) throw err;
    })
});

app.post('/data/delete', (req, res) => {
  const id = req.body.id;
  connection.query('DELETE FROM comments WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    })
});

app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}.`);
});