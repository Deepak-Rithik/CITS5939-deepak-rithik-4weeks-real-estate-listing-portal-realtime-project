# Real Estate Portal - Setup & Installation Guide

## 🚀 Quick Start (5 minutes with Docker)

### Prerequisites
- Docker & Docker Compose installed
- Git installed

### Steps

```bash
# 1. Clone repository
git clone https://github.com/Deepak-Rithik/CITS5939-deepak-rithik-4weeks-real-estate-listing-portal-realtime-project.git
cd CITS5939-deepak-rithik-4weeks-real-estate-listing-portal-realtime-project

# 2. Setup environment
cp .env.example .env

# 3. Start all services
docker-compose up --build

# Wait for services to be healthy...
```

Once running:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/api/health

## 📋 Full Requirements

### System Requirements
- **OS**: macOS, Linux, or Windows (WSL2)
- **Node.js**: 18.x or higher
- **Docker**: 20.x or higher
- **Docker Compose**: 1.29 or higher
- **Git**: Latest version
- **RAM**: 4GB minimum (8GB recommended)
- **Disk Space**: 5GB for Docker images and dependencies

### Check Your Versions
```bash
node --version      # Should be v18.x.x or higher
npm --version       # Should be 8.x.x or higher
docker --version    # Should be 20.x.x or higher
docker-compose --version  # Should be 1.29.x or higher
git --version       # Any recent version
```

## 🐳 Setup with Docker (Recommended)

### 1. Clone the Repository
```bash
git clone https://github.com/Deepak-Rithik/CITS5939-deepak-rithik-4weeks-real-estate-listing-portal-realtime-project.git
cd CITS5939-deepak-rithik-4weeks-real-estate-listing-portal-realtime-project
```

### 2. Configure Environment
```bash
# Copy environment template
cp .env.example .env

# Review .env (defaults work for local development)
cat .env
```

### 3. Start Services
```bash
# Build and start all containers
docker-compose up --build

# On first run, this will:
# - Download PostgreSQL image
# - Download Node images
# - Build backend container
# - Build frontend container
# - Start all services
```

### 4. Initialize Database
In a new terminal:
```bash
# Run database migrations
docker-compose exec backend npm run migrate

# (Optional) Seed with sample data
docker-compose exec backend npm run seed
```

### 5. Access Application
- **Web App**: http://localhost:3000
- **API Server**: http://localhost:5000
- **Database**: localhost:5432

## 💻 Local Development Setup (Without Docker)

### Prerequisites
- Node.js 18+
- PostgreSQL installed and running
- npm or pnpm

### 1. Install PostgreSQL

**macOS** (using Homebrew):
```bash
brew install postgresql
brew services start postgresql
```

**Linux** (Ubuntu/Debian):
```bash
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib
sudo systemctl start postgresql
```

**Windows**:
Download from https://www.postgresql.org/download/windows/

### 2. Setup Database
```bash
# Create database
createdb real_estate_db

# Or using psql:
psql -U postgres
# Then in psql:
CREATE DATABASE real_estate_db;
\q
```

### 3. Backend Setup
```bash
cd backend

# Install dependencies
npm install
# or with pnpm:
pnpm install

# Create .env file
cat > .env << EOF
DATABASE_URL=postgresql://postgres:@localhost:5432/real_estate_db
JWT_SECRET=dev_secret_key_change_in_production
JWT_EXPIRY=7d
NODE_ENV=development
API_PORT=5000
CORS_ORIGIN=http://localhost:3000
EOF

# Run database migrations
npm run migrate

# Start development server
npm run dev
```

Backend runs on http://localhost:5000

### 4. Frontend Setup
In another terminal:
```bash
cd frontend

# Install dependencies
npm install
# or with pnpm:
pnpm install

# Start development server
npm run dev
```

Frontend runs on http://localhost:3000

## 🗄️ Database Setup Details

### Prisma Migrations

```bash
# Generate new migration
npm run migrate

# View migrations
ls backend/prisma/migrations/

# Reset database (⚠️ removes all data)
npm run migrate:reset

# Seed sample data
npm run seed
```

### Access PostgreSQL Directly

```bash
# Connect to database
psql -U postgres -d real_estate_db -h localhost

# List tables
\dt

# View schema
\d "User"

# Run a query
SELECT * FROM "User";

# Exit
\q
```

## 📁 Project Structure

```
real-estate-portal/
├── backend/
│   ├── src/
│   │   ├── controllers/        # Request handlers
│   │   │   ├── authController.ts
│   │   │   └── propertyController.ts
│   │   ├── middleware/         # Auth & validation
│   │   │   └── auth.ts
│   │   ├── routes/            # API endpoints
│   │   │   ├── auth.ts
│   │   │   └── properties.ts
│   │   ├── config/            # Configuration
│   │   │   └── database.ts
│   │   └── index.ts           # Server entry point
│   ├── package.json
│   ├── tsconfig.json
│   ├── Dockerfile
│   └── .env.example
│
├── frontend/
│   ├── app/
│   │   ├── layout.tsx         # Root layout with nav
│   │   ├── page.tsx           # Home page
│   │   ├── globals.css        # Global styles
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── register/
│   │   │   └── page.tsx
│   │   └── properties/
│   │       └── page.tsx
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   ├── next.config.js
│   ├── Dockerfile
│   └── .eslintrc.json
│
├── database/
│   └── prisma/
│       ├── schema.prisma      # Database schema definition
│       └── migrations/        # Migration files
│
├── docker-compose.yml         # Multi-container configuration
├── .env.example              # Environment variables template
├── .gitignore
├── README.md                 # Main documentation
├── ARCHITECTURE.md           # System design documentation
└── SETUP.md                  # This file
```

## 🔧 Docker Commands Reference

### Basic Commands
```bash
# Start services
docker-compose up

# Start in background
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f postgres

# Rebuild containers
docker-compose up --build

# Remove all volumes (clean slate)
docker-compose down -v
```

### Service Management
```bash
# Check status
docker-compose ps

# Restart service
docker-compose restart backend

# Execute command in container
docker-compose exec backend npm list

# Shell access
docker-compose exec backend sh
```

## 🧪 Testing the API

### Using curl

```bash
# Health check
curl http://localhost:5000/api/health

# Get all properties
curl http://localhost:5000/api/properties

# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'

# Login and get token
RESPONSE=$(curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }')

TOKEN=$(echo $RESPONSE | grep -o '"token":"[^"]*' | cut -d'"' -f4)

# Use token for authenticated request
curl http://localhost:5000/api/properties \
  -H "Authorization: Bearer $TOKEN"
```

### Using Postman
1. Download [Postman](https://www.postman.com/downloads/)
2. Import collection (or create manually)
3. Create POST request to `http://localhost:5000/api/auth/login`
4. Body (raw JSON):
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
5. Send and copy token from response
6. For authenticated requests, add header: `Authorization: Bearer <token>`

## 🐛 Troubleshooting

### Port Already in Use

**macOS/Linux**:
```bash
# Find process on port
lsof -i :3000    # Frontend
lsof -i :5000    # Backend
lsof -i :5432    # Database

# Kill process
lsof -ti:3000 | xargs kill -9
```

**Windows**:
```powershell
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**Solution**: Change ports in docker-compose.yml or .env

### Database Connection Failed

```bash
# Check if PostgreSQL container is running
docker-compose ps postgres

# View PostgreSQL logs
docker-compose logs postgres

# Restart database
docker-compose restart postgres

# Verify connection string in .env
echo $DATABASE_URL
```

### Backend Won't Start

```bash
# Check dependencies
docker-compose exec backend npm list

# View backend logs
docker-compose logs backend --tail=50

# Rebuild backend
docker-compose up --build backend
```

### Frontend Build Error

```bash
# Clear Next.js cache
rm -rf frontend/.next

# Rebuild frontend
docker-compose up --build frontend

# Verify Node version
node --version  # Should be 18+
```

### Cannot Connect to API from Frontend

```bash
# Check CORS origin in backend .env
cat backend/.env | grep CORS

# Ensure correct API URL in frontend
# Should be http://localhost:5000 locally
# Or http://backend:5000 in Docker

# Restart both services
docker-compose restart backend frontend
```

## 📚 Common Development Tasks

### Start Fresh
```bash
# Remove everything and start over
docker-compose down -v
docker-compose up --build

# In another terminal
docker-compose exec backend npm run migrate
```

### View Database

```bash
# Connect to database
docker-compose exec postgres psql -U user -d real_estate_db

# List tables
\dt

# View users
SELECT * FROM "User";

# Exit
\q
```

### Add New Package

```bash
# Backend
docker-compose exec backend npm install package-name

# Frontend
docker-compose exec frontend npm install package-name
```

### View Live Logs

```bash
# All services
docker-compose logs -f

# Single service
docker-compose logs -f backend
```

## 🚀 Next Steps

1. **Explore the Code**: Browse `backend/src/` and `frontend/app/`
2. **Test the API**: Visit http://localhost:5000/api/health
3. **Create Account**: Register at http://localhost:3000/register
4. **View Documentation**: Read ARCHITECTURE.md
5. **Implement Features**: See list in README.md

## 📖 Additional Resources

- **Next.js**: https://nextjs.org/docs
- **Express**: https://expressjs.com
- **Prisma**: https://www.prisma.io/docs
- **PostgreSQL**: https://www.postgresql.org/docs
- **Docker**: https://docs.docker.com
- **TypeScript**: https://www.typescriptlang.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs

## ❓ FAQ

**Q: Do I need Docker to run this project?**
A: No, you can run locally with Node.js and PostgreSQL. See "Local Development Setup" section.

**Q: What Node version do I need?**
A: Node.js 18 or higher. Check with `node --version`.

**Q: How do I reset the database?**
A: Run `docker-compose down -v` to remove volumes, then restart.

**Q: Can I use MySQL instead of PostgreSQL?**
A: Yes, but you'll need to update the Prisma schema and connection string.

**Q: How do I deploy this to production?**
A: See deployment docs in ARCHITECTURE.md or cloud provider guides.

## 🆘 Getting Help

- Check README.md for overview
- Read ARCHITECTURE.md for system design
- Review error messages in logs
- Search GitHub issues
- Create a new issue with error details

---

**Last Updated**: 2024
**Version**: 0.1.0
