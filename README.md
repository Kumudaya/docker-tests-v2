# Full-Stack Hello Application

Web application with NGINX frontend and Python Flask backend. Enter your name and get a personalized greeting with an eye-catching popup notification! 🎉

## Architecture

- **Frontend**: Static website served by NGINX
- **Backend**: Python FastAPI REST API
- **Features**: 
  - Name input with greeting display
  - Animated popup notifications
  - Local storage persistence
  - Responsive design

## Run with Docker Compose

From this folder:

1. Start both services:
   ```bash
   docker compose up --build
   ```

2. Open in browser:
   - Frontend: http://localhost:8080
   - Backend API: http://localhost:5000/health

3. Stop:
   ```bash
   docker compose down
   ```

## Run Services Individually

### Frontend (NGINX)
```bash
docker build -t hello-frontend -f frontend/frontend.Dockerfile frontend
docker run --rm -p 8080:80 hello-frontend
```

### Backend (Python FastAPI)
```bash
docker build -t hello-backend -f backend/backend.Dockerfile backend
docker run --rm -p 5000:5000 hello-backend
```

## API Endpoints

- `POST /api/greet` - Get personalized greeting
  - Body: `{"name": "Your Name"}`
  - Response: `{"success": true, "message": "Hello Your Name! 👋"}`
- `GET /health` - Health check endpoint
