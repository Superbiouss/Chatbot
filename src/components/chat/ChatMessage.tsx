"use client";

import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

export type Message = {
  role: "user" | "bot";
  content: string;
};

export function ChatMessage({ message }: { message: Message }) {
  const isBot = message.role === "bot";

  return (
    <div
      className={cn(
        "flex items-start gap-3",
        !isBot ? "flex-row-reverse" : "justify-start"
      )}
    >
      <div
        className={cn(
          "flex size-8 shrink-0 select-none items-center justify-center rounded-full",
          isBot ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
        )}
      >
        {isBot ? <Bot size={20} /> : <User size={20} />}
      </div>
      <div
        className={cn(
          "max-w-[80%] rounded-lg px-4 py-3 text-sm leading-6",
          isBot ? "bg-secondary text-secondary-foreground" : "bg-primary text-primary-foreground"
        )}
      >
        {message.content}
      </div>
    </div>
  );
}
