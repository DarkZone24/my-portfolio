'use server';

import OpenAI from "openai";
import { Message } from "@/Chatbot/chatbot";
import { GoogleAuth } from 'google-auth-library';

const openai = new OpenAI({
    apiKey  : process.env.OPENAI_API_KEY,
});

async function callGemini(chatMessages: Message[]) {
    const project = process.env.GOOGLE_PROJECT_ID;
    const location = process.env.GOOGLE_LOCATION ?? 'us-central1';
    // Example model names: 'chat-bison-001' or 'text-bison-001' depending on availability
    const model = process.env.GEMINI_MODEL ?? 'chat-bison-001';

    if (!project) {
        throw new Error('GOOGLE_PROJECT_ID environment variable is required to call Gemini.');
    }

    const auth = new GoogleAuth({ scopes: ['https://www.googleapis.com/auth/cloud-platform'] });
    const client = await auth.getClient();
    const accessTokenResp = await client.getAccessToken();
    const accessToken = (accessTokenResp as any)?.token ?? accessTokenResp;
    if (!accessToken) throw new Error('Failed to obtain access token for Google Cloud.');

    // assemble a simple prompt by concatenating messages
    const prompt = chatMessages.map((m) => `${m.role}: ${m.content}`).join('\n');

    // Vertex AI REST predict endpoint (region-specific)
    const url = `https://${location}-aiplatform.googleapis.com/v1/projects/${project}/locations/${location}/models/${model}:predict`;

    const body = {
        instances: [{ content: prompt }],
        parameters: { temperature: 0.2, maxOutputTokens: 512 }
    };

    const res = await fetch(url, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Gemini API error ${res.status}: ${text}`);
    }

    const json = await res.json();

    // Try multiple response shapes depending on model/endpoint
    let assistant = '';
    if (json?.predictions && json.predictions[0]) {
        assistant = json.predictions[0].content ?? JSON.stringify(json.predictions[0]);
    } else if (json?.outputs && json.outputs[0]) {
        assistant = json.outputs[0].content ?? JSON.stringify(json.outputs[0]);
    } else if (json?.candidates && json.candidates[0]) {
        assistant = json.candidates[0].content ?? '';
    } else if (json?.response) {
        assistant = json.response;
    } else {
        assistant = JSON.stringify(json).slice(0, 2000);
    }

    return assistant;
}

export async function chatCompletion(chatMessages: Message[]) {
    console.log('FROM BACKEND', chatMessages);

    // If developer explicitly requests a mock, skip real API calls entirely.
    if (process.env.DEV_MOCK_OPENAI === 'true') {
        return "(mock) This reply is from DEV_MOCK_OPENAI — OpenAI calls are disabled for development.";
    }

    // If configured to use Gemini (Google Vertex AI), call it instead of OpenAI
    if (process.env.USE_GEMINI === 'true') {
        try {
            const gemini = await callGemini(chatMessages);
            return gemini;
        } catch (gerr: any) {
            console.warn('Gemini request failed', gerr?.message ?? gerr);
            // fallthrough to OpenAI or fallback messages below
        }
    }

    if (!process.env.OPENAI_API_KEY) {
        console.error('OPENAI_API_KEY is not set in environment');
        // In development you may want a mock response instead of throwing.
        if (process.env.DEV_MOCK_OPENAI === 'true') {
            return "(mock) Hi — this is a development mock reply because OPENAI_API_KEY is not set.";
        }

        throw new Error('OpenAI API key not set. Add OPENAI_API_KEY to your .env.local (server-side only).');
    }

    const chat = [
        { role: 'system', content: 'Kupal ka ba boss?.' },
        ...chatMessages,
    ];

    try {
        const completion = await openai.chat.completions.create({
            // cast to `any` to satisfy the OpenAI SDK TypeScript overloads
            messages: chat as any,
            model: 'gpt-3.5-turbo',
        });

        const assistant = completion.choices?.[0]?.message?.content ?? '';
        console.log('COMPLETION (assistant):', assistant);
        return assistant;
    } catch (err: any) {
        // Log a compact error summary (avoid leaking full stack to console in production)
        const status = err?.status ?? err?.response?.status ?? err?.code ?? 'unknown_status';
        const msg = err?.message ?? err?.response?.data ?? String(err);
        console.warn('OpenAI request failed', { status, msg });

        // Dev mock: when enabled, return a canned response so UI can continue to be developed.
        if (process.env.DEV_MOCK_OPENAI === 'true') {
            return "(mock) Sorry — OpenAI is not available; this is a development fallback reply.";
        }

        // Handle quota / rate limit errors specifically
        if (status === 429 || String(msg).toLowerCase().includes('quota') || String(msg).toLowerCase().includes('insufficient_quota')) {
            return "Sorry — the assistant is temporarily unavailable because the OpenAI account has insufficient quota. Please check your OpenAI billing/settings.";
        }

        // Handle missing/invalid key
        if (String(msg).toLowerCase().includes('you didn\'t provide an api key') || String(msg).toLowerCase().includes('invalid api key')) {
            return "Sorry — OpenAI API key is missing or invalid. Set OPENAI_API_KEY on the server and restart the app.";
        }

        // Generic fallback
        return 'Sorry — the assistant is temporarily unavailable. Please try again later.';
    }

}

