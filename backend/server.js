const express = require('express');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Smart PHC Booking System Backend is running.');
});

app.post('/api/requesttopay', async (req, res) => {
  const MOMO_API_URL = 'https://proxy.momoapi.mtn.com/collection/v1_0/requesttopay';
  const SUBSCRIPTION_KEY = '01c62724f8424c02a198881a580fb635';
  const AUTH_TOKEN = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSMjU2In0.eyJjbGllbnRJZCI6ImM2YWE5NzM4LTdlNmItNGRlNS1hZDhjLTk0N2ZiZGVlMDMyZiIsImV4cGlyZXMiOiIyMDI1LTA5LTEwVDIzOjIxOjM2Ljg1NiIsInNlc3Npb25JZCI6IjQ1NWMxYTBkLWMwYzktNDQyZi04NzJhLTQ4ODZiOWFlZmEyYiJ9.YHFnjU8oHyC7s3nvMnK27subBWRV1nf3WcvtHjzbGEAV2SosDcWHtrpSprKGZF-IdW46jpHOFF-t6AN2-cHAkaOLRl2isMolaid6vc90T2J1_YBl5taIiZRTENAI8SY95uQ-7G0myB2w1Hq-zUO_v--Cl8Xf3woAIfBJIpsQ3SXPjzqr5SFq9EcqpzLRA2NANXeJNF8hTXWQTgR6PMUioaf6bWbwl_HfszaUOKZqeEOEEGXM2vt1AfQKJmsu4m_1O1iIs7SF0DdDjMXHr4Y2w5OvliYIHdTvX1uw0oUtfkL_ZAEh5wBl-llIzFWJmsd0RPamW8dRMtAAQBO0GcO2fw';
  const X_REFERENCE_ID = '2a5bc770-b22a-4e75-9036-557d1ff3c2a7';
  const X_TARGET_ENV = 'mtnsouthafrica';

  try {
    const response = await fetch(MOMO_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': AUTH_TOKEN,
        'X-Reference-Id': X_REFERENCE_ID,
        'X-Target-Environment': X_TARGET_ENV,
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Ocp-Apim-Subscription-Key': SUBSCRIPTION_KEY,
      },
      body: JSON.stringify(req.body),
    });
    const text = await response.text();
    console.log('MoMo API response status:', response.status);
    console.log('MoMo API response body:', text);
    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      data = text;
    }
    res.status(response.status).json(data);
  } catch (error) {
    console.error('MoMo payment error:', error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
