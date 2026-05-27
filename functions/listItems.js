const { readStock } = require('./utils/githubStore');

exports.handler = async function() {
  const items = await readStock();
  return { statusCode: 200, body: JSON.stringify(items) };
};
