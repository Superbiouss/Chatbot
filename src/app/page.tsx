import ChatWidget from "@/components/chat/ChatWidget";

/**
 * The main page component for the application.
 * It serves as the entry point and primary view for users.
 *
 * @returns {JSX.Element} The rendered main page.
 */
export default function Home() {
  return (
    // The main container with flexbox layout to center content.
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-background relative">
      {/* Page header section */}
      <div className="w-full max-w-2xl text-center mb-8 z-10">
        {/* Main headline */}
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">
          ChatFlow
        </h1>
        {/* Subtitle/tagline */}
        <p className="text-muted-foreground mt-2 text-lg">
          Your Modular AI Chatbot Framework
        </p>
      </div>
      {/* The main chat widget component */}
      <ChatWidget />
    </main>
  );
}
