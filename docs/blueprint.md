# **App Name**: ChatFlow

## Core Features:

- Intent Recognition: Analyze user input to determine the user's intent, using regex and an optional LLM fallback for complex queries as a tool.
- Dialogue Management: Maintain conversation state, context, and handle slot filling using a session storage mechanism. Store session tokens in local storage.
- Configurable Responses: Deliver static or dynamic responses based on user input and intent, with the option to extend through API calls defined within JSON configurations. Uses a configuration file located in /config.
- Web Chat Widget: React-based chat widget for web integration. Uses Nextjs framework to manage frontend complexity.
- Configuration System: Define intents, entities, and responses using JSON/YAML files. This is where admins create the different conversational journeys their users will follow.
- Basic Analytics: Track conversation flow, success rate, and errors with basic logging.

## Style Guidelines:

- Primary color: HSL(210, 65%, 50%) - RGB(#3399FF). A vibrant blue to convey trust and innovation. The feeling that is being evoked with blue will serve as the foundation.
- Background color: HSL(210, 20%, 95%) - RGB(#F0F8FF). A very light tint of blue creates a clean and unobtrusive backdrop, for a light color scheme.
- Accent color: HSL(180, 50%, 50%) - RGB(#40BFBF). A contrasting teal to highlight interactive elements.
- Font pairing: 'Space Grotesk' (sans-serif) for headlines and 'Inter' (sans-serif) for body text. Ensures a balance of modernity and readability.
- Use minimalist icons from a consistent set (e.g., Font Awesome) to represent actions and categories.
- Employ a clean, card-based layout with generous white space to promote clarity and ease of use.
- Incorporate subtle transitions and animations for feedback and a smoother user experience.