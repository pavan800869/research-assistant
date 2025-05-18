# AI Research Assistant

A Next.js application that helps researchers and students analyze academic papers using AI. Upload your research papers, ask questions, and get instant insights powered by artificial intelligence.

## Features

- 📄 Document Upload: Upload research papers in PDF format
- 🤖 AI Analysis: Get instant analysis and insights from your papers
- 💬 Natural Language Queries: Ask questions about your papers in plain English
- 🔒 Secure Storage: Your documents are encrypted and stored securely
- 👤 User Authentication: Secure sign-in and sign-up using Clerk
- 📱 Responsive Design: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Authentication**: Clerk
- **Database**: MongoDB with GridFS for file storage
- **Styling**: Tailwind CSS with custom configuration
- **Deployment**: Vercel (recommended)

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 18.x or later
- npm or yarn
- MongoDB (local or Atlas)

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/research-assistant.git
cd research-assistant
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory with the following variables:
```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# MongoDB
MONGODB_URI=your_mongodb_connection_string

# Next.js
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── api/              # API routes
│   ├── components/       # Reusable components
│   ├── lib/             # Utility functions and configurations
│   ├── pages/           # Page components
│   └── types/           # TypeScript type definitions
├── public/              # Static assets
└── styles/             # Global styles
```

## Environment Variables

### Required Variables

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Your Clerk publishable key for authentication
- `CLERK_SECRET_KEY`: Your Clerk secret key for server-side authentication
- `MONGODB_URI`: MongoDB connection string
- `NEXT_PUBLIC_APP_URL`: Your application URL (development/production)

### Optional Variables

- `NEXT_PUBLIC_CLERK_SIGN_IN_URL`: Custom sign-in URL (default: /sign-in)
- `NEXT_PUBLIC_CLERK_SIGN_UP_URL`: Custom sign-up URL (default: /sign-up)
- `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL`: Redirect URL after sign-in
- `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL`: Redirect URL after sign-up

## API Routes

- `POST /api/documents/upload`: Upload a new document
- `GET /api/documents`: Fetch all documents for the authenticated user
- `GET /api/documents/[id]`: Fetch a specific document
- `DELETE /api/documents/[id]`: Delete a document
- `GET /api/documents/[id]/view`: Stream document content

## Authentication

The application uses Clerk for authentication. Protected routes are handled through middleware, ensuring only authenticated users can access certain pages.

## Database Schema

### Documents Collection
```typescript
{
  _id: ObjectId,
  title: string,
  description?: string,
  userId: string,
  fileId: ObjectId,
  status: 'processing' | 'completed' | 'failed',
  createdAt: Date,
  updatedAt: Date
}
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@research-assistant.com or open an issue in the repository.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Clerk](https://clerk.dev/)
- [MongoDB](https://www.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/)
