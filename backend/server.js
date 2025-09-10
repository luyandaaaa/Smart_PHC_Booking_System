const express = require('express');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Smart PHC Booking System Backend is running.');
});

app.post('/api/requesttopay', async (req, res) => {
  const MOMO_API_URL = 'https://proxy.momoapi.mtn.com/collection/v1_0/requesttopay';
  const SUBSCRIPTION_KEY = '01c62724f8424c02a198881a580fb635';
  const AUTH_TOKEN = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSMjU2In0.eyJjbGllbnRJZCI6ImM2YWE5NzM4LTdlNmItNGRlNS1hZDhjLTk0N2ZiZGVlMDMyZiIsImV4cGlyZXMiOiIyMDI1LTA5LTExVDAwOjQxOjExLjI4NyIsInNlc3Npb25JZCI6IjUwZmY4OWI1LTUzNmItNGUzMC1iMzhkLTVkMDY3YmU1NGJjYSJ9.clsbC99Vkm5snqdbVQmzALxaU_CfNgd591-YpGe0phORigLVcHOwdoy0xp4L9AjQQDUbx0yjVaHe5mbJ600cjjlN68wdPX8HgcoGAr5i4ZUcsjkHj0VUVj0rRr0ByucSF3Ypef35yc9VZzGYjGlZk8BY1xr0X9XjGSLXhfgl0ud_U6rPo07sG9_XUQNPoFSjADkIQByVrnb3VlW5l0TdPiTB5Rd5KeM5F_gLWHwHySnwo4SyPpo6YyG9GK70WARiN_QPE0hxTv3C9TWUt36tbeI0qcAzzpkjVj40h1hpQ3zEkhxQInh5DG2h2t4rJYML0yWEfrmQRX--zcUnC15A-w';
  const X_REFERENCE_ID = uuidv4();
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
