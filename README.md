# Real Estate Listing Portal

A full-stack real estate listing portal with real-time updates, built with modern web technologies.

## Features

- 🏠 Browse and search property listings
- 🔐 User authentication & profiles
- ❤️ Favorites/wishlist management
- 🔔 Real-time notifications
- 📱 Responsive design
- 🗺️ Map integration for properties
- 💬 Contact property owners
- ⭐ Ratings & reviews
- 📊 Admin dashboard

## Tech Stack

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **HTTP Client:** Axios
- **Real-time:** Socket.io Client

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Real-time:** Socket.io
- **Authentication:** JWT

### DevOps
- **Containerization:** Docker & Docker Compose

## Project Structure

```
.
├── frontend/               # Next.js web application
├── backend/               # Express API server
├── database/              # Prisma schema & migrations
├── docker-compose.yml     # Local development stack
├── .env.example           # Environment variables template
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+
- Docker & Docker Compose
- pnpm (recommended)

### Quick Start (Docker)

```bash
# Clone repository
git clone https://github.com/Deepak-Rithik/CITS5939-deepak-rithik-4weeks-real-estate-listing-portal-realtime-project.git
cd CITS5939-deepak-rithik-4weeks-real-estate-listing-portal-realtime-project

# Copy environment variables
cp .env.example .env

# Start all services
docker-compose up --build
```

Services will be available at:
- **Frontend:** http://localhost:3000
- **API:** http://localhost:5000
- **Database:** localhost:5432

### Local Development

```bash
# Setup frontend
cd frontend
pnpm install
pnpm dev

# In another terminal, setup backend
cd backend
pnpm install
pnpm dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Properties
- `GET /api/properties` - List all properties
- `GET /api/properties/:id` - Get property details
- `POST /api/properties` - Create property (authenticated)
- `PUT /api/properties/:id` - Update property (owner only)
- `DELETE /api/properties/:id` - Delete property (owner only)

## Documentation

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed system design.

## Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit changes (`git commit -m 'Add amazing feature'`)
3. Push to branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## License

MIT
