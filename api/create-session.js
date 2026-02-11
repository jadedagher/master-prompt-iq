/**
 * Vercel Serverless Function: Exchange workflow ID for ChatKit client secret
 */

import { v4 as uuidv4 } from 'uuid';

const CHATKIT_API_BASE = process.env.CHATKIT_API_BASE || 'https://api.openai.com';
const SESSION_COOKIE_NAME = 'chatkit_session_id';
const SESSION_COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export default async function handler(req, res) {
  console.log('🚀 [CREATE-SESSION] Request received');
  console.log('📋 [CREATE-SESSION] Method:', req.method);

  // Only allow POST requests
  if (req.method !== 'POST') {
    console.log('❌ [CREATE-SESSION] Invalid method:', req.method);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'Missing OPENAI_API_KEY environment variable' });
    }

    // Extract workflow ID from request body
    const { workflow, workflowId } = req.body || {};
    const requestedWorkflowId = workflow?.id || workflowId;
    const envWorkflowId = process.env.CHATKIT_WORKFLOW_ID || process.env.VITE_CHATKIT_WORKFLOW_ID;
    const finalWorkflowId = (requestedWorkflowId && String(requestedWorkflowId).trim()) || envWorkflowId;

    if (!finalWorkflowId) {
      return res.status(400).json({ error: 'Missing workflow id' });
    }

    // Resolve user ID from cookie or generate new one
    const existingSessionId = req.cookies?.[SESSION_COOKIE_NAME];
    const userId = existingSessionId || uuidv4();
    const setCookie = !existingSessionId;

    // Call OpenAI ChatKit API with file uploads enabled
    const response = await fetch(`${CHATKIT_API_BASE}/v1/chatkit/sessions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'OpenAI-Beta': 'chatkit_beta=v1',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        workflow: { id: finalWorkflowId },
        user: userId,
        chatkit_configuration: {
          file_upload: {
            enabled: true,
          },
        },
      }),
    });

    const data = await response.json();

    console.log('📥 [CREATE-SESSION] OpenAI Response Status:', response.status);
    console.log('📥 [CREATE-SESSION] File Upload Config:', JSON.stringify(data.chatkit_configuration?.file_upload, null, 2));

    if (!response.ok) {
      const errorMessage = data?.error || response.statusText || 'Failed to create session';
      console.log('❌ [CREATE-SESSION] API Error:', errorMessage);
      return res.status(response.status).json({ error: errorMessage });
    }

    const clientSecret = data.client_secret;
    const expiresAfter = data.expires_after;
    const fileUploadConfig = data.chatkit_configuration?.file_upload;

    console.log('✅ [CREATE-SESSION] Session created successfully');
    console.log('📊 [CREATE-SESSION] File upload max_size:', fileUploadConfig?.max_file_size, 'bytes');
    console.log('📊 [CREATE-SESSION] File upload enabled:', fileUploadConfig?.enabled);
    console.log('📊 [CREATE-SESSION] Max files:', fileUploadConfig?.max_files);

    if (!clientSecret) {
      console.log('❌ [CREATE-SESSION] Missing client secret in response');
      return res.status(502).json({ error: 'Missing client secret in response' });
    }

    // Set session cookie if new user
    if (setCookie) {
      res.setHeader(
        'Set-Cookie',
        `${SESSION_COOKIE_NAME}=${userId}; Max-Age=${SESSION_COOKIE_MAX_AGE}; Path=/; HttpOnly; SameSite=Lax${
          process.env.NODE_ENV === 'production' ? '; Secure' : ''
        }`
      );
    }

    return res.status(200).json({
      client_secret: clientSecret,
      expires_after: expiresAfter,
    });
  } catch (error) {
    console.error('Error creating session:', error);
    return res.status(502).json({
      error: `Failed to reach ChatKit API: ${error.message}`,
    });
  }
}
