const Url = require("../models/Url");

async function getUrlAnalytics(req, res) {
    const url = await Url.findOne({ shortUrl: req.params.alias });
    if (!url) {
      return res.status(404).send('URL not found');
    }
    
    res.json({ totalClicks: 123, uniqueClicks: 100 }); 
  }
  
  module.exports = { getUrlAnalytics };
  