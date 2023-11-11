const pool = require('./db_pool');

async function initializeCounter() {
  try {
    const client = await pool.connect();

    try {
      // Start a transaction and lock the row for the current month
      await client.query('BEGIN');
      const result = await client.query(
        'SELECT counter_value FROM fleetwise_schema.rokar_counter WHERE current_month = $1 FOR UPDATE',
        [new Date().getMonth()]
      );

      if (result.rows.length > 0) {
        // If the row exists, return the counter value
        return result.rows[0].counter_value;
      } else {
        // If no counter value is found for the current month, insert a new row
        const insertResult = await client.query(
          'INSERT INTO fleetwise_schema.rokar_counter (current_month, counter_value) VALUES ($1, 1) RETURNING counter_value',
          [new Date().getMonth()]
        );

        // Commit the transaction and return the inserted counter value
        await client.query('COMMIT');
        return insertResult.rows[0].counter_value;
      }
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



async function updateCounter(counterValue) {
  try {
    await pool.query('UPDATE fleetwise_schema.rokar_counter SET counter_value = $1 WHERE current_month = $2', [counterValue, new Date().getMonth()]);
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

function createIncrementalFunction() {
  return async function () {
    let counter = 0;

    try {
      const initialValue = await initializeCounter();
      counter = initialValue;
    } catch (error) {
      // Handle errors
    }

    counter++;
    await updateCounter(counter); // Update the counter in the database
    return counter;
  };
}

const getLocalDateString = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.toLocaleString('default', { month: 'short' });
  return `${year}-${month.toUpperCase()}`;
};

const newRokarNumber = async () => {
  try {
    // Create an incremental function
    const getNextIncrement = createIncrementalFunction();

    // Example usage:
    const value = await getNextIncrement();
    // console.log(value); // The incremented value

    const localDate = getLocalDateString();
    const newRokarNumber = `${localDate}-${value}`;

    console.log(newRokarNumber);
    return newRokarNumber;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

module.exports = { newRokarNumber };
