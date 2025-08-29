import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"

/**
 * SEO metadata for the application.
 * This information helps search engines understand the content of the page.
 */
export const metadata: Metadata = {
  title: 'ChatFlow - AI-Powered Modular Chatbot',
  description: 'Engage with ChatFlow, a modular and intelligent chatbot framework designed for seamless conversation. Built with Next.js and Genkit.',
  keywords: ['AI chatbot', 'Next.js', 'Genkit', 'chatbot framework', 'conversational AI'],
};

/**
 * The root layout component for the entire application.
 * It wraps every page and provides a consistent structure.
 *
 * @param {object} props - The properties for the component.
 * @param {React.ReactNode} props.children - The child components to be rendered within the layout.
 * @returns {JSX.Element} The root layout structure.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to Google Fonts for better performance. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Import custom fonts. */}
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      {/* Apply the body font and antialiasing for smoother text. */}
      <body className="font-body antialiased">
        {children}
        {/* The Toaster component is used to display pop-up notifications (toasts). */}
        <Toaster />
      </body>
    </html>
  );
}
