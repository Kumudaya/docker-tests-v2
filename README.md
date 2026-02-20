# Static frontend (NGINX)

Small static web frontend served by NGINX. It asks for your name and displays: `Hello <name>`.

## Run with Docker Compose

From this folder:

1. Start:
	 - `docker compose up --build`
2. Open:
	 - http://localhost:8080

## Run with Docker

- Build:
	- `docker build -t hello-frontend -f frontend/frontend.Dockerfile frontend`
- Run:
	- `docker run --rm -p 8080:80 hello-frontend`

Then open http://localhost:8080
