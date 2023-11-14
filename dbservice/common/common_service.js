const dbConnectionPool = require('./db_pool');


const getRokarList = async (rokar) => {
  const rokarArray = [];
  const query = {
    name: 'get-all-rokar',
    text: `SELECT rokar FROM fleetwise_schema.loading order by loaddt desc`,
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


const getRokarGadiList = async (rokar) => {
  const rokarArray = [];
  const query = {
    name: 'get-all-rokar',
    text: `SELECT rokar, vehiclenumber  FROM fleetwise_schema.loading where rokar  = $1 order by loaddt desc`,
    values: [rokar],
  }
  
  try {
    const result = await dbConnectionPool.query(query);
    result.rows.forEach((r) => rokarArray.push(`{rokar : ${r.rokar}, gadiNumber: ${r.vehiclenumber} }`));
    return rokarArray;
  } catch (error) {
    console.error('Error:', error);
  }
}


  module.exports = { getRokarList };

  