#!/usr/bin/env node
import { randomUUID } from 'crypto';

const API_KEY = process.env.OPENAI_API_KEY;
const WORKFLOW_ID = process.env.VITE_CHATKIT_WORKFLOW_ID;

async function testFileSize(maxSize) {
  const response = await fetch('https://api.openai.com/v1/chatkit/sessions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'OpenAI-Beta': 'chatkit_beta=v1',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      workflow: { id: WORKFLOW_ID },
      user: randomUUID(),
      chatkit_configuration: {
        file_upload: {
          enabled: true,
          max_file_size: maxSize,
        },
      },
    }),
  });

  const data = await response.json();
  const actualSize = data.chatkit_configuration?.file_upload?.max_file_size;
  console.log(`Requested: ${maxSize} bytes | Actual: ${actualSize} bytes | ${actualSize / 1048576} MB`);
  return actualSize;
}

async function run() {
  console.log('Testing different max_file_size values:\n');

  const sizes = [
    512,           // Current (broken)
    10485760,      // 10 MB
    52428800,      // 50 MB
    104857600,     // 100 MB
    536870912,     // 512 MB
  ];

  for (const size of sizes) {
    await testFileSize(size);
    await new Promise(r => setTimeout(r, 500));
  }
}

run();
