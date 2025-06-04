# codeIt

**codeIt** is a modern, interactive coding platform built with Next.js, designed for real-time collaboration, code execution, and seamless learning.

## Features

- **Real-Time Collaboration**: Collaborate with peers in real-time, sharing code and ideas instantly.
- **Code Execution**: Write and execute code snippets directly within the browser.
- **Multi-Language Support**: Supports various programming languages for a versatile coding experience.
- **User Authentication**: Secure login and registration system to manage user sessions.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: Prisma ORM with PostgreSQL
- **Real-Time Communication**: WebSockets
- **Authentication**: NextAuth.js
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js (v14 or above)
- npm or yarn
- PostgreSQL database

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/vivek31singh/latest-codeit.git
   cd latest-codeit
   ```

2. **Install dependencies**:

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**:

   Create a `.env` file in the root directory and add the following:

   ```env
   DATABASE_URL=your_postgresql_database_url
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret
   ```

4. **Run database migrations**:

   ```bash
   npx prisma migrate dev --name init
   ```

5. **Start the development server**:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
latest-codeit/
├── app/                # Next.js app directory
├── components/         # Reusable React components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and libraries
├── prisma/             # Prisma schema and migrations
├── public/             # Static assets
├── styles/             # Global styles
├── pages/              # Next.js pages
├── wsServer.js         # WebSocket server for real-time features
├── middleware.ts       # Custom middleware
├── next.config.ts      # Next.js configuration
├── tailwind.config.ts  # Tailwind CSS configuration
├── tsconfig.json       # TypeScript configuration
├── package.json        # Project metadata and scripts
└── README.md           # Project documentation
```

## Available Scripts

- `npm run dev` - Starts the development server.
- `npm run build` - Builds the application for production.
- `npm run start` - Starts the production server.
- `npx prisma studio` - Launches Prisma Studio for database management.

## Deployment

The application is ready to be deployed on platforms like Vercel. Ensure that all environment variables are set appropriately in the deployment environment.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

For more information, visit the [GitHub repository](https://github.com/vivek31singh/latest-codeit).
