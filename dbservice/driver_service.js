const dbConnectionPool = require('./common/db_pool');

const getDriverList = async () => {

    const dataArray = [];
    const query = {
      name: 'get-all-vehicle-driver',
      text: 'SELECT id, driver_name  FROM fleetwise_schema.vehicledriver_master',
      values: [],
    }
    
    try {
      const result = await dbConnectionPool.query(query);
      result.rows.forEach((d) => dataArray.push(d));
      return dataArray;
    } catch (error) {
      console.error('Error:', error);
    }
  };

  /* const getGadiRokarList = async () => {

    const query = {
      name: 'get-gadi-rokar-by-rokar',
      text: `SELECT l.vehiclenumber as gadi_num, l.rokar as rokar_num FROM fleetwise_schema.loading l 
      order by l.loaddt desc`,
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
  };


  const getGadiByRokar = async (rokar) => {

    const dataArray = [];
    const query = {
      name: 'get-gadi-rokar-by-rokar',
      text: `SELECT l.vehiclenumber as gadi_num, l.rokar as rokar_num FROM fleetwise_schema.loading l 
      where l.rokar = $1 order by l.loaddt desc`,
      values: [rokar],
    }
    
    try {
      const result = await dbConnectionPool.query(query);
      result.rows.forEach((d) => dataArray.push(`{
                                          gadi_number: ${d.gadi_num},
                                          rokar_number: ${d.rokar_num}
                                        }`));
      return dataArray;
    } catch (error) {
      console.error('Error:', error);
    }
  }; */

  module.exports = {  getDriverList,/*  getGadiByRokar, getGadiRokarList */ };