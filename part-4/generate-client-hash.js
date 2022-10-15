const crypto = require('crypto');

HMAC_ALGORITHM = 'sha256';
HMAC_FORMAT = 'hex';
HASH_ENCODING = 'base64';

const arguments = process.argv;

const username = arguments[2];
const clientId = arguments[3];
const clientSecret = arguments[4];

const hmac = crypto.createHmac(HMAC_ALGORITHM, clientSecret);
const data = hmac.update(username + clientId);
const genHmac = data.digest(HMAC_FORMAT);
const buff = Buffer.from(genHmac, HMAC_FORMAT);
const hash = buff.toString(HASH_ENCODING);

console.log('secret hash: ' + hash);
