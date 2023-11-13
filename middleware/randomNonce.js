const crypto = require('crypto');

const { generateNonce, getCSPHeader } = require('../config_csp');


// Middleware to generate a random nonce for each request
const nonceMiddleware = (req, res, next) => {
    // Generate a random nonce
    const nonce = generateNonce();
  
    // Set the CSP header in the response
    res.setHeader('Content-Security-Policy', getCSPHeader(nonce));

  
    // Set the nonce in a local variable for later use in the response
    res.locals.nonce = nonce;
  
    next();
};

module.exports = nonceMiddleware ;