const dbConnectionPool = require('../dbservice/db_pool');

/**
 * Check DB Connection Pool Intilised
 */
!(async () => {
  const result = await dbConnectionPool.query('SELECT NOW()');
  result ? console.log(' DB Connection Success ') : console.error(' DB Connection Failed ');
})();


/**
 * 
 * SELECT sale_point, buyer, cr_dr, vehiclenumber, rokar, loadingid, "timestamp", loaddt, weight, rate, total FROM fleetwise_schema.loading;
 * 
 */
const getLoading = async (rokar) => {
  console.log("Started :: Get Loading");
  const query = {
    name: 'get-loading-by-rokar',
    text: 'SELECT sale_point, buyer, cr_dr, vehiclenumber, rokar, loaddt, weight, rate, total FROM fleetwise_schema.loading WHERE rokar = $1',
    values: [rokar],
  }
  
  try {
    const result = await dbConnectionPool.query(query);
    console.log('Loading Entry Fetched :', result.rows);
  } catch (error) {
    console.error('Error:', error);
  }
}

const saveLoading = async (loaddt, sale_point, buyer, weight, rate, total, cr_dr, vehiclenumber, rokar) => {
  console.log("Started :: Save Loading");
  const query = {
    name: 'save-loading',
    text: 'INSERT INTO fleetwise_schema.loading (loaddt, sale_point, buyer, weight, rate, total, cr_dr, vehiclenumber, rokar) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
    values: [loaddt, sale_point, buyer, weight, rate, total, cr_dr, vehiclenumber, rokar],
  }
  
  try {
    const result = await dbConnectionPool.query(query);
    console.log('Loading Entry added with ID:', result.rows[0]);
  } catch (error) {
    console.error('Error:', error);
  }
}

module.exports = { getLoading , saveLoading};