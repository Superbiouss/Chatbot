import ChatWidget from "@/components/chat/ChatWidget";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8 bg-background">
      <div className="w-full max-w-2xl text-center mb-8">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">
          ChatFlow
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Your Modular AI Chatbot Framework
        </p>
      </div>
      <ChatWidget />
    </main>
  );
}
