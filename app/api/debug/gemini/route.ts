import { NextResponse } from 'next/server';
import { GoogleAuth } from 'google-auth-library';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const doTest = url.searchParams.get('test') === '1' || url.searchParams.get('test') === 'true';

  const env = {
    USE_GEMINI: process.env.USE_GEMINI ?? 'undefined',
    DEV_MOCK_OPENAI: process.env.DEV_MOCK_OPENAI ?? 'undefined',
    GOOGLE_PROJECT_ID: process.env.GOOGLE_PROJECT_ID ?? 'undefined',
    GOOGLE_LOCATION: process.env.GOOGLE_LOCATION ?? 'undefined',
    GEMINI_MODEL: process.env.GEMINI_MODEL ?? 'undefined',
    GOOGLE_APPLICATION_CREDENTIALS: process.env.GOOGLE_APPLICATION_CREDENTIALS ? '[REDACTED_PATH]' : 'not-set',
  };

  if (!doTest) {
    return NextResponse.json({ ok: true, env });
  }

  // perform a lightweight test predict call
  try {
    const project = process.env.GOOGLE_PROJECT_ID;
    const location = process.env.GOOGLE_LOCATION ?? 'us-central1';
    const model = process.env.GEMINI_MODEL ?? 'chat-bison-001';

    if (!project) {
      return NextResponse.json({ ok: false, env, error: 'GOOGLE_PROJECT_ID not set' }, { status: 400 });
    }

    const auth = new GoogleAuth({ scopes: ['https://www.googleapis.com/auth/cloud-platform'] });
    const client = await auth.getClient();
    const accessTokenResp = await client.getAccessToken();
    const accessToken = (accessTokenResp as any)?.token ?? accessTokenResp;

    if (!accessToken) {
      return NextResponse.json({ ok: false, env, error: 'Failed to obtain access token' }, { status: 500 });
    }

    const prompt = 'user: Quick test - say hello.';
    const urlEndpoint = `https://${location}-aiplatform.googleapis.com/v1/projects/${project}/locations/${location}/models/${model}:predict`;

    const body = {
      instances: [{ content: prompt }],
      parameters: { temperature: 0.2, maxOutputTokens: 256 },
    };

    const res = await fetch(urlEndpoint, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const text = await res.text();
    let parsed: any = null;
    try { parsed = JSON.parse(text); } catch (e) { parsed = text; }

    return NextResponse.json({ ok: res.ok, status: res.status, env, response: parsed }, { status: res.ok ? 200 : 502 });
  } catch (err: any) {
    return NextResponse.json({ ok: false, env, error: String(err) }, { status: 500 });
  }
}
