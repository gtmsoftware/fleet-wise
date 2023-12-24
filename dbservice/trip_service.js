const dbConnectionPool = require('./common/db_pool');

/**
 * 
 * @param { Round Trip Date} trip_start_date 
 * @param { Vehicle Number } vehicle_number 
 * @param { Driver Id } driver_id 
 * @param { ROKAR Number } rokar 
 * @param { Trip Start Ammount } tripstartamt 
 * @param { Create Time } create_at 
 * @param { Created By} created_by  
 * 
 * will save trip details for any vehicle to start
 */
const saveVehicleTrip = async (trip_start_date, vehicle_number, driver_id,tripstartamt,rokar,created_by) => {
  console.log("Started :: Save Vehicle Trip Entry");
  console.log('tripstartamt',tripstartamt);
  const query = {
    name: 'save-trip',
    text: 'INSERT INTO fleetwise_schema.vehicle_trip_transaction(trip_start_date, vehicle_number, driver_id, tripstartamt,rokar, create_at, created_by) VALUES($1::timestamp, $2::text, $3::text, $4::numeric, $5::text, now(), $6::text)RETURNING *',
    values: [trip_start_date, vehicle_number, driver_id, tripstartamt,rokar,created_by],
  }
  
  try {
    const result = await dbConnectionPool.query(query);
    console.log(' Vehicle Trip Entry added with ID:', result.rows[0].tripid);
  } catch (error) {
    console.error('Error:', error);
  }
}
module.exports = {saveVehicleTrip};