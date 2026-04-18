import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, X, Bot, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingAIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 'greet', type: 'ai', text: "👋 Hi! I am Poton. How can I help you?" },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { id: Date.now(), type: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    const currentInput = input;
    setInput('');
    setIsTyping(true);
    
    try {
      const res = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: currentInput })
      });

      if (!res.ok) throw new Error("Server error");
      const data = await res.json();

      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        type: 'ai', 
        text: data.reply 
      }]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [
        ...prev,
        { id: Date.now() + 2, type: 'ai', text: "⚠️ Server not reachable. Please make sure the backend is running." }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button 
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-gradient-to-tr from-green-600 to-emerald-600 rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-transform active:scale-90"
        >
          <Bot size={28} />
        </button>
      </div>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed inset-0 md:inset-auto md:bottom-24 md:right-6 md:w-96 md:h-[500px] z-[60] p-4 md:p-0"
          >
            <div className="glass-dark w-full h-full rounded-[2.5rem] flex flex-col overflow-hidden text-white shadow-2xl">
              {/* Header */}
              <div className="p-6 flex justify-between items-center bg-white/5 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 bg-green-500 rounded-lg flex items-center justify-center">
                    <Bot size={18} />
                  </div>
                  <span className="font-bold">Poton</span>
                </div>
                <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>

              {/* Messages */}
              <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div 
                      className={`max-w-[80%] p-4 rounded-2xl text-sm ${
                        msg.type === 'user' 
                        ? 'bg-green-600 text-white rounded-tr-none' 
                        : 'bg-white/10 backdrop-blur-md rounded-tl-none border border-white/10'
                      }`}
                      dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br/>') }}
                    />
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl rounded-tl-none border border-white/10 text-xs animate-pulse">
                      Poton is thinking...
                    </div>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="p-6 bg-white/5 border-t border-white/5">
                <form 
                  onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                  className="relative"
                >
                  <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask Poton anything..."
                    className="w-full bg-white/10 border border-white/10 rounded-2xl py-3 px-4 pr-12 text-sm focus:outline-none focus:ring-1 focus:ring-green-400"
                  />
                  <button 
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-green-400 hover:text-green-300 disabled:opacity-50"
                    disabled={!input.trim() || isTyping}
                  >
                    <Send size={18} />
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingAIChat;
