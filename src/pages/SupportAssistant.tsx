import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CornerDownLeft, User, Bot } from 'lucide-react';

const mockResponses: { [key: string]: string[] } = {
  default: [
    "I understand this is difficult. Could you tell me a little more about what's happening? Remember not to share any personal names or details.",
    "That sounds incredibly stressful. Let's break it down. What's your biggest concern right now?",
    "Thank you for trusting me. A good first step could be documenting what happened. You can use the Safe Locker feature for that."
  ],
  leak: [
    "This is a serious violation of your privacy. It's important to know this is not your fault.",
    "There are steps you can take. First, consider reporting the content on the platform where it was shared. They often have policies against this.",
    "Documenting everything is crucial. Take screenshots of the posts and any related messages. You can use the Self-Reporting tool to create an evidence packet."
  ],
  bullying: [
    "Being bullied online is exhausting and hurtful. It's brave of you to talk about it.",
    "Blocking the accounts involved can sometimes provide immediate relief. Have you considered that?",
    "Talking to a trusted adult, like a parent, teacher, or counselor, can be a really important step. We have a guide in our Resource Hub."
  ],
  threats: [
    "Online threats are serious and can be very frightening. Your safety is the priority.",
    "If you feel you are in immediate danger, please contact local law enforcement. You can find their number in the Emergency Resources.",
    "It is essential to save any messages containing threats. Do not delete them. Our Safe Locker can help you store this evidence securely."
  ]
};

const quickPrompts = [
  { text: 'Someone leaked my pictures.', key: 'leak' },
  { text: 'Someone is bullying me.', key: 'bullying' },
  { text: 'Someone is threatening me online.', key: 'threats' },
];

interface Message {
  sender: 'user' | 'ai';
  text: string;
}

export default function SupportAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'ai', text: "Hi, I'm Faith, your AI support assistant. I'm here to listen and offer guidance. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const sendMessage = (text: string, key = 'default') => {
    if (!text.trim()) return;

    setMessages(prev => [...prev, { sender: 'user', text }]);
    setInput('');

    setTimeout(() => {
      const responses = mockResponses[key] || mockResponses.default;
      const response = responses[Math.floor(Math.random() * responses.length)];
      setMessages(prev => [...prev, { sender: 'ai', text: response }]);
    }, 1000);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <h1 className="text-4xl font-bold text-dark-gray">AI Support Assistant "Faith"</h1>
        <p className="text-md text-red-600 font-semibold mt-4">You do not need to share your name. Your conversation is not stored.</p>
      </motion.div>

      <div className="bg-white rounded-lg shadow-xl h-[60vh] flex flex-col">
        <div className="flex-1 p-4 overflow-y-auto">
          {messages.map((msg, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex items-start my-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.sender === 'ai' && <Bot className='h-8 w-8 text-soft-purple mr-3 flex-shrink-0' />}
              <div className={`px-4 py-2 rounded-lg max-w-sm ${msg.sender === 'user' ? 'bg-soft-teal text-white' : 'bg-cream'}`}>
                {msg.text}
              </div>
              {msg.sender === 'user' && <User className='h-8 w-8 text-soft-teal ml-3 flex-shrink-0' />}
            </motion.div>
          ))}
           <div ref={chatEndRef} />
        </div>

        <div className="p-4 border-t">
            <div className='flex flex-wrap gap-2 mb-2'>
                {quickPrompts.map(prompt => (
                    <button key={prompt.key} onClick={() => sendMessage(prompt.text, prompt.key)} className='bg-gray-200 text-sm hover:bg-soft-purple hover:text-white transition-colors text-gray-700 px-3 py-1 rounded-full'>{prompt.text}</button>
                ))}
            </div>
          <form onSubmit={(e) => { e.preventDefault(); sendMessage(input); }} className="flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 p-2 border rounded-l-md focus:ring-soft-purple focus:border-soft-purple"
            />
            <button type="submit" className="bg-soft-purple text-white p-2 rounded-r-md hover:bg-soft-teal transition-colors">
              <CornerDownLeft />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}