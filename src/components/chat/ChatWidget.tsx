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

// Key for storing the session ID in localStorage.
const SESSION_ID_KEY = "chatflow-session-id";

/**
 * The main component for the chat interface.
 * It handles state management, user input, and communication with the AI backend.
 */
export default function ChatWidget() {
  // State for the list of messages in the chat.
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      content:
        "Welcome to ChatFlow! I'm a modular AI assistant. How can I help you?",
    },
  ]);
  // State for the user's current input text.
  const [input, setInput] = useState("");
  // State to track if the AI is currently generating a response.
  const [isLoading, setIsLoading] = useState(false);
  // State for the unique session ID.
  const [sessionId, setSessionId] = useState<string | null>(null);
  
  // Refs for DOM elements to allow direct manipulation.
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Effect to initialize the session ID from localStorage or create a new one.
  useEffect(() => {
    let storedSessionId = localStorage.getItem(SESSION_ID_KEY);
    if (!storedSessionId) {
      storedSessionId = uuidv4();
      localStorage.setItem(SESSION_ID_KEY, storedSessionId);
    }
    setSessionId(storedSessionId);
    // Automatically focus the input field on component mount.
    inputRef.current?.focus();
  }, []);

  // Effect to automatically scroll to the bottom of the chat when new messages are added.
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  /**
   * Handles the submission of the chat form.
   * @param {FormEvent<HTMLFormElement>} e - The form submission event.
   */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !sessionId) return;

    // Add the user's message to the chat.
    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Call the server action to get a streamed response from the AI.
      const responseStream = await handleUserMessage(
        sessionId,
        input,
        messages
      );
      
      const reader = responseStream.getReader();
      const decoder = new TextDecoder();
      let botMessage = "";
      
      // Add a new, empty bot message to the state to be populated by the stream.
      setMessages((prev) => [...prev, { role: "bot", content: "" }]);

      // Function to process the incoming stream.
      const processStream = async () => {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break; // Exit loop when the stream is finished.

          // Decode the chunk and append it to the bot's message.
          botMessage += decoder.decode(value, { stream: true });
          
          // Update the last message in the state with the new content.
          // This creates the "typing" effect.
          setMessages((prev) => {
            const newMessages = [...prev];
            const lastMessage = newMessages[newMessages.length - 1];
            if (lastMessage.role === 'bot') {
              lastMessage.content = botMessage;
            }
            return newMessages;
          });
        }
        // Once the stream is done, update loading state and focus the input.
        setIsLoading(false);
        inputRef.current?.focus();
      };
      
      processStream();

    } catch (error) {
       // Handle any errors during the streaming process.
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
        {/* The scrollable area for chat messages. */}
        <ScrollArea className="h-[50vh] md:h-[450px] pr-4" ref={scrollAreaRef}>
          <div className="space-y-6 py-6">
            {messages.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))}
            {/* Show a loading indicator while the bot is thinking. */}
            {isLoading && (
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
        {/* The chat input form. */}
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
            {/* Visual hint for submitting with the Enter key. */}
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
