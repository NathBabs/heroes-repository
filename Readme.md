# Humble Heroes Repository

<img width="1303" alt="Screenshot 2025-02-03 at 12 02 48 AM" src="https://github.com/user-attachments/assets/0c474415-c021-47b2-9cda-1570d0143b51" />


A monorepo containing a full-stack application for managing superheroes with humility scores. Built with NestJS (API) and React (Client).

## Project Structure

```
humble-heroes-repo/
├── packages/
│   ├── api/         # NestJS backend
│   └── client/      # React frontend
```

## Requirements
- Node.js >= 18.17.1
- Yarn v1.22+

## Features

- Create and list superheroes
- Validate humility scores
- Real-time updates
- Responsive design
- Error handling
- Cache control

## Tech Stack

**Backend:**
- NestJS
- TypeScript
- Class Validator

**Frontend:**
- React
- TypeScript
- TailwindCSS
- Axios
- Phosphor Icons

## API Endpoints

### Create Superhero
POST `/superheroes`
```bash
Request:
{
    "name": "The Silent Guardian",
    "superpower": "Invisibility & Healing Others",
    "humilityScore": 9
}

Response:
{
    "statusCode": 201,
    "success": true,
    "message": "Superhero created successfully",
    "data": {
        "name": "The Silent Guardian",
        "superpower": "Invisibility & Healing Others",
        "humilityScore": 9,
        "created_at": "2024-01-31T15:38:18.542Z"
    }
}
```

### List Superheroes
GET `/superheroes`

```bash
Response:
{
    "statusCode": 200,
    "success": true,
    "message": "Superheroes retrieved successfully",
    "data": [
        {
            "name": "The Silent Guardian",
            "superpower": "Invisibility & Healing Others",
            "humilityScore": 9,
            "created_at": "2024-01-31T15:38:18.542Z"
        }
    ]
}
```

<br>

## Getting Started

1. Clone the repository
```bash
git clone https://github.com/NathBabs/heroes-repository.git
```

2. Install dependencies
```bash
yarn install
```

3. Set up environment variables

**For API (packages/api/.env)**
```bash
# Create .env file in packages/api/
# Copy these values
PORT=5000
```

**For Client (packages/client/.env)**
```bash
# Create .env file in packages/client/
# Copy these values
VITE_API_URL=http://localhost:5000
```

4. Start both API and Client concurrently
```bash
yarn dev
```

Alternatively, you can start them separately:

**Start API only**
```bash
yarn api:dev
```

**Start Client only**
```bash
yarn client:dev
```

5. Open your browser and navigate to `http://localhost:5000` to access the client.

## Testing
Run tests with:
```bash
yarn test
```

<br>

## Data Validation Rules

- Name: Required, string
- Superpower: Required, string
- Humility Score: Required, number between 1-10

<br>

## Error Handling

The API returns structured error responses:
```json
{
    "statusCode": 409,
    "message": "Superhero already exists",
    "timestamp": "2024-01-31T15:38:18.542Z"
}
```
<br>

## **Collaborating with Team Members**  
Building the **Humble Heroes Repository** highlights several key areas where collaboration can enhance development, maintainability, and overall efficiency. Here’s how I would work with teammates to improve and expand the project:  

### **1. Code Review & Quality Assurance**  
- Introduce **pull request templates** to standardize code review processes.  
- Implement **automated linting, formatting, and code quality checks** (e.g., ESLint, Prettier, SonarQube).  
- Establish **shared coding standards documentation** to ensure consistency across the team.  

### **2. Feature Development & Enhancements**  
- Introduce **superhero categorization** (e.g., heroes by power type, origin, or affiliations).  
- Implement **user authentication and role-based access control** to define permissions for admins, contributors, and viewers.  
- Develop a **dashboard for superhero statistics** (e.g., most powerful, most humble, top-rated).  

### **3. Testing Strategy & Coverage**  
- Establish a **test-driven development (TDD) workflow** to ensure early bug detection.  
- Implement **unit tests for core services and controllers** to improve reliability.  
- Set up **integration and end-to-end testing** (e.g., Cypress, Playwright) to simulate real-world usage.  

### **4. Documentation & Developer Onboarding**  
- Maintain **comprehensive API documentation** with Swagger/OpenAPI for seamless API integration.  
- Create **Storybook documentation** for reusable UI components.  
- Develop a **contributor guide** with best practices and setup instructions for new team members.  

### **5. Performance Optimization**  
- Implement **caching strategies** (e.g., Redis) to reduce redundant API calls.  
- Optimize **frontend bundle sizes** by leveraging tree shaking and lazy loading.  
- Set up **real-time performance monitoring** (e.g., Prometheus, New Relic) to detect and fix bottlenecks.  

Collaboration isn’t just about working together—it’s about **creating a development environment where ideas flow freely, code remains clean, and innovation thrives**.  

---

## **If I Had More Time**  
The current implementation lays a strong foundation, but given more time, I would focus on **enhancements, scalability, and user experience improvements**.  

### **1. Technical Enhancements**  
- **Real-time updates:** Implement WebSockets or server-sent events (SSE) to reflect superhero changes instantly.  
- **Data persistence:** Integrate PostgreSQL for robust, scalable data storage.  
- **Dockerization:** Set up Docker containers to ensure a consistent development and production environment.  
- **Shared Types Library:**  
  - Centralize type definitions for frontend and backend.  
  - Implement automated type generation from backend schemas.  
  - Enforce strict type checking between API contracts.  
- **Monorepo Architecture:** Migrate to an Nx monorepo to streamline dependency management and code sharing.  

### **2. Feature Enhancements**  
- **Image Upload:** Enable superheroes to have profile pictures using a cloud storage provider (e.g., AWS S3, Cloudinary).  
- **Rating System:** Allow users to upvote/downvote superheroes based on their humility and heroism.  
- **Public Superhero Profiles:** Implement unique URLs for superheroes so users can share profiles.  

### **3. User Experience (UX) Improvements**  
- **Animations & Microinteractions:** Enhance UI responsiveness with subtle animations for smoother state transitions.  
- **Dark Mode:** Provide a light/dark theme toggle for improved accessibility.  

### **4. Infrastructure & DevOps**  
- **CI/CD Pipelines:** Automate testing, building, and deployments with GitHub Actions or GitLab CI/CD.  
- **Environment Management:** Set up **staging, testing, and production environments** for better release workflows.  
- **Monitoring & Logging:**  
  - Implement **centralized logging** with Loki or Elasticsearch.  
  - Set up **performance monitoring** tools to track API response times.  

### **5. Security Enhancements**  
- **Rate Limiting & Throttling:** Prevent API abuse with request rate limits.  
- **JWT Authentication & Role-Based Access Control (RBAC):** Secure sensitive routes.  
- **Security Headers & CORS Policies:** Strengthen API security against common vulnerabilities (e.g., CSRF, XSS).  

Given more time, these improvements would make the **Humble Heroes Repository** **more scalable, secure, and user-friendly**, while fostering a better developer experience. 🚀  


## License

MIT
