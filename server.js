import path from 'path';
import express from 'express';

const PORT = process.env.HTTP_PORT || 4001;
const app = express();

const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "aa1035bth7m2t1e.clsbnr7p4q4m.ap-northeast-1.rds.amazonaws.com",
  user: "root",
  password: "MySQL731sin",
  database: "ChatApp",
});

//const text_json = require('./text.json');


app.use(express.static(path.join(__dirname, 'client', 'build')));// <-- Get front-end

app.get('/', (req, res) => {
  res.send('just gonna send it');
});

app.get('/data', (req, res) => {
  //console.log(text_json);
  //res.json(text_json);
  connection.query(
    'SELECT * FROM comments',
    (error, results) => {
      console.log(results);
      res.json(results);
    }
  );

});

app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}.`);
});