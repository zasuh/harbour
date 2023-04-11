require('dotenv').config();

const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const {
  getDirectoryContents,
  getFileContents,
  getRepository,
  getCompletion,
} = require('./core');

const app = express();
app.use(cors({ origin: '*' }));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.post('/repository', getRepository);
app.post('/file-contents', getFileContents);
app.post('/directory-contents', getDirectoryContents);
app.post('/completion', getCompletion);

app.listen(3001, () => {
  console.log('Server listening on port 3001!');
});
