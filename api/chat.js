export default async function handler(req, res) {
  if(req.method !== 'POST') return res.status(405).end();
  
  const { prompt, useWeb } = req.body;
  
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_KEY}`;
  
  const body = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: { temperature: 0.7, maxOutputTokens: 2048 }
  };
  
  if(useWeb) body.tools = [{ google_search: {} }];
  
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  
  const data = await response.json();
  res.status(200).json(data);
    }
