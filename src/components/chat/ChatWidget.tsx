"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import { v4 as uuidv4 } from "uuid";
import { Bot, Send, User, LoaderCircle, CornerDownLeft } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { handleUserMessage } from "@/app/actions";
import { ChatMessage, type Message } from "./ChatMessage";

const SESSION_ID_KEY = "chatflow-session-id";

export default function ChatWidget() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      content:
        "Welcome to ChatFlow! I'm a modular AI assistant. How can I help you?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let storedSessionId = localStorage.getItem(SESSION_ID_KEY);
    if (!storedSessionId) {
      storedSessionId = uuidv4();
      localStorage.setItem(SESSION_ID_KEY, storedSessionId);
    }
    setSessionId(storedSessionId);
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !sessionId) return;

    const userMessage: Message = { role: "user", content: input };
    const newMessages: Message[] = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const responseStream = await handleUserMessage(
        sessionId,
        input,
        messages
      );
      
      const reader = responseStream.getReader();
      const decoder = new TextDecoder();
      let botMessage = "";
      
      setMessages((prev) => [...prev, { role: "bot", content: "" }]);

      const processStream = async () => {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          botMessage += decoder.decode(value, { stream: true });
          
          setMessages((prev) => {
            const lastMessage = prev[prev.length - 1];
            if (lastMessage.role === 'bot') {
              lastMessage.content = botMessage;
              return [...prev.slice(0, -1), lastMessage];
            }
            return prev;
          });
        }
        setIsLoading(false);
        inputRef.current?.focus();
      };
      
      processStream();

    } catch (error) {
       setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content: "Sorry, something went wrong. Please try again.",
        },
      ]);
       setIsLoading(false);
       inputRef.current?.focus();
    }
  };

  return (
    <Card className="w-full max-w-lg shadow-xl rounded-xl border bg-card/80 backdrop-blur-sm z-10">
      <CardHeader className="text-center border-b">
        <CardTitle className="font-headline flex items-center justify-center gap-2 text-xl">
          <Bot className="text-primary" />
          AI Assistant
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[450px] pr-4" ref={scrollAreaRef}>
          <div className="space-y-6 py-6">
            {messages.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))}
            {isLoading && messages[messages.length -1].role !== 'bot' && (
              <div className="flex items-start gap-3">
                <div className="flex size-8 shrink-0 select-none items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Bot size={20} />
                </div>
                <div className="flex items-center space-x-2 rounded-lg bg-secondary px-4 py-3">
                  <LoaderCircle className="h-5 w-5 animate-spin text-muted-foreground" />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="border-t pt-6">
        <form onSubmit={handleSubmit} className="flex w-full items-center gap-2">
          <div className="relative flex-1">
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 pr-12 text-base"
              disabled={isLoading}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground pointer-events-none">
              <CornerDownLeft size={16} />
            </div>
          </div>
          <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
