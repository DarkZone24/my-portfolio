import { NextResponse } from 'next/server';

// Dev-only health endpoint that reports whether the server process has the OpenAI key.
// Returns JSON: { hasKey: boolean }
export async function GET() {
  const hasKey = !!process.env.OPENAI_API_KEY;
  return NextResponse.json({ hasKey });
}
