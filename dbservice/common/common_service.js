const dbConnectionPool = require('./db_pool');


const getRokarList = async (rokar) => {
  const rokarArray = [];
  const query = {
    name: 'get-all-rokar',
    text: 'SELECT distinct rokar FROM fleetwise_schema.loading',
    values: [],
  }
  
  try {
    const result = await dbConnectionPool.query(query);
    result.rows.forEach((r) => rokarArray.push(r.rokar));
    return rokarArray;
  } catch (error) {
    console.error('Error:', error);
  }
}


  module.exports = { getRokarList };

  