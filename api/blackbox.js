const axios = require('axios');

exports.config = {
    name: 'blackbox',
    method: 'get',
    category: 'ai',
    link: ['/blackbox?q=&uid=']
};

exports.initialize = async function({req, res}) {
    const { uid, q } = req.query;

    if (!uid || !q) {
        return res.status(400).json({ error: 'Both uid and q parameters are required' });
    }

    const payload = {
        messages: [
            {
                role: "user",
                content: q,
                id: uid
            }
        ],
        agentMode: {},
        id: uid,
        previewToken: null,
        userId: null,
        codeModelMode: true,
        trendingAgentMode: {},
        isMicMode: false,
        userSystemPrompt: null,
        maxTokens: 1024,
        playgroundTopP: null,
        playgroundTemperature: null,
        isChromeExt: false,
        githubToken: "",
        clickedAnswer2: false,
        clickedAnswer3: false,
        clickedForceWebSearch: false,
        visitFromDelta: false,
        isMemoryEnabled: false,
        mobileClient: false,
        userSelectedModel: null,
        validated: "00f37b34-a166-4efb-bce5-1312d87f2f94",
        imageGenerationMode: false,
        webSearchModePrompt: false,
        deepSearchMode: false,
        domains: null,
        vscodeClient: false,
        codeInterpreterMode: false,
        customProfile: {
            name: "",
            occupation: "",
            traits: [],
            additionalInfo: "",
            enableNewChats: false
        },
        session: null,
        isPremium: true,
        subscriptionCache: null,
        beastMode: false
    };

    const headers = {
        'Authority': 'www.blackbox.ai',
        'Accept': '*/*',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-US,en;q=0.9',
        'Cache-Control': 'no-cache',
        'Content-Length': JSON.stringify(payload).length.toString(),
        'Origin': 'https://www.blackbox.ai',
        'Pragma': 'no-cache',
        'Referer': 'https://www.blackbox.ai/',
        'Sec-Ch-Ua': '"Not A(Brand";v="8", "Chromium";v="132"',
        'Sec-Ch-Ua-Mobile': '?1',
        'Sec-Ch-Ua-Platform': '"Android"',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    };

    try {
        const response = await axios.post('https://www.blackbox.ai/api/chat', payload, { headers });
        res.json({
            response: response.data
        });
    } catch (error) {
        res.status(500).json({
            error: 'Request failed'
        });
    }
};