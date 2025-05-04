import 'dotenv/config';
import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
const port = 8010;

const TOGETHER_API_KEY = process.env.TOGETHER_API_KEY;

if (!TOGETHER_API_KEY) {
  console.error('FATAL ERROR: TOGETHER_API_KEY is not defined in environment variables.');
  process.exit(1);
}

app.use(cors({
  origin: 'http://localhost:5173',
  methods: '*',
  allowedHeaders: '*',
  credentials: true
}));
app.use(express.json());


app.get('/', (req, res) => {
  res.json({ message: 'Server is running correctly' });
});

app.get('/ask', (req, res) => {
  res.json({ message: 'The /ask endpoint is working, but requires a POST request with a transcript parameter' });
});

app.post('/ask', async (req, res) => {
  const { transcript } = req.body;

  if (!transcript) {
    return res.status(400).json({ error: 'Transcript is required.' });
  }

  try {
    await new Promise((resolve) => setTimeout(resolve, 2000)); // 2s delay

    const response = await axios.post(
      'https://api.together.xyz/v1/chat/completions',
      {
        model: 'meta-llama/Llama-3.3-70B-Instruct-Turbo-Free',
        messages: [
          { role: 'system', content: 'You are a helpful assistant who gives short, concise and meaningful answers in 200 words' },
          { role: 'user', content: transcript }
        ],
        temperature: 0.7,
        max_tokens: 300,
      },
      {
        headers: {
          Authorization: `Bearer ${TOGETHER_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const aiResponse = response.data.choices[0].message.content.trim();
    res.json({ aiResponse });
    console.log(aiResponse);

  } catch (error) {
    console.error(error?.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch AI response.' });
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong on the server!' });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});