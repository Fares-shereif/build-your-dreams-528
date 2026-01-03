import { Send, Bot, User, Sparkles, Lightbulb, Utensils, Dumbbell, TrendingUp } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useState } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const suggestedQuestions = [
  { icon: Utensils, text: 'اقترح وجبة غداء صحية' },
  { icon: Dumbbell, text: 'ما أفضل تمارين الصدر؟' },
  { icon: TrendingUp, text: 'كيف أزيد من حرق الدهون؟' },
  { icon: Lightbulb, text: 'نصائح لتحسين النوم' },
];

const AIAssistantView = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'مرحباً! أنا مساعدك الذكي للياقة والتغذية. كيف يمكنني مساعدتك اليوم؟ 💪',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        'هذا سؤال رائع! بناءً على أهدافك وبياناتك، أنصحك بـ...',
        'بالنظر إلى تقدمك الحالي، يمكنني مساعدتك في تحسين...',
        'لتحقيق أفضل النتائج، أوصي بالتركيز على...',
      ];
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responses[Math.floor(Math.random() * responses.length)] + '\n\n' +
          'لقد لاحظت أنك حققت تقدماً ممتازاً هذا الأسبوع! استمر على هذا النمط وستصل لهدفك قريباً. 🎯',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  const handleSuggestion = (text: string) => {
    setInput(text);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-180px)] animate-fade-in" dir="rtl">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-glow">
            <Bot className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">المساعد الذكي</h1>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              مدعوم بالذكاء الاصطناعي
            </p>
          </div>
        </div>
      </div>

      {/* Suggested Questions */}
      {messages.length <= 1 && (
        <div className="grid grid-cols-2 gap-2 mb-4">
          {suggestedQuestions.map((q, idx) => {
            const Icon = q.icon;
            return (
              <button
                key={idx}
                onClick={() => handleSuggestion(q.text)}
                className="flex items-center gap-2 p-3 bg-secondary rounded-xl border border-border hover:border-primary/50 transition-all text-right"
              >
                <Icon className="w-4 h-4 text-primary shrink-0" />
                <span className="text-sm text-foreground">{q.text}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div
              className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center ${
                message.role === 'assistant'
                  ? 'bg-gradient-primary'
                  : 'bg-secondary'
              }`}
            >
              {message.role === 'assistant' ? (
                <Bot className="w-4 h-4 text-primary-foreground" />
              ) : (
                <User className="w-4 h-4 text-muted-foreground" />
              )}
            </div>
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                message.role === 'assistant'
                  ? 'bg-secondary text-foreground'
                  : 'bg-primary text-primary-foreground'
              }`}
            >
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="اكتب سؤالك هنا..."
          className="flex-1 bg-secondary border-border"
        />
        <Button 
          onClick={handleSend}
          size="icon"
          className="shrink-0 bg-gradient-primary hover:opacity-90 shadow-button"
        >
          <Send className="w-4 h-4 rotate-180" />
        </Button>
      </div>
    </div>
  );
};

export default AIAssistantView;
