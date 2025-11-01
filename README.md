# 🎬 The Flix Search

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Drizzle](https://img.shields.io/badge/Drizzle-FF6B6B?style=for-the-badge&logo=drizzle&logoColor=white)](https://orm.drizzle.team/)

> **Find where your favorite movies and shows are streaming**

[🌐 Live Website](https://www.theflixsearch.com/) • [✨ Features](#-key-features)

<!-- • [🚀 Getting Started](#-getting-started) -->
<!-- • [🤝 Contributing](#-contributing) -->

---

## 📖 About

**The Flix Search** is a modern web application that helps you discover where your favorite movies and TV shows are available for streaming. Built with Next.js and powered by the TMDB API, it provides comprehensive streaming availability data across multiple platforms and countries.

![Flix Search Preview](/public/streamingProviders.jpg)

## ✨ Key Features

- **🔍 Universal Search**: Search for any movie or TV show with instant results
- **📊 Streaming Analytics**: View availability by country or streaming platform
- **🎭 Detailed Information**: Comprehensive movie/show details, cast, and crew
- **📱 Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **👤 User Accounts**: Create watchlists and manage your favorite content
- **🌍 Global Coverage**: Streaming data for multiple countries and platforms
- **🎨 Modern UI**: Clean, intuitive interface built with Tailwind CSS

## 🏗️ Architecture

- **Frontend**: Next.js 14 with App Router
- **Styling**: Tailwind CSS + shadcn/ui components
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: NextAuth.js
- **API**: TMDB (The Movie Database) API
- **Deployment**: Vercel

<!-- ## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- TMDB API key ([Get one here](https://developer.themoviedb.org/docs/getting-started))

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/jesus-b32/flix-search.git
cd flix-search
```

1. **Install dependencies**

```bash
npm install
```

1. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Fill in your environment variables:

   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/flixsearch"
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   TMDB_API_KEY="your-tmdb-api-key"
   ```

1. **Set up the database**

```bash
npm run db:push
```

1. **Start the development server**

```bash
npm run dev
```

1. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000) -->

## 📱 Usage

### Search & Discovery

- Use the search bar to find movies and TV shows
- Browse discover pages with advanced filtering options
- Switch between movie and TV show results

### Streaming Information

- **By Country**: Select a country to see available streaming platforms
- **By Platform**: Choose a streaming service to see available countries

### User Features

- Create an account to save your watchlist
- Add/remove movies and shows from your favorites
- Manage your profile and account settings

<!-- ## 🛠️ Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Database
npm run db:push      # Push schema to database
npm run db:studio    # Open Drizzle Studio

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks
npm run test         # Run tests
``` -->

<!-- ### Project Structure

```text
flix-search/
├── src/
│   ├── app/                 # Next.js app router
│   ├── components/          # Reusable components
│   ├── lib/                 # Utilities and configurations
│   ├── styles/              # Global styles
│   └── types/               # TypeScript type definitions
├── public/                  # Static assets
├── drizzle/                 # Database schema and migrations
└── docs/                    # Documentation
``` -->

<!-- ## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**

   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Commit your changes**

   ```bash
   git commit -m 'Add some amazing feature'
   ```

4. **Push to the branch**

   ```bash
   git push origin feature/amazing-feature
   ```

5. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed -->

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [TMDB](https://www.themoviedb.org/) for providing the comprehensive movie and TV show database
- [Next.js](https://nextjs.org/) team for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library

## 📞 Contact

<!-- ### Jesus Bobadilla -->

- GitHub: [@jesus-b32](https://github.com/jesus-b32)
- Project Link: [https://github.com/jesus-b32/flix-search](https://github.com/jesus-b32/flix-search)

---

<!-- **Made with ❤️ by [Jesus Bobadilla](https://github.com/jesus-b32)** -->

[⬆️ Back to Top](#-the-flix-search)
