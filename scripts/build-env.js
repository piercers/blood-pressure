require('dotenv').config()
const fs = require("fs");
const path = require("path");

const data = `
export default {
  apiKey: "${process.env.apiKey}",
  authDomain: "${process.env.authDomain}",
  databaseURL: "${process.env.databaseURL}",
  projectId: "${process.env.projectId}",
  storageBucket: "${process.env.storageBucket}",
  messagingSenderId: "${process.env.messagingSenderId}",
  appId: "${process.env.appId}",
  measurementId: "${process.env.measurementId}",
}
`;

const root = path.join(__dirname, '../');

const tmp = path.join(root, 'tmp');

const filePath = path.join(tmp, 'env.ts');

/**
 * Create `tmp` directory if it doesn't exist already
 */
fs.promises.mkdir(tmp, { recursive: true }).catch(console.error);

/**
 * Write `env` file with populated environment variables
 */
fs.promises.writeFile(filePath, data, 'utf8').catch(error => {
  console.error('[BuildEnv] Error writing env file: ', error);
});
