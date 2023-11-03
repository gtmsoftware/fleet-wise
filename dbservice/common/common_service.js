const dbConnectionPool = require('../db_pool');


const getRokarList = async (rokar) => {
  console.log("Started :: Get Loading");

  const rokarArray = [];
  const query = {
    name: 'get-all-rokar',
    text: 'SELECT distinct rokar FROM fleetwise_schema.loading',
    values: [],
  }
  
  try {
    const result = await dbConnectionPool.query(query);
    console.log('Rokar Fetched :', result.rows);
    result.rows.forEach((r) => rokarArray.push(r.rokar));
    // rokarArray.push[result.rows];

    console.log('Rokar Fetched 2:', rokarArray);
    return rokarArray;
  } catch (error) {
    console.error('Error:', error);
  }
}

// const getRokarList = () => {
//     const rokarArray = ['2023-NOV-028', '2023-NOV-029', '2023-NOV-030', '2023-NOV-031', '2023-NOV-032', '2023-NOV-033','2023-NOV-034']; 
  
//     return rokarArray;
//   }

  module.exports = { getRokarList };

  