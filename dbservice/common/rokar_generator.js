const pool = require('./db_pool');

async function initializeCounter() {
  try {
    const client = await pool.connect();

    try {
      const result = await client.query('SELECT counter_value FROM counter WHERE current_month = $1', [new Date().getMonth()]);

      if (result.rows.length > 0) {
        return result.rows[0].counter_value;
      } else {
        // If no counter value is found for the current month, initialize it to 1
        await client.query('INSERT INTO counter (current_month, counter_value) VALUES ($1, 1) ON CONFLICT (current_month) DO NOTHING', [new Date().getMonth()]);
        return 1;
      }
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

async function updateCounter(counterValue) {
  try {
    await pool.query('UPDATE counter SET counter_value = $1 WHERE current_month = $2', [counterValue, new Date().getMonth()]);
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
    console.log(value); // The incremented value

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
