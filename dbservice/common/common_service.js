const dbConnectionPool = require('../db_pool');


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
  module.exports = { getRokarList , getGadiList };

  