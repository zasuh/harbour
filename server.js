require('dotenv').config();

const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const axios = require('axios');

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

const app = express();
app.use(
  cors({
    origin: 'https://harbour-frontend.onrender.com',
  })
);
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
    const data = response.data;
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
  const initialMessage = [
    {
      role: 'system',
      content:
        'Act as a senior frontend software engineer with experience building scalable and maintainable react.js applications serving millions of users.',
    },
    {
      role: 'user',
      content:
        'You must, every time and always return a general assessment at the beginning and a recap at the end.',
    },
    {
      role: 'user',
      content:
        'You must, every time and always return a bullet point for each area of assessment and at least one bullet point for every assessment.',
    },
    {
      role: 'user',
      content:
        'You must, every time and always return the HTML answer with titles of assessment being bolded.',
    },
  ];

  const bestPractices = [
    {
      role: 'user',
      content:
        'You must, every time and always act as a code review/due diligence person. I will get a single file with React or Javascript code and I need to check for react best practices.',
    },
  ];

  const codeStyleMessages = [
    {
      role: 'user',
      content:
        'You must, every time and always check for code style and linting',
    },
  ];

  const functionsMessages = [
    {
      role: 'user',
      content:
        'You must, every time and always check for input validation, error handling and correct types for inputs.',
    },
    {
      role: 'user',
      content:
        'You must, every time and always check for function naming and the consistency for that naming.',
    },
    {
      role: 'user',
      content:
        'You must, every time and always check for the amount of nesting in functions and their complexity.',
    },
  ];

  const complexityMessages = [
    {
      role: 'user',
      content:
        'You must, every time and always count the amount of lines of code, methods, functions.',
    },
    {
      role: 'user',
      content:
        'You must, every time and always provide a cyclomatic complexity index.',
    },
  ];

  const unitTestMessages = [
    {
      role: 'user',
      content: 'You must, every time and always write exactly 1 unit test.',
    },
  ];

  const code = [
    {
      role: 'user',
      content: `This is the code you are working with: ${req.body.prompt}}`,
    },
  ];

  try {
    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: 'gpt-3.5-turbo',
        messages: [
          ...initialMessage,
          ...bestPractices,
          ...functionsMessages,
          ...unitTestMessages,
          ...code,
        ],
        max_tokens: 500,
        temperature: 0.75,
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
