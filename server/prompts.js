const fs = require('fs');
const path = require('path');

const templatesDir = path.join(__dirname, 'templates');
const templates = {};
fs.readdirSync(templatesDir).forEach((filename) => {
  const templatePath = path.join(templatesDir, filename);
  templates[filename] = fs.readFileSync(templatePath, 'utf8');
});
const packageJSONFile = fs.readFileSync('package.json', 'utf-8');

const initialMessage = [
  {
    role: 'system',
    content:
      'Act as a senior frontend software engineer with experience building scalable and maintainable react.js applications serving millions of users. You will get an HTML template of how you should format the response.',
  },
  {
    role: 'user',
    content:
      'You must, every time and always return a general assessment at the beginning.',
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
    content: `I want you to use this template: ${templates['best-practices.html']}`,
  },
  {
    role: 'user',
    content:
      'You must, every time and always act as a code review/due diligence person. You will get a single file with React code and you need to check for react best practices.',
  },
  {
    role: 'user',
    content:
      'You must, every time and always check for code duplication, complexity, readability, maintainability, reusability, and testability.',
  },
];

const securityMessages = [
  {
    role: 'user',
    content:
      'You must, every time and always check for security vulnerabilities',
  },
];

const accessibilityMessages = [
  {
    role: 'user',
    content:
      'You must, every time and always give accessibility advice for the code',
  },
];

const outdatedPackages = [
  {
    role: 'user',
    content: `You must, every time and always check for outdated npm packages in this package.json file: ${packageJSONFile}`,
  },
  {
    role: 'user',
    content: 'You must, every time and always check for outdated npm packages',
  },
];

const codeStyleMessages = [
  {
    role: 'user',
    content:
      'You must, every time and always check for code style and linting based on the package.json eslint packages',
  },
];

const functionsMessages = [
  {
    role: 'user',
    content: `I want you to use this template: ${templates['functions.html']}`,
  },
  {
    role: 'user',
    content:
      'You must, every time and always check for consistent function naming, complexity, length, nesting and duplication.',
  },
];

const inputValidationMessages = [
  {
    role: 'user',
    content:
      'You must, every time and always check for input validation, error handling and correct types for inputs.',
  },
];

const complexityMessages = [
  {
    role: 'user',
    content:
      'You must, every time and always count the amount of lines of code & how many methods/functions it has.',
  },
  {
    role: 'user',
    content:
      'You must, every time and always provide a cyclomatic complexity index based on the functions the code has.',
  },
];

const unitTestMessages = [
  {
    role: 'user',
    content: `I want you to use this template: ${templates['unit-test.html']}`,
  },
  {
    role: 'user',
    content: 'You must, every time and always write exactly 1 unit test.',
  },
  {
    role: 'user',
    content:
      'The unit test should cover everything that can be tested in the component.',
  },
];

module.exports = {
  initialMessage,
  unitTestMessages,
  complexityMessages,
  functionsMessages,
  codeStyleMessages,
  bestPractices,
  outdatedPackages,
  accessibilityMessages,
  securityMessages,
  inputValidationMessages,
};
