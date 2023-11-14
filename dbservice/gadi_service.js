const dbConnectionPool = require('./common/db_pool');

const getGadiList = async () => {

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
  };

  const getGadiRokarList = async () => {
    
    const query = {
      name: 'get-gadi-rokar-by-rokar',
      text: `SELECT l.vehiclenumber as gadi_num, l.rokar as rokar_num FROM fleetwise_schema.loading l 
      order by l.loaddt desc`,
      values: [],
    }
    
    try {
      const result = await dbConnectionPool.query(query);
      const dataArray = [];
      // result.rows.forEach((d) => dataArray.push(`{
      //                                     gadi_number: '${d.gadi_num}',
      //                                     rokar_number: '${d.rokar_num}'
      //                                   }`));

      result.rows.forEach((d) => dataArray.push(d));

      // dataArray.push(result.rows).apply(dataArray, result.rows);

      console.log(dataArray);

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
  };

  module.exports = {  getGadiList, getGadiByRokar, getGadiRokarList };