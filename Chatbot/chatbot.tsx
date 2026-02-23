"use client";

import { FormEvent, useState } from 'react';
import { TbMessageChatbot } from 'react-icons/tb';
import BotMessage from './ui/bot-message';
import UserMessage from './ui/user-message';
import ChatInput from './ui/chat-input';
import { log } from 'console';
import { chatCompletion } from '@/actions';

export type Message = {
    content: string;
    role: 'user' | 'assistant' | 'system';

}

export default function Chatbot() {
    const [showChat, setShowChat] = useState(false);
    const [userMessage, setUserMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState<Message[]>([ 
        {role: 'assistant', content: 'Hello Kupal!, ano maitutulong ko sayo?'},
    ]);

    const handleSendMessage = async (e: FormEvent) => {
        e.preventDefault();

        if (!userMessage || !userMessage.trim()) return;

        const content = userMessage.trim();

        // create new user message
        const newMessage: Message = { role: 'user', content };

        // Build updated conversation from current state (safe because handler runs with latest state snapshot)
        const updated = [...messages, newMessage];

        // Optimistically update UI
        setMessages(updated);
        setLoading(true);

        try {
            const assistantText = await chatCompletion(updated);
            // append assistant reply
            setMessages((prev) => [...prev, { role: 'assistant', content: String(assistantText) }]);
            setUserMessage('');
        } catch (err) {
            console.error(err);
            setMessages((prev) => [...prev, { role: 'assistant', content: 'Sorry — the assistant is temporarily unavailable.' }]);
        } finally {
            setLoading(false);
        }
    };

    return(
        <div className="fixed right-6 bottom-24 z-50">
            {/* Chat Window */}
            {showChat && (
                <div className="fixed right-6 bottom-44 bg-linear-to-r from-cyan-500 to-cyan-600 shadow-2xl shadow-gray-900 rounded-2xl h-[390px] w-[400px] flex flex-col">
                    {/* CHAT HEADER */}
                    <div className="flex justify-between items-center p-5 border-b border-white/20">
                        <div>
                            <h2 className="font-semibold text-lg tracking-tight text-white">Chatbot</h2>
                            <p className="text-white/80 text-sm">Powered by OpenAI</p>
                        </div>
                        <button 
                            onClick={() => setShowChat(false)}
                            className="text-white hover:bg-white/20 rounded-full p-2 transition-all"
                            aria-label="Close chat"
                        >
                        </button>
                    </div>

                    {/* CHAT CONTAINER */}
                    <div className="flex flex-col flex-1 p-4 overflow-y-auto space-y-3">
                        {messages && messages.map((m, i) => (
                            m.role === 'assistant' ? (
                                <BotMessage key={i} role={m.role} content={m.content} />
                            ) : (
                                <UserMessage key={i} role={m.role} content={m.content} />
                            )
                        ))}
                    </div>

                    {/* MESSAGE INPUT */}
                    <div className="p-4 border-t border-white/20">
                        <ChatInput 
                        userMessage={userMessage}
                        setUserMessage={setUserMessage}
                        handleSendMessage ={handleSendMessage}
                        loading={loading}
                        />
                    </div>
                </div>
            )}

            {/* Toggle Button */}
            <button 
                onClick={() => setShowChat(!showChat)}
                className="flex items-center justify-center w-14 h-14 bg-linear-to-r from-cyan-500 to-cyan-600 text-white rounded-full shadow-lg hover:shadow-cyan-500/50 hover:scale-110 transition-all duration-300 hover:-translate-y-1"
                aria-label="Toggle chatbot"
            >
                <TbMessageChatbot size={28} />
            </button>
        </div>
    );
}