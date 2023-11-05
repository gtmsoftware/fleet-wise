const dbConnectionPool = require('./common/db_pool');

const getSellerNameList = async () => {

    const dataArray = [];
    const query = {
      name: 'get-all-seller-name',
      text: 'SELECT  id, seller_name  FROM fleetwise_schema.seller_master ',
      values: [],
    }
    
    try {
      const result = await dbConnectionPool.query(query);
      result.rows.forEach((d) => dataArray.push(d));
      return dataArray;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  module.exports = {  getSellerNameList };