const axios = require("axios");

exports.config = {
    name: 'gemini',
    author: '@jm',
    description: 'A large language model, trained by Google.',
    method: 'get',
    category: 'ai',
    link: ['/gemini?chat=hello']
};

exports.initialize = async function ({ req, res }) {
    const { chat } = req.query;

    if (!chat) {
        return res.status(400).json({ error: 'The "chat" parameter is required.' });
    }

    try {
        const payload = {
            contents: [
                {
                    parts: [
                        { text: chat }
                    ]
                }
            ]
        };

        const response = await axios({
            method: 'post',
            url: 'https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent',
            data: payload,
            headers: {
                'Content-Type': 'application/json',
                'x-goog-api-key': 'AIzaSyAM5TngKks5XIqqBfAGLibg4ewXacT7lPc'
            }
        });

        if (response.status !== 200) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const textdata = response.data.candidates[0].content.parts.find(part => part.text)?.text;

        res.json({
            status: true,
            response: textdata || "No response generated",
            author: this.config.author
        });
    } catch (error) {
        console.error("Error:", error);

        const errorMessage = error.response?.data?.error?.message || error.message || 'Internal Server Error';

        res.status(error.response?.status || 500).json({
            status: false,
            error: errorMessage
        });
    }
};