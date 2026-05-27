
const crypto = require('crypto');
const { readStock, writeStock, getFile } = require('./utils/githubStore');

exports.handler = async function(event) {
  try{
    const body = event.body ? JSON.parse(event.body) : {};
    if(!body.name) return { statusCode: 400, body: 'Missing name' };
    const file = await getFile();
    const sha = file ? file.sha : null;
    const items = await readStock();
    const item = { id: crypto.randomUUID(), name: body.name, qty: Number(body.qty||0), meta: body.meta||{} , created_at: new Date().toISOString() };
    items.push(item);
    await writeStock(items, sha);
    return { statusCode: 201, body: JSON.stringify(item) };
  }catch(e){
    return { statusCode: 500, body: String(e.message) };
  }
};
