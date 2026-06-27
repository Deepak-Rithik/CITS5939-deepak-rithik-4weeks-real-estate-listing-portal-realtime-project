# Real Estate Portal - Architecture

## System Overview

The Real Estate Portal is built with a modern full-stack architecture:

- **Frontend**: Next.js 14 (React) with TypeScript and Tailwind CSS
- **Backend**: Express.js with TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Real-time**: Socket.io for live updates
- **Authentication**: JWT tokens

## Request Flow

### Property Search Flow
1. User enters search criteria in frontend UI
2. Frontend makes GET request to `/api/properties?filters=...`
3. Backend validates and processes request
4. Prisma queries PostgreSQL database
5. Results returned as JSON
6. Frontend renders property cards

### Authentication Flow
1. User submits email/password on login page
2. Backend validates credentials against database
3. Password compared using bcryptjs
4. JWT token generated with user ID
5. Token stored in localStorage on frontend
6. Token included in Authorization header for protected routes

### Real-time Notifications
1. Backend emits events via Socket.io
2. Connected frontend clients receive updates
3. Frontend state updated (Zustand store)
4. UI re-renders with fresh data

## Database Schema

### Core Models

**User**
- Manages user accounts and authentication
- Relations: properties owned, reviews created, favorites, messages sent

**Property**
- Real estate listings with details
- Fields: title, description, address, price, bedrooms, bathrooms, area
- Relations: owner (User), images, reviews, favorites

**Image**
- Property images/photos
- Stores URLs for display

**Review**
- User ratings and comments on properties
- Rating: 1-5 scale
- Relations: property, author (User)

**Favorite**
- User's saved/wishlist properties
- Composite unique constraint on (userId, propertyId)

**Message**
- Direct messaging between users (future feature)
- Relations: sender (User)

## API Architecture

### Route Structure

```
/api
  /auth
    POST /register      - Create account
    POST /login         - Login user
  
  /properties
    GET /              - List all properties
    GET /:id           - Get property details
    POST /             - Create property (protected)
    PUT /:id           - Update property (owner only)
    DELETE /:id        - Delete property (owner only)
  
  /reviews
    GET /:propertyId   - Get property reviews
    POST /             - Create review (protected)
    PUT /:id           - Update review (author only)
    DELETE /:id        - Delete review (author only)
  
  /users
    GET /:id           - Get user profile
    PUT /:id           - Update profile (protected)
    GET /:id/favorites - List user favorites
    POST /favorites    - Add to favorites (protected)
    DELETE /favorites/:propertyId - Remove from favorites
```

### Middleware Stack

1. **Helmet**: Security headers
2. **CORS**: Cross-origin requests
3. **Morgan**: Request logging
4. **Express JSON**: Parse JSON bodies
5. **Auth**: JWT token validation
6. **Error Handler**: Consistent error responses

## Frontend Architecture

### Pages

- **Home**: Featured properties showcase
- **Properties**: Search and filter properties
- **Login**: User authentication
- **Register**: New account creation
- **Property Details**: Full property information (future)
- **Profile**: User account management (future)

### State Management

- **Zustand**: Global state for user, auth, favorites
- **React Hooks**: Component-level state
- **Axios**: HTTP client with interceptors

### UI Components

- Navigation bar with links
- Property cards grid
- Search filters
- Form components
- Error/success messages

## Security

### Authentication
- **Method**: JWT (JSON Web Tokens)
- **Storage**: localStorage (frontend)
- **Expiry**: 7 days (configurable)
- **Secret**: Environment variable (JWT_SECRET)

### Password Security
- **Hashing**: bcryptjs (10 salt rounds)
- **Never stored in plaintext**
- **Compared using bcrypt.compare()**

### Authorization
- **Route Protection**: authenticateToken middleware
- **Owner Verification**: User can only modify own properties
- **Admin Features**: Future implementation

### Data Validation
- **Input Validation**: Zod schemas
- **Request Bodies**: Validated before processing
- **Error Messages**: Consistent format

## Performance Optimizations

### Database
- **Indexing**: Unique on email, foreign key indexes
- **Query Optimization**: Select only needed fields
- **Pagination**: Future implementation for large datasets

### Frontend
- **Next.js Optimization**: Built-in image/code optimization
- **Lazy Loading**: Components loaded on-demand
- **Caching**: HTTP cache headers

### Deployment
- **Docker**: Containerized services for consistency
- **Docker Compose**: Easy local development
- **Environment Configuration**: Via .env files

## Scalability Considerations

### Current Limitations
- No pagination on property listings
- All properties loaded at once
- No caching layer (Redis)

### Future Improvements
1. **Pagination**: Load properties in chunks
2. **Caching**: Redis for frequently accessed data
3. **Database**: Read replicas for scaling queries
4. **CDN**: CloudFront or Cloudflare for static assets
5. **Search**: Elasticsearch for advanced filtering
6. **Load Balancing**: Multiple backend instances
7. **Real-time**: Scale Socket.io with Redis adapter

## Development Workflow

### Local Setup
```
1. Clone repository
2. Copy .env.example to .env
3. Run docker-compose up --build
4. Access at http://localhost:3000
```

### Code Organization
- Backend: TypeScript + Express patterns
- Frontend: Next.js App Router conventions
- Database: Prisma migrations in git
- Documentation: Architecture & Setup guides

## Testing Strategy (Future)

### Backend Testing
- Unit tests for business logic
- Integration tests for API endpoints
- Database: Test migrations and constraints

### Frontend Testing
- Component tests with React Testing Library
- E2E tests with Playwright/Cypress
- Accessibility testing

## Deployment Pipeline

### Environments
1. **Development**: Local docker-compose
2. **Staging**: Git branch or separate cluster
3. **Production**: Cloud deployment

### CI/CD (GitHub Actions)
- Run tests on PR/push
- Build Docker images
- Deploy to production on main branch

## Monitoring & Logging

### Backend Logging
- Morgan: HTTP request logging
- Console: Application events
- Future: Centralized logging (ELK, CloudWatch)

### Error Handling
- Try-catch blocks in async handlers
- Centralized error middleware
- Consistent JSON error responses

### Future Monitoring
- Sentry: Error tracking
- DataDog: Performance monitoring
- Custom metrics: Property views, user signups
