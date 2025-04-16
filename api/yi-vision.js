const axios = require('axios');

exports.config = {
  name: 'Yi Vision',
  author: '@jm',
  description: '',
  method: 'get',
  category: 'ai',
  link: ['/yi-vision?ask=&uid=&image=']
};

exports.initialize = async function({ req, res }) {
  const { ask, uid, url } = req.query;
  if (!ask || !uid) return res.status(400).json({ error: 'Missing required parameters: ask and uid' });

  try {
    const messages = [];
    
    if (url) {
      messages.push({
        role: "user",
        content: [
          {
            type: "image_url",
            image_url: { url: url }
          },
          {
            type: "text",
            text: ask
          }
        ]
      });
    } else {
      messages.push({ role: "user", content: ask });
    }

    const response = await axios.post('https://api.lingyiwanwu.com/v1/chat/completions', {
      model: "yi-vision",
      messages
    }, {
      headers: {
        'Authorization': 'Bearer 4969422156694a67ad0e8fed2ea7bbae',
        'Content-Type': 'application/json'
      }
    });

    res.json({ 
      response: response.data.choices[0].message.content,
      usage: response.data.usage
    });
    
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'Request failed',
      details: error.response?.data || error.message 
    });
  }
};