const dbConnectionPool = require('./common/db_pool');
const { PrismaClient } = require('@prisma/client');


const getBuyerNameList2 = async () => {

  const dataArray = [];
  const query = {
    name: 'get-all-buyer-name',
    text: 'SELECT  id, buyer_name  FROM fleetwise_schema.buyer_master ',
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

const getBuyerNameList = async () => {
  const dataArray = [];

  const prisma = new PrismaClient();

  try {
    // const loadings = await prisma.loading.findMany();
    // const buyer_master = await prisma.buyer_master.findMany();
  const loadings = await prisma.loading.findMany();

    console.log('start');
    console.log(loadings);
    // console.log(buyer_master);
    console.log('end');

    dataArray.push({
      id: 'mockID',
      buyer_name: 'mock_buyer'
    });

    return dataArray;

  } catch (error) {
    console.error('Error:', error);
  }
}

module.exports = { getBuyerNameList };