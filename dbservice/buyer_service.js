const dbConnectionPool = require('./common/db_pool');

const getBuyerNameList = async () => {

    const dataArray = [];
    const query = {
      name: 'get-all-buyer-name',
      text: 'SELECT  id, buyer_name  FROM fleetwise_schema.buyer_master ',
      values: [],
    }
    
    try {
      const result = await dbConnectionPool.query(query);
      //result.rows.forEach((d) => dataArray.push(`{${d.id}: ${d.buyer_name}}`));
      result.rows.forEach((d) => dataArray.push(d));
      //console.log(dataArray);
      return dataArray;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  module.exports = {  getBuyerNameList };