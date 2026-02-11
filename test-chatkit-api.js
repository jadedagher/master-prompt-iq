#!/usr/bin/env node
/**
 * Test script to debug ChatKit file upload configuration
 */

import { randomUUID } from 'crypto';
const uuidv4 = () => randomUUID();

const API_KEY = process.env.OPENAI_API_KEY;
const WORKFLOW_ID = process.env.VITE_CHATKIT_WORKFLOW_ID;

if (!API_KEY || !WORKFLOW_ID) {
  console.error('❌ Missing API_KEY or WORKFLOW_ID');
  console.error('Set: OPENAI_API_KEY and VITE_CHATKIT_WORKFLOW_ID');
  process.exit(1);
}

console.log('🧪 Testing ChatKit API configurations...\n');

const tests = [
  {
    name: 'Test 1: Basic session (original working)',
    payload: {
      workflow: { id: WORKFLOW_ID },
      user: uuidv4(),
    },
  },
  {
    name: 'Test 2: With chatkit_configuration',
    payload: {
      workflow: { id: WORKFLOW_ID },
      user: uuidv4(),
      chatkit_configuration: {
        file_upload: {
          enabled: true,
        },
      },
    },
  },
  {
    name: 'Test 3: With file_upload at root',
    payload: {
      workflow: { id: WORKFLOW_ID },
      user: uuidv4(),
      file_upload: {
        enabled: true,
      },
    },
  },
  {
    name: 'Test 4: With configuration (no nested)',
    payload: {
      workflow: { id: WORKFLOW_ID },
      user: uuidv4(),
      configuration: {
        file_upload: {
          enabled: true,
        },
      },
    },
  },
  {
    name: 'Test 5: With attachments_config',
    payload: {
      workflow: { id: WORKFLOW_ID },
      user: uuidv4(),
      attachments_config: {
        enabled: true,
      },
    },
  },
];

async function testAPI(testName, payload) {
  try {
    const response = await fetch('https://api.openai.com/v1/chatkit/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'OpenAI-Beta': 'chatkit_beta=v1',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (response.ok) {
      console.log(`✅ ${testName}`);
      console.log(`   Status: ${response.status}`);
      console.log(`   Client Secret: ${data.client_secret?.substring(0, 20)}...`);
      console.log(`   Full Response:`, JSON.stringify(data, null, 2));
      return true;
    } else {
      console.log(`❌ ${testName}`);
      console.log(`   Status: ${response.status}`);
      console.log(`   Error:`, data.error || data.message || JSON.stringify(data));
      return false;
    }
  } catch (error) {
    console.log(`❌ ${testName}`);
    console.log(`   Error: ${error.message}`);
    return false;
  }
}

async function runTests() {
  let successCount = 0;

  for (const test of tests) {
    const success = await testAPI(test.name, test.payload);
    if (success) successCount++;
    console.log('');
    // Small delay between requests
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log(`\n📊 Results: ${successCount}/${tests.length} tests passed`);
}

runTests();
