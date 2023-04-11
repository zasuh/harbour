const axios = require('axios');
const {
  initialMessage,
  bestPractices,
  functionsMessages,
  codeStyleMessages,
  complexityMessages,
  unitTestMessages,
  code,
} = require('./prompts');

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

const getDirectoryContents = async (req, res, next) => {
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
    console.log('Directory contents error:', error.message);
    res.status(400);
  }
};

const getFileContents = async (req, res, next) => {
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
    console.log('File contents error:', error.message);
    res.status(400);
  }
};

const getRepository = async (req, res, next) => {
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
    console.log('Repository error:', error.message);
    res.status(400);
  }
};

const getCompletion = async (req, res, next) => {
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
          ...codeStyleMessages,
          ...complexityMessages,
          ...unitTestMessages,
          ...code,
        ],
        max_tokens: 1000,
        temperature: 0.1,
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
    console.log('Completion error:', error.message);
    res.status(400);
  }
};

module.exports = {
  getDirectoryContents,
  getFileContents,
  getRepository,
  getCompletion,
};
