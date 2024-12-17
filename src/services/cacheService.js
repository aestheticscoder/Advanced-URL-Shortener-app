const redis = require('redis');
const client = redis.createClient();

function setCache(key, value, expiry = 3600) {
  client.setex(key, expiry, JSON.stringify(value));
}

function getCache(key, callback) {
  client.get(key, (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, JSON.parse(data));
    }
  });
}

module.exports = { setCache, getCache };
