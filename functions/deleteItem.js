const { readStock, writeStock, getFile } = require('./utils/githubStore');

exports.handler = async function(event) {
  try{
    const body = event.body ? JSON.parse(event.body) : {};
    const id = body.id || (event.queryStringParameters && event.queryStringParameters.id);
    if(!id) return { statusCode: 400, body: 'Missing id' };
    const file = await getFile();
    const sha = file ? file.sha : null;
    const items = await readStock();
    const idx = items.findIndex(i=>i.id===id);
    if(idx === -1) return { statusCode: 404, body: 'Not found' };
    const removed = items.splice(idx,1)[0];
    await writeStock(items, sha);
    return { statusCode: 200, body: JSON.stringify(removed) };
  }catch(e){
    return { statusCode: 500, body: String(e.message) };
  }
};
