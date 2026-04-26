export default async function handler(req, res) {
  if(req.method !== 'POST') return res.status(405).end();
  
  let payload = req.body;
  if (typeof payload === 'string') {
    try {
      payload = JSON.parse(payload);
    } catch (e) {}
  }
  
  const prompt = payload?.prompt;
  
  if (!prompt) {
    return res.status(400).json({ error: { message: "Prompt is required" } });
  }

  const url = 'https://api.groq.com/openai/v1/chat/completions';
  const apiKey = process.env.GROQ_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: { message: "Server configuration error: Missing API Key" } });
  }

  const body = {
    model: 'llama-3.3-70b-versatile',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
    max_tokens: 2048
  };
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: { message: error.message } });
  }
}
