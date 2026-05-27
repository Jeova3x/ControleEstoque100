const { readStock } = require('./utils/githubStore');

exports.handler = async function(event) {
  const id = (event.queryStringParameters && event.queryStringParameters.id);
  if(!id) return { statusCode: 400, body: 'Missing id' };
  const items = await readStock();
  const it = items.find(i=>i.id===id);
  if(!it) return { statusCode: 404, body: 'Not found' };
  return { statusCode: 200, body: JSON.stringify(it) };
};
