
import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, ChevronDown, ChevronUp, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface ChatMessage {
  id: number;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const botResponses: Record<string, string[]> = {
  "project": [
    "My latest project is an AI Face Recognition System using OpenCV and machine learning.",
    "I've been working on a Smart Home Automation system using Arduino and Raspberry Pi.",
    "My portfolio website is one of my recent projects. It showcases my skills in React and modern web technologies."
  ],
  "contact": [
    "You can reach me at aa1660025@gmail.com or through the contact form on this website.",
    "Feel free to connect with me on LinkedIn or GitHub! Links are in the footer.",
    "My phone number is 03213021673 if you'd like to contact me directly."
  ],
  "education": [
    "I'm studying Computer Systems Engineering at Mehran University of Engineering and Technology (MUET), Jamshoro.",
    "I'm in the Class of 2028 with Roll No. 24CS005.",
    "I'm focusing on AI, IoT, and web development technologies during my studies."
  ],
  "skills": [
    "I'm proficient in Python, JavaScript, React, Arduino programming, and OpenCV.",
    "My technical skills include web development, IoT systems, AI applications, and database management.",
    "I'm continuously learning new technologies to enhance my skill set."
  ],
  "help": [
    "I can answer questions about my projects, skills, education, or contact information.",
    "Try asking me something like 'What's your latest project?' or 'How can I contact you?'",
    "I'm here to help you learn more about Muhammad Umer Qureshi!"
  ]
};

export const FloatChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      content: "Hi there! I'm Umer's assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (isOpen) {
      setHasNewMessage(false);
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);
  
  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    const newUserMessage = {
      id: Date.now(),
      content: message,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setMessage('');
    
    // Process the message to determine a response
    setTimeout(() => {
      const botMessage = processMessage(message);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        content: botMessage,
        isUser: false,
        timestamp: new Date()
      }]);
      
      if (!isOpen) {
        setHasNewMessage(true);
      }
    }, 1000);
  };
  
  const processMessage = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check for keywords in the message
    if (lowerMessage.includes("project") || lowerMessage.includes("working on")) {
      return getRandomResponse("project");
    } else if (lowerMessage.includes("contact") || lowerMessage.includes("email") || lowerMessage.includes("phone") || lowerMessage.includes("reach")) {
      return getRandomResponse("contact");
    } else if (lowerMessage.includes("education") || lowerMessage.includes("study") || lowerMessage.includes("university") || lowerMessage.includes("college")) {
      return getRandomResponse("education");
    } else if (lowerMessage.includes("skill") || lowerMessage.includes("know") || lowerMessage.includes("technology")) {
      return getRandomResponse("skills");
    } else if (lowerMessage.includes("help") || lowerMessage.includes("about") || lowerMessage.includes("what")) {
      return getRandomResponse("help");
    } else {
      return "I'm not sure how to respond to that. You can ask me about Umer's projects, skills, education, or contact information.";
    }
  };
  
  const getRandomResponse = (category: string): string => {
    const responses = botResponses[category] || botResponses["help"];
    const randomIndex = Math.floor(Math.random() * responses.length);
    return responses[randomIndex];
  };
  
  const toggleChat = () => {
    setIsOpen(prev => !prev);
    if (!isOpen) {
      setHasNewMessage(false);
    }
  };
  
  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen && (
        <div className="bg-card border border-border rounded-lg shadow-lg mb-4 w-80 md:w-96 flex flex-col overflow-hidden">
          <div className="bg-primary/10 p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot size={20} className="text-primary" />
              <h3 className="font-medium">Umer's Assistant</h3>
            </div>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={toggleChat}>
              <X size={18} />
            </Button>
          </div>
          
          <div className="p-4 flex-1 overflow-y-auto max-h-[350px]">
            <div className="flex flex-col space-y-3">
              {messages.map(msg => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] p-3 rounded-lg ${
                      msg.isUser 
                        ? 'bg-primary text-primary-foreground rounded-br-none' 
                        : 'bg-muted rounded-bl-none'
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                    <span className="text-[10px] opacity-70 mt-1 inline-block">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
          
          <div className="p-3 border-t border-border">
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex gap-2"
            >
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask me something..."
                className="flex-1"
              />
              <Button type="submit" size="sm" className="px-3">
                <Send size={18} />
              </Button>
            </form>
            <div className="flex gap-2 mt-2 flex-wrap">
              <Badge variant="outline" className="cursor-pointer hover:bg-muted transition-colors" onClick={() => setMessage("What's your latest project?")}>
                Latest project?
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-muted transition-colors" onClick={() => setMessage("How can I contact you?")}>
                Contact info?
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-muted transition-colors" onClick={() => setMessage("What are your skills?")}>
                Skills?
              </Badge>
            </div>
          </div>
        </div>
      )}
      
      <Button 
        onClick={toggleChat} 
        className="h-14 w-14 rounded-full shadow-lg flex items-center justify-center relative"
      >
        {isOpen ? <ChevronDown size={24} /> : <Bot size={24} />}
        {hasNewMessage && !isOpen && (
          <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></span>
        )}
      </Button>
    </div>
  );
};
