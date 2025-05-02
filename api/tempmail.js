const axios = require('axios');

exports.config = {
  name: "Tempmail-Gen",
  version: "1.0.0",
  author: "@jm",
  description: "",
  category: "tempmail",
  method: "get",
  link: ["/tempmail/gen"]
};

exports.initialize = async function({ req, res }) {
  try {
    const response = await axios.post('https://api.internal.temp-mail.io/api/v3/email/new');
    res.json({
      email: response.data.email
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to generate temp email",
      details: error.response?.data || error.message
    });
  }
};