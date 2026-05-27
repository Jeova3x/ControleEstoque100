const { writeStock } = require('./utils/githubStore');

exports.handler = async function() {
  const initial = [
    { id: 'item-1', name: 'Parafuso M4', qty: 100, meta:{}, created_at: new Date().toISOString() },
    { id: 'item-2', name: 'Porca M4', qty: 200, meta:{}, created_at: new Date().toISOString() }
  ];
  try{
    await writeStock(initial, null);
    return { statusCode: 200, body: 'Seeded' };
  }catch(e){
    return { statusCode: 500, body: String(e.message) };
  }
};
