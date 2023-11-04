const dbConnectionPool = require('./common/db_pool');

/**
 * 
 * @param { Roker Number } rokar 
 * 
 * Will Return Loading Record Based on Rokar Number
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
    //console.log('Loading Entry Fetched 2:', result.rows);
    return result.rows;
  } catch (error) {
    console.error('Error:', error);
  }
}

/**
 * 
 * @param { Loading Date } loaddt 
 * @param { Sales Point } sale_point 
 * @param { Buyer } buyer 
 * @param { Weight } weight 
 * @param { Rate } rate 
 * @param { Total } total 
 * @param { Credit Or Debit } cr_dr 
 * @param { Vehicle Number } vehiclenumber 
 * @param { ROKAR Number } rokar 
 */
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

module.exports = { getLoading , saveLoading };