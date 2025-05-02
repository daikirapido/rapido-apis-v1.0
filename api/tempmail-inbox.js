const axios = require('axios');

exports.config = {
  name: "Tempmail-Inbox",
  version: "1.0.0",
  author: "@jm",
  description: "",
  category: "tempmail",
  method: "get",
  link: ["/tempmail/inbox?email="]
};

exports.initialize = async function({ req, res }) {
  const { email } = req.query;
  if (!email) return res.status(400).json({ error: "Email parameter required" });
  
  try {
    const response = await axios.get(`https://api.internal.temp-mail.io/api/v3/email/${email}/messages`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch inbox",
      details: error.response?.data || error.message
    });
  }
};