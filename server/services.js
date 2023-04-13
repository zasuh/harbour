const axios = require('axios');
const {
  initialMessage,
  bestPractices,
  functionsMessages,
  unitTestMessages,
} = require('./prompts');

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

const getBestPracticesAssessment = async (code, token) => {
  return await axios.post(
    OPENAI_API_URL,
    {
      model: 'gpt-3.5-turbo',
      messages: [...initialMessage, ...bestPractices, ...code],
      max_tokens: 1000,
      temperature: 0.3,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const getFunctionsAssessment = async (code, token) => {
  return await axios.post(
    OPENAI_API_URL,
    {
      model: 'gpt-3.5-turbo',
      messages: [...initialMessage, ...functionsMessages, ...code],
      max_tokens: 1000,
      temperature: 0.3,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const getUnitTestAssessment = async (code, token) => {
  return await axios.post(
    OPENAI_API_URL,
    {
      model: 'gpt-3.5-turbo',
      messages: [...unitTestMessages, ...code],
      max_tokens: 1000,
      temperature: 0.3,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

module.exports = {
  getBestPracticesAssessment,
  getFunctionsAssessment,
  getUnitTestAssessment,
};
