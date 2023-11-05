const dbConnectionPool = require('./common/db_pool');

/**
 * 
 * @param { Roker Number } rokar 
 * 
 * Will Return UnLoading Record Based on Rokar Number
 */
const getUnLoading = async (rokar) => {
  console.log("Started :: Get UnLoading");
  const query = {
    name: 'get-unloading-by-rokar',
    text: 'SELECT sale_point, buyer, cr_dr, vehiclenumber, rokar, loaddt, weight, rate, total FROM fleetwise_schema.unloading WHERE rokar = $1',
    values: [rokar],
  }
  
  try {
    const result = await dbConnectionPool.query(query);
    console.log('UnLoading Entry Fetched :', result.rows);
    //console.log('UnLoading Entry Fetched 2:', result.rows);
    return result.rows;
  } catch (error) {
    console.error('Error:', error);
  }
}

/**
 * 
 * @param { UnLoading Date } loaddt 
 * @param { Sales Point } sale_point 
 * @param { Buyer } buyer 
 * @param { Weight } weight 
 * @param { Rate } rate 
 * @param { Total } total 
 * @param { Credit Or Debit } cr_dr 
 * @param { Vehicle Number } vehiclenumber 
 * @param { ROKAR Number } rokar 
 */
const saveUnLoading = async (loaddt, sale_point, buyer, weight, rate, total, cr_dr, vehiclenumber, rokar) => {
  console.log("Started :: Save UnLoading");
  const query = {
    name: 'save-unloading',
    text: 'INSERT INTO fleetwise_schema.unloading (unloaddt, sale_point, buyer, weight, rate, total, cr_dr, vehiclenumber, rokar) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
    values: [loaddt, sale_point, buyer, weight, rate, total, cr_dr, vehiclenumber, rokar],
  }
  
  try {
    const result = await dbConnectionPool.query(query);
    console.log('UnLoading Entry added with ID:', result.rows[0]);
  } catch (error) {
    console.error('Error:', error);
  }
}


const getUnLoadingReport = async (time_range) => {
  console.log("Started :: Get Loading Report");
  const query = {
    name: 'get-unloading-report',
    text: 'SELECT sale_point, buyer, cr_dr, vehiclenumber, rokar, unloaddt, weight, rate, total FROM fleetwise_schema.unloading',
    values: [],
  }
  
  try {
    const result = await dbConnectionPool.query(query);
    const dataArray = [];
    result.rows.forEach((d) => dataArray.push(d));
    return dataArray;
  } catch (error) {
    console.error('Error:', error);
  }
}

module.exports = { getUnLoading , saveUnLoading , getUnLoadingReport};