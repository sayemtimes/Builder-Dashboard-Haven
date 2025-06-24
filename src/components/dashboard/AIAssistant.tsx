import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { aiSuggestions } from "@/lib/mockData";
import {
  Bot,
  Send,
  Minimize2,
  Maximize2,
  Sparkles,
  MessageCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AIAssistantProps {
  className?: string;
}

interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const AIAssistant = ({ className }: AIAssistantProps) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content:
        "Hello! I'm your CRM AI assistant. I can help you analyze your data, generate insights, and answer questions about your customers and sales performance. What would you like to know?",
      timestamp: new Date(),
    },
  ]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Based on your current data, I can see some interesting trends. Your customer acquisition has increased by 12.5% this month, which is great progress!",
        "Looking at your churn analysis, the main reason for customer loss is pricing concerns. You might want to consider offering more flexible pricing tiers.",
        "Your top sales rep Sarah Chen is performing exceptionally well with 23 deals closed. Consider analyzing her approach for team training.",
        "The marketing campaign 'Q4 Holiday Campaign' has the highest ROI at 340%. I'd recommend allocating more budget to similar campaigns.",
        "Your enterprise segment has the highest CLTV at $125,000. Focus on acquiring more enterprise clients for better long-term revenue.",
      ];

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(message);
    }
  };

  if (isMinimized) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={cn("fixed bottom-4 right-4 z-50", className)}
      >
        <Button
          onClick={() => setIsMinimized(false)}
          className="h-14 w-14 rounded-full shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 1.5 }}
      className={cn("fixed bottom-4 right-4 w-96 z-50", className)}
    >
      <Card className="shadow-2xl border-0 bg-gradient-to-br from-background to-background/95 backdrop-blur">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm">AI Assistant</span>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            </CardTitle>
            <div className="flex space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(true)}
                className="h-8 w-8 p-0"
              >
                <Minimize2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {/* Messages */}
          <ScrollArea className="h-80 px-4">
            <div className="space-y-4">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "flex",
                    msg.type === "user" ? "justify-end" : "justify-start",
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[80%] rounded-2xl px-3 py-2 text-sm",
                      msg.type === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-accent text-accent-foreground",
                    )}
                  >
                    {msg.type === "assistant" && (
                      <div className="flex items-center space-x-1 mb-1">
                        <Sparkles className="h-3 w-3" />
                        <span className="text-xs font-medium">AI</span>
                      </div>
                    )}
                    <p className="leading-relaxed">{msg.content}</p>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex justify-start"
                  >
                    <div className="bg-accent text-accent-foreground rounded-2xl px-3 py-2">
                      <div className="flex items-center space-x-1">
                        <Sparkles className="h-3 w-3" />
                        <span className="text-xs font-medium">
                          AI is typing
                        </span>
                        <div className="flex space-x-1">
                          <div className="w-1 h-1 bg-current rounded-full animate-bounce" />
                          <div
                            className="w-1 h-1 bg-current rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          />
                          <div
                            className="w-1 h-1 bg-current rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </ScrollArea>

          {/* Suggestions */}
          {messages.length === 1 && (
            <div className="px-4 py-3 border-t">
              <p className="text-xs text-muted-foreground mb-2">Try asking:</p>
              <div className="space-y-1">
                {aiSuggestions.slice(0, 3).map((suggestion, index) => (
                  <motion.button
                    key={suggestion}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="block w-full text-left text-xs p-2 rounded-lg bg-accent/50 hover:bg-accent transition-colors"
                  >
                    {suggestion}
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="px-4 py-3 border-t">
            <div className="flex space-x-2">
              <Input
                placeholder="Ask me about CRM data..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 text-sm"
              />
              <Button
                onClick={() => handleSendMessage(message)}
                disabled={!message.trim() || isTyping}
                size="sm"
                className="px-3"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AIAssistant;
