const crypto = require('crypto');

function generateNonce() {
  // Generate a random nonce
  return crypto.randomBytes(16).toString('base64');
}

function getCSPHeader(nonce) {
  // Return the CSP header using the provided nonce
  return `script-src 'self' https://code.jquery.com https://cdn.datatables.net 'nonce-${nonce}'; style-src 'self' https://code.jquery.com https://cdn.datatables.net`;
}

module.exports = { generateNonce, getCSPHeader };
