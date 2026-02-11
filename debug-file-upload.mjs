import { randomUUID } from 'crypto';

const API_KEY = process.env.OPENAI_API_KEY;
const WORKFLOW_ID = process.env.VITE_CHATKIT_WORKFLOW_ID;

const tests = [
  {
    name: 'Just enabled: true',
    payload: {
      workflow: { id: WORKFLOW_ID },
      user: randomUUID(),
      chatkit_configuration: {
        file_upload: { enabled: true }
      },
    },
  },
  {
    name: 'With max_file_size (bytes)',
    payload: {
      workflow: { id: WORKFLOW_ID },
      user: randomUUID(),
      chatkit_configuration: {
        file_upload: {
          enabled: true,
          max_file_size: 10485760
        }
      },
    },
  },
  {
    name: 'With max_file_size_mb',
    payload: {
      workflow: { id: WORKFLOW_ID },
      user: randomUUID(),
      chatkit_configuration: {
        file_upload: {
          enabled: true,
          max_file_size_mb: 10
        }
      },
    },
  },
  {
    name: 'No chatkit_configuration (default)',
    payload: {
      workflow: { id: WORKFLOW_ID },
      user: randomUUID(),
    },
  },
];

for (const test of tests) {
  const response = await fetch('https://api.openai.com/v1/chatkit/sessions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'OpenAI-Beta': 'chatkit_beta=v1',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(test.payload),
  });

  const data = await response.json();
  const config = data.chatkit_configuration?.file_upload;

  console.log(`\n${test.name}:`);
  console.log(`  max_file_size: ${config?.max_file_size} bytes`);
  console.log(`  enabled: ${config?.enabled}`);

  if (!response.ok) {
    console.log(`  ⚠️ Error: ${data.error?.message}`);
  }

  await new Promise(r => setTimeout(r, 300));
}
