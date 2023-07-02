
import axios from 'axios';
export const getGPT4Stream = (params) => {
    const config = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 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'
    }
    // const url = ''
    const data = {
        "model": "gpt-3.5-turbo",
        "messages": [{ "role": "user", "content": params.content }],
        "temperature": 0.7,
        "stream": true
    }
    const instan = axios.create({
        baseURL: 'https://api.openai.com/v1/chat',
        data: JSON.stringify(data),
        headers: config,
        proxy: {
            protocol: 'http',
            host: 'localhost',
            port: 3000,
        },
        responseType: 'stream'
    })
    return instan.post('/completions', data)
}

