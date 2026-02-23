"use client"

import { FormEvent } from "react";

type ChatProps = {
    userMessage: string;
    setUserMessage: (value: string) => void;
    handleSendMessage: (e: FormEvent) => void;
    loading?: boolean;

}

export default function ChatInput({userMessage, setUserMessage, handleSendMessage, loading}: ChatProps) {
    return(
        <div className="flex space-x-2 items-center mt-auto">
            <form 
            onSubmit={handleSendMessage} 
            className="flex items-center justify-center w-full space-x-2"
            >
                <input 
                type="text" 
                value={userMessage} 
                onChange={(e) => setUserMessage(e.target.value)}
                placeholder="Insert your message"
                className="flex h-10 w-full rounded-md border border-[#e5e7eb] px-3
                text-sm text-black"
                disabled={!!loading}
                aria-disabled={!!loading}
                />
                <button
                type="submit"
                disabled={!!loading || !userMessage.trim()}
                className={`p-2 bg-white text-black inline-flex items-center justify-center
                rounded-md text-sm font-medium px-4 py-2 hover:bg-cyan-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed`}
                aria-label="Send message"
                aria-busy={!!loading}
                >{loading ? 'Sending...' : 'Send'}</button>
            </form>
        </div>
    )
}