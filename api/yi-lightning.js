const axios = require('axios');

exports.config = {
  name: 'yi lightning',
  method: 'get',
  author: '@jm',
  description: '',
  category: 'ai',
  link: ['/yi-l?ask=hi&uid=3']
};

exports.initialize = async function({ req, res }) {
  const { ask, uid } = req.query;
  if (!ask || !uid) return res.status(400).json({ error: 'Missing parameters' });
  
  try {
    const response = await axios.post('https://api.lingyiwanwu.com/v1/chat/completions', {
      model: "yi-lightning",
      messages: [{ role: "user", content: ask }]
    }, {
      headers: {
        'Authorization': 'Bearer 4969422156694a67ad0e8fed2ea7bbae',
        'Content-Type': 'application/json'
      }
    });
    res.json({ response: response.data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: 'Request failed' });
  }
};