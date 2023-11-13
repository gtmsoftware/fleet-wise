const pool = require('./db_pool');

const newRokarNumber = async () => {
  try {
    const client = await pool.connect();

    try {
      // update incremented counter value for the current monthin DB
      const rokarIdResult = await client.query('SELECT fleetwise_schema.get_next_rokar_id() as next_rokar_id');

      const nextRokarId = rokarIdResult.rows[0].next_rokar_id;

      console.log('Next Rokar ID:', nextRokarId);

      return nextRokarId;

    } finally {
      // Release the client connection back to the pool
      client.release();
    }
  } catch (error) {
    // Rollback the transaction in case of an error
    console.error('Error:', error);
    throw error;
  }
}

module.exports = { newRokarNumber };
