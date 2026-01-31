import { useState } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
}

const quickReplies = [
  'Best time to sow wheat?',
  'How to control pests?',
  'Fertilizer for rice?',
  'Water requirement for cotton?',
];

const botResponses: { [key: string]: string } = {
  'wheat': 'The best time to sow wheat in North India is October to November (Rabi season). Ensure soil temperature is between 20-25°C for optimal germination.',
  'pest': 'For organic pest control, use neem oil spray (5ml/liter water). For chemical control, consult your local agriculture officer for approved pesticides.',
  'rice': 'For rice, apply 120 kg Nitrogen, 60 kg Phosphorus, and 40 kg Potash per hectare. Split nitrogen application in 3 doses.',
  'cotton': 'Cotton requires 700-1200mm water. Use drip irrigation for 40% water savings. Critical stages: flowering and boll formation.',
  'default': 'I can help you with crop advice, pest control, fertilizer recommendations, and water management. What would you like to know?',
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: 'Namaste! 🙏 I am your KrishiMitra assistant. How can I help you today?', isBot: true },
  ]);
  const [input, setInput] = useState('');

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    if (lowerMessage.includes('wheat') || lowerMessage.includes('sow')) {
      return botResponses.wheat;
    }
    if (lowerMessage.includes('pest') || lowerMessage.includes('control')) {
      return botResponses.pest;
    }
    if (lowerMessage.includes('rice') || lowerMessage.includes('fertilizer')) {
      return botResponses.rice;
    }
    if (lowerMessage.includes('cotton') || lowerMessage.includes('water')) {
      return botResponses.cotton;
    }
    return botResponses.default;
  };

  const handleSend = (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: messageText,
      isBot: false,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: messages.length + 2,
        text: getBotResponse(messageText),
        isBot: true,
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 800);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-elevated transition-all hover:scale-110 ${
          isOpen ? 'hidden' : 'flex'
        }`}
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-48px)] animate-scale-in">
          <div className="rounded-2xl bg-card shadow-elevated border border-border overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between bg-primary px-4 py-3 text-primary-foreground">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/20">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold">KrishiMitra Bot</h3>
                  <p className="text-xs opacity-80">Ask farming questions</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-primary-foreground hover:bg-primary-foreground/10"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-2 ${message.isBot ? '' : 'flex-row-reverse'}`}
                >
                  <div
                    className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${
                      message.isBot
                        ? 'bg-primary/10 text-primary'
                        : 'bg-accent text-accent-foreground'
                    }`}
                  >
                    {message.isBot ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                  </div>
                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm ${
                      message.isBot
                        ? 'bg-muted text-foreground rounded-tl-none'
                        : 'bg-primary text-primary-foreground rounded-tr-none'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Replies */}
            <div className="px-4 pb-2">
              <div className="flex flex-wrap gap-2">
                {quickReplies.map((reply) => (
                  <button
                    key={reply}
                    onClick={() => handleSend(reply)}
                    className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="border-t border-border p-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex gap-2"
              >
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your question..."
                  className="flex-1"
                />
                <Button type="submit" size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
