import ChatWidget from "@/components/chat/ChatWidget";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8 bg-background relative">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-black/50" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] bg-primary/10 rounded-full blur-[150px] animate-pulse" />
      <div className="w-full max-w-2xl text-center mb-8 z-10">
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
