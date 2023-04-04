require('dotenv').config();

const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const axios = require('axios');

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.post('/repository', async (req, res, next) => {
  try {
    const GH_URL = `https://api.github.com/repos/${req.body.ghUsername}/${req.body.ghRepository}/contents`;
    const response = await axios.get(GH_URL, {
      headers: {
        Authorization: `Bearer ${req.body.ghToken}`,
      },
    });
    const data = response.data;
    res.status(200).json({ data });
  } catch (error) {
    res.status(400);
  }
});

app.post('/file-contents', async (req, res, next) => {
  try {
    const downloadUrl = req.body.downloadUrl;
    const response = await axios.get(downloadUrl, {
      headers: {
        Authorization: `Bearer ${req.body.ghToken}`,
      },
    });
    const data = JSON.stringify(response.data);
    res.status(200).json({ data });
  } catch (error) {
    res.status(400);
  }
});

app.post('/directory-contents', async (req, res, next) => {
  try {
    const GH_URL = `https://api.github.com/repos/${req.body.ghUsername}/${req.body.ghRepository}/contents`;
    const name = req.body.name;
    const response = await axios.get(`${GH_URL}${name}`, {
      headers: {
        Authorization: `Bearer ${req.body.ghToken}`,
      },
    });
    const data = response.data;
    res.status(200).json({ data });
  } catch (error) {
    res.status(400);
  }
});

app.post('/completion', async (req, res, next) => {
  const messages = [
    {
      role: 'system',
      content:
        'Act as a senior frontend software engineer with experience building scalable and maintainable react.js applications serving millions of users.',
    },
    {
      role: 'system',
      content:
        'I need to act as a code review/due diligence person. I will get a single file with React or Javascript code and I need to check for react best practices, style, state management, complexity and vulnerability.',
    },
    {
      role: 'system',
      content:
        'I need to check the usage of hooks, class components, responsiveness and accessibility',
    },
    {
      role: 'system',
      content:
        'I need to check for input validation, error handling, size of functions and maintainability of components',
    },
    {
      role: 'system',
      content:
        'I need to write 3 to 5 unit tests for the file in the Jest framework.',
    },
    {
      role: 'system',
      content:
        'I need to always return a general assessment at the beginning and a recap at the end',
    },
    {
      role: 'system',
      content:
        'I need to always return a bullet point for each area of assessment and at least one bullet point for every assessment. The bullet points are not needed for the general assessment and recap.',
    },
    {
      role: 'system',
      content:
        'I need to count the amount of lines of code, methods, functions',
    },
    {
      role: 'system',
      content: 'I need to provide a cyclomatic complexity index',
    },
    {
      role: 'system',
      content:
        'When I return the HTML answer the titles of sections should be bolded or each point should have a bolded first few words, to better understand it',
    },
    { role: 'user', content: req.body.prompt },
  ];

  try {
    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: 'gpt-3.5-turbo',
        messages,
        max_tokens: 750,
        temperature: 1,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${req.body.openAiToken}`,
        },
      }
    );
    const data = response.data;
    res.status(200).json({ data: data.choices[0].message.content.trim() });
  } catch (error) {
    res.status(400);
  }
});

app.listen(3001, function () {
  console.log('Server listening on port 3001!');
});
