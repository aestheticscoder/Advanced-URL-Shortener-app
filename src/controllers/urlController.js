const Url = require('../models/Url');
const shortid = require('shortid');
const redis = require('redis');
const client = redis.createClient();

// Rate limiting middleware
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 60 * 1000, 
  max: 5,
  message: "Too many requests, please try again later."
});

// Create Short URL
async function createShortUrl(req, res) {
  const { longUrl, customAlias, topic } = req.body;
  const shortUrl = customAlias || shortid.generate();
  const newUrl = new Url({ longUrl, shortUrl, user: req.user._id, topic });
  await newUrl.save();
  
  res.status(200).json({ shortUrl: `http://localhost:5000/${shortUrl}`, createdAt: new Date() });
}


module.exports = { createShortUrl };
