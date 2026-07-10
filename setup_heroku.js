#!/usr/bin/env node

const https = require('https');

const HEROKU_TOKEN = 'HRKU-AAHy0dmvjJlvKMRDLtaG5294mBhN8iTHShJtE4I6_Mhw_____wJ471f6DlAz';
const APP_NAME = 'ar-platform-api';

function makeRequest(method, path, body) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.heroku.com',
      path: path,
      method: method,
      headers: {
        'Authorization': `Bearer ${HEROKU_TOKEN}`,
        'Accept': 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(data) });
        } catch (e) {
          resolve({ status: res.statusCode, body: data });
        }
      });
    });

    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function deploy() {
  console.log('======================================');
  console.log('Creating Heroku App: ar-platform-api');
  console.log('======================================\n');

  try {
    console.log('Creating app...');
    const appResponse = await makeRequest('POST', '/apps', {
      name: APP_NAME,
      region: 'us'
    });
    
    if (appResponse.status === 201 || appResponse.status === 200) {
      console.log('✓ App created:', APP_NAME);
      console.log('  URL:', appResponse.body.web_url || 'https://' + APP_NAME + '.herokuapp.com');
    } else if (appResponse.status === 422 && appResponse.body.message && appResponse.body.message.includes('already exists')) {
      console.log('✓ App already exists:', APP_NAME);
    } else {
      console.log('Response:', appResponse.status, appResponse.body);
    }

    console.log('\nSetting environment variables...');
    const configResponse = await makeRequest('PATCH', `/apps/${APP_NAME}/config-vars`, {
      MONGODB_URI: 'mongodb+srv://snapcart:250Kaleb!123@cluster0.bdbiuhi.mongodb.net/ar-platform',
      CLOUDINARY_NAME: 'jcfhvno0',
      CLOUDINARY_API_KEY: '756249944483745',
      CLOUDINARY_API_SECRET: '6CD3NS4zBHKGaKKctHDkDVVFcGw',
      JWT_SECRET: 'ar-platform-secret-key-2026',
      NODE_ENV: 'production'
    });
    
    if (configResponse.status === 200) {
      console.log('✓ Config variables set');
    } else {
      console.log('Config response:', configResponse.status);
    }

    console.log('\n======================================');
    console.log('Deployment Instructions');
    console.log('======================================\n');
    console.log('Run these commands in Command Prompt:\n');
    console.log('cd "c:\\Users\\yulic\\Downloads\\files\\builder app"');
    console.log('git remote add heroku https://git.heroku.com/ar-platform-api.git');
    console.log('git push heroku main\n');
    console.log('Your API will be live at:');
    console.log('https://ar-platform-api.herokuapp.com\n');

  } catch (error) {
    console.error('Error:', error);
  }
}

deploy();
