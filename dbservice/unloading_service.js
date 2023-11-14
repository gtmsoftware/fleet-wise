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
const saveUnLoading = async (unloaddt, sale_point, buyer, weight, rate, total, cr_dr, vehiclenumber, rokar) => {
  console.log("Started :: Save UnLoading");
  const query = {
    name: 'save-unloading',
    text: 'SELECT fleetwise_schema.save_unloading($1::timestamp, $2::integer, $3::integer, $4::numeric, $5::numeric, $6::numeric, $7::text, $8::text, $9::text)',
    values: [unloaddt, sale_point, buyer, weight, rate, total, cr_dr, vehiclenumber, rokar],
  }

  try {
    const result = await dbConnectionPool.query(query);
    console.log('UnLoading Entry added successfully');
  } catch (error) {
    console.error('Error:', error);
  }
}



const getUnLoadingReport = async (time_range) => {
  console.log("Started :: Get Loading Report");
  const query = {
    name: 'get-unloading-report',
    text: `SELECT sm.seller_name as seller , bm.buyer_name as buyer, ul.cr_dr, ul.vehiclenumber, ul.rokar, ul.unloaddt, ul.weight, ul.rate, ul.total FROM fleetwise_schema.unloading ul 
    inner join fleetwise_schema.buyer_master bm  on ul.buyer  = bm.id 
    inner join fleetwise_schema.seller_master sm on ul.sale_point  = sm.id
    order by ul.unloaddt desc`,
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