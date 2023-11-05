const redis = require('redis');
const { promisify }  = require('util');

const redisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    enable_offline_queue: false,
    // password: process.env.REDIS_PASSWORD,
  });

// redis.js doesn't support async utils as of writing this article
// we can use the recommended workaround
const getAsync = promisify(redisClient.get).bind(redisClient);
const setAsync = promisify(redisClient.set).bind(redisClient);

module.exports = {redisClient, getAsync, setAsync};