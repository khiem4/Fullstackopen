import express from 'express';

const app = express();

app.get('/hello', (_req, res) => {
  res.json('hello fullstack');
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});