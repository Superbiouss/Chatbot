# ChatFlow - AI-Powered Modular Chatbot

ChatFlow is a modern, AI-powered chatbot framework built with Next.js and Google's Genkit. It provides a conversational interface that streams responses from a generative AI model, offering a dynamic and engaging user experience.

## Key Features

- **AI-Powered Conversations:** Leverages a powerful generative AI model to provide intelligent and conversational responses.
- **Real-time Response Streaming:** The chatbot's responses are streamed word-by-word, creating a dynamic and "live" feel.
- **Minimalistic & Elegant UI:** A clean, light-themed, and responsive user interface inspired by modern design principles.
- **SEO Friendly:** Optimized with descriptive metadata for better search engine discovery.
- **Performant:** Built on Next.js with performance best practices, including optimized component rendering.
- **Modular & Extendable:** The project structure is organized to be easily understandable and extendable.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (React)
- **Generative AI:** [Google Genkit](https://firebase.google.com/docs/genkit)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
- **Icons:** [Lucide React](https://lucide.dev/guide/packages/lucide-react)
- **Deployment:** Ready for [Firebase App Hosting](https://firebase.google.com/docs/app-hosting)

## Project Structure

```
.
├── src
│   ├── ai
│   │   ├── dev.ts              # Genkit development server entry point
│   │   ├── flows
│   │   │   └── generate-response.ts # Genkit flow for generating AI responses
│   │   └── genkit.ts           # Genkit AI plugin configuration
│   ├── app
│   │   ├── actions.ts          # Next.js Server Action to handle form submissions
│   │   ├── globals.css         # Global CSS styles and Tailwind definitions
│   │   ├── layout.tsx          # Root layout component
│   │   └── page.tsx            # Main page component
│   ├── components
│   │   ├── chat
│   │   │   ├── ChatMessage.tsx # Component for an individual chat message
│   │   │   └── ChatWidget.tsx  # The main chat interface component
│   │   └── ui                  # shadcn/ui components
│   └── lib
│       └── utils.ts            # Utility functions (e.g., `cn` for classnames)
├── next.config.ts              # Next.js configuration
├── package.json                # Project dependencies and scripts
└── README.md                   # You are here!
```

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) (version 20 or later)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd <repository_name>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Running the Development Server

The application uses Genkit for the AI backend and Next.js for the frontend. You'll need to run both concurrently in separate terminal windows.

1.  **Run the Genkit development server:**
    This server powers the AI capabilities of the chatbot.
    ```bash
    npm run genkit:dev
    ```

2.  **Run the Next.js frontend server:**
    This server renders the user interface.
    ```bash
    npm run dev
    ```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

## How It Works

1.  The user types a message in the `ChatWidget` component (`src/components/chat/ChatWidget.tsx`).
2.  On submission, the `handleUserMessage` Server Action (`src/app/actions.ts`) is called.
3.  This action invokes the `generateResponse` Genkit flow (`src/ai/flows/generate-response.ts`).
4.  The `generateResponse` flow sends the user's message and conversation history to the configured AI model and requests a response.
5.  It returns a `ReadableStream` of the AI's response.
6.  The `ChatWidget` component reads from this stream, decoding the text chunk by chunk and updating the UI in real-time to create a typing effect.
