import { randomUUID } from 'crypto';

const API_KEY = process.env.OPENAI_API_KEY;
const WORKFLOW_ID = process.env.VITE_CHATKIT_WORKFLOW_ID;

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
      file_upload: { enabled: true }
    },
  }),
});

const data = await response.json();
const maxSize = data.chatkit_configuration?.file_upload?.max_file_size;
console.log('Default max_file_size:', maxSize, 'bytes');
console.log('In MB:', (maxSize || 0) / 1048576);
console.log('\nFull file_upload config:');
console.log(JSON.stringify(data.chatkit_configuration?.file_upload, null, 2));
