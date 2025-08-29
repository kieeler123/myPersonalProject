// yahoo-proxy-node18.js
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());

// Yahoo Finance 프록시 API (Node 18+용 내장 fetch 사용)
app.get('/chart/:symbol', async (req, res) => {
  const symbol = req.params.symbol;
  const interval = req.query.interval || '1d';
  const range = req.query.range || '6mo';

  const yahooUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=${interval}&range=${range}`;

  try {
    const response = await fetch(yahooUrl);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('Yahoo 요청 실패:', err);
    res.status(500).json({ error: 'Yahoo Finance 요청 실패' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Yahoo Proxy Server 실행 중: http://localhost:${PORT}`);
});