const https = require('https');
const fs = require('fs');
const path = require('path');

const HEROKU_TOKEN = 'HRKU-AAHy0dmvjJlvKMRDLtaG5294mBhN8iTHShJtE4I6_Mhw_____wJ471f6DlAz';
const APP_NAME = 'ar-platform-api';

function makeHerokuRequest(method, endpoint, data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.heroku.com',
      path: endpoint,
      method: method,
      headers: {
        'Authorization': `Bearer ${HEROKU_TOKEN}`,
        'Accept': 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let responseData = '';
      res.on('data', chunk => responseData += chunk);
      res.on('end', () => {
        console.log(`[${method} ${endpoint}] Status: ${res.statusCode}`);
        try {
          resolve({ status: res.statusCode, data: JSON.parse(responseData) });
        } catch {
          resolve({ status: res.statusCode, data: responseData });
        }
      });
    });

    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

async function deploy() {
  console.log('======================================');
  console.log('Heroku Backend Deployment via API');
  console.log('======================================\n');

  try {
    // 1. Create app
    console.log('[1/4] Creating Heroku app...');
    const createApp = await makeHerokuRequest('POST', '/apps', {
      name: APP_NAME,
      region: 'us'
    });
    console.log(`App creation: ${createApp.data.name || APP_NAME}\n`);

    // 2. Set config vars
    console.log('[2/4] Setting environment variables...');
    const config = {
      MONGODB_URI: 'mongodb+srv://snapcart:250Kaleb!123@cluster0.bdbiuhi.mongodb.net/ar-platform',
      CLOUDINARY_NAME: 'jcfhvno0',
      CLOUDINARY_API_KEY: '756249944483745',
      CLOUDINARY_API_SECRET: '6CD3NS4zBHKGaKKctHDkDVVFcGw',
      JWT_SECRET: 'ar-platform-secret-key-2026',
      NODE_ENV: 'production'
    };

    await makeHerokuRequest('PATCH', `/apps/${APP_NAME}/config-vars`, config);
    console.log('Environment variables set!\n');

    // 3. Add buildpacks
    console.log('[3/4] Setting buildpack...');
    await makeHerokuRequest('POST', `/apps/${APP_NAME}/buildpack-installations`, {
      buildpack: 'heroku/nodejs'
    });
    console.log('Buildpack configured!\n');

    // 4. Instructions for git push
    console.log('[4/4] Ready for deployment!\n');
    console.log('======================================');
    console.log('Next Steps:');
    console.log('======================================');
    console.log('Run these commands in Command Prompt:\n');
    console.log(`cd "c:\\Users\\yulic\\Downloads\\files\\builder app"`);
    console.log(`git remote add heroku https://git.heroku.com/${APP_NAME}.git`);
    console.log(`git push heroku main\n`);
    console.log(`Your API will be at: https://${APP_NAME}.herokuapp.com\n`);

  } catch (error) {
    console.error('Error:', error.message);
  }
}

deploy();
