# Portfolio Project Structure

## Core Directories
- `/app` - Next.js app router
- `/public` - Static assets (images, fonts)
- `/components` - Reusable UI components
- `/lib` - Utility functions and helpers
- `/styles` - Global styles/Tailwind config
- `/content` - Portfolio content (markdown/JSON)

## Recommended Setup
1. Keep page-specific components in `/app/(page)/components`
2. Store portfolio projects in `/content/projects`
3. Use `/lib/constants.ts` for site-wide config
