const dbConnectionPool = require('./common/db_pool');

const getGadiList = async (rokar) => {

    const dataArray = [];
    const query = {
      name: 'get-all-gadi-number',
      text: 'SELECT distinct gadi_number  FROM fleetwise_schema.vehicle_master vm ',
      values: [],
    }
    
    try {
      const result = await dbConnectionPool.query(query);
      result.rows.forEach((d) => dataArray.push(d.gadi_number));
      return dataArray;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  module.exports = {  getGadiList };