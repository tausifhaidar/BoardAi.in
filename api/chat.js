export default async function handler(req, res) {
  if(req.method !== 'POST') return res.status(405).end();
  
  const { prompt, useWeb } = req.body;
  
  const url = 'https://api.groq.com/openai/v1/chat/completions';
  
  const body = {
    model: 'llama-3.3-70b-versatile',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
    max_tokens: 2048
  };
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.GROQ_KEY}`
    },
    body: JSON.stringify(body)
  });
  
  const data = await response.json();
  res.status(200).json(data);
    }
