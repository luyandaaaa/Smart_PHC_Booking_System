app.get('/', (req, res) => {
  res.send('Smart PHC Booking System Backend is running.');
});
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/requesttopay', async (req, res) => {
  const MOMO_API_URL = 'https://proxy.momoapi.mtn.com/collection/v1_0/requesttopay';
  const SUBSCRIPTION_KEY = '01c62724f8424c02a198881a580fb635';
  const AUTH_TOKEN = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSMjU2In0.eyJjbGllbnRJZCI6ImM2YWE5NzM4LTdlNmItNGRlNS1hZDhjLTk0N2ZiZGVlMDMyZiIsImV4cGlyZXMiOiIyMDI1LTA5LTEwVDIwOjQ2OjA5LjU0NCIsInNlc3Npb25JZCI6IjQ5ZmY1MDdjLTQzZTktNDhiZC1hYzdjLWIzMzk2YTVlZmU3OSJ9.dzn_aG-n4K0DHw_DOrn9hdfu5TJODSK3c_1ggC3g9Mk8hcu8kwpHKZ2w4vmwPeOwgbAs509GSs2PNp25y53NZnOMpBklDsdNGb2FyacniUEb5mWsyXKc1Eez1PkjqHoxsAuCPwnoliZhKThRaA4Lfo2647d1aZ2MzZV9Q0P3LPfT23tiAhHmFoHEyZdqy6Gxu7CQkXfpdkzi2dRyifn6zyKB0-TU-7pgYslVWny-9lM3XRps4Rr9jlJp7oa3eBSsdhl95gcH_Dg7wO_hIdR0N_nlCBnInvGAwHUgX2msGbs6fAMTE7oDfJq-ZkKYe_GnTg6PUqI-RB95OaY9CGJEUQ';
  const X_REFERENCE_ID = '6b27b8fe-f8d1-496b-93cb-4abfac41316c';
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
