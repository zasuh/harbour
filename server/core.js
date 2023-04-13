const axios = require('axios');
const {
  getFunctionsAssessment,
  getBestPracticesAssessment,
  getUnitTestAssessment,
} = require('./services');

const ASSESSMENT_MAPPING = {
  best_practices: getBestPracticesAssessment,
  functions: getFunctionsAssessment,
  unit_tests: getUnitTestAssessment,
};

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

const getCompletion = async (req, res) => {
  const code = [
    {
      role: 'user',
      content: `This is the code you are working with: ${req.body.prompt}}`,
    },
  ];
  const requests = req.body.assessments.map((assessment) => {
    const assessmentFunction = ASSESSMENT_MAPPING[assessment];
    return assessmentFunction(code, req.body.openAiToken);
  });

  try {
    const responses = await Promise.all(requests);
    const data = responses.map((response) =>
      response.data.choices[0].message.content.trim()
    );
    res.status(200).json({ data });
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
