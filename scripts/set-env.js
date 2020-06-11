const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

const result = dotenv.config();

if (result.error) {
  throw result.error;
}

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

const filePath = path.join(tmp, 'firebase-config.ts');

fs.promises.mkdir(tmp, { recursive: true }).catch(console.error);

fs.promises.writeFile(filePath, data, 'utf8').catch(error => {
  console.error('[SetEnv] Error writing env file: ', error);
});
