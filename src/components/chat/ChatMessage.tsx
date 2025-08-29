"use client";

import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

// Define the type for a single message object.
export type Message = {
  role: "user" | "bot"; // The role determines who sent the message.
  content: string;     // The text content of the message.
};

/**
 * A component to display a single chat message.
 * It renders differently based on whether the message is from the user or the bot.
 *
 * @param {object} props - The properties for the component.
 * @param {Message} props.message - The message object to display.
 * @returns {JSX.Element} The rendered chat message.
 */
export function ChatMessage({ message }: { message: Message }) {
  const isBot = message.role === "bot";

  return (
    <div
      className={cn(
        "flex items-start gap-3",
        // Align user messages to the right and bot messages to the left.
        !isBot ? "flex-row-reverse" : "justify-start"
      )}
    >
      {/* Avatar for the user or bot */}
      <div
        className={cn(
          "flex size-8 shrink-0 select-none items-center justify-center rounded-full",
          // Style the avatar based on the role.
          isBot ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
        )}
      >
        {isBot ? <Bot size={20} /> : <User size={20} />}
      </div>
      {/* The message content bubble */}
      <div
        className={cn(
          "max-w-[80%] rounded-lg px-4 py-3 text-sm leading-6",
          // Style the message bubble based on the role.
          isBot ? "bg-secondary text-secondary-foreground" : "bg-primary text-primary-foreground"
        )}
      >
        {message.content}
      </div>
    </div>
  );
}
