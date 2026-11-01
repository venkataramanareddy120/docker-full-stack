# Full-Stack Docker Assignment: Express + Flask

A small full-stack application with:
- **Frontend:** Node.js + Express, served on port `3000`
- **Backend:** Python + Flask, served internally on port `5000`
- **Orchestration:** Docker Compose and a shared bridge network

## Folder structure

```text
fullstack-docker-assignment/
├── frontend/
│   ├── public/index.html
│   ├── Dockerfile
│   ├── package.json
│   └── server.js
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   └── Dockerfile
├── docker-compose.yaml
├── .gitignore
└── README.md
```

## 1. Prerequisites

Install Docker Desktop (or Docker Engine + Compose plugin), Git, and create accounts on Docker Hub and GitHub.

## 2. Set your Docker Hub username

Open `docker-compose.yaml` and replace **both** occurrences of `YOUR_DOCKERHUB_USERNAME` with your actual Docker Hub username.

## 3. Build and start the application

Run these commands from the project root (the folder containing `docker-compose.yaml`):

```bash
docker compose build
docker compose up -d
docker compose ps
```

Open **http://localhost:3000** in your browser and submit the form.

The browser calls the Express endpoint `/api/submit`. Express forwards the JSON to `http://backend:5000/submit`. The name `backend` is the Compose service name and resolves through the shared Docker network.

## 4. Check logs and stop

```bash
docker compose logs -f
docker compose logs frontend
docker compose logs backend
docker compose down
```

## 5. Push images to Docker Hub

First, sign in:

```bash
docker login
```

Then build and push both tagged images:

```bash
docker compose build
docker compose push
```

Verify the two repositories and the `1.0` tags in your Docker Hub account:
- `YOUR_DOCKERHUB_USERNAME/express-frontend`
- `YOUR_DOCKERHUB_USERNAME/flask-backend`

If `docker compose push` reports an authorization or repository error, confirm that the username in the YAML is correct and that you are logged into the matching Docker Hub account.

## 6. Push source code to GitHub

Create an **empty** repository on GitHub (for example, `fullstack-docker-assignment`). Do not add a README there if you already have this one locally.

From the project root:

```bash
git init
git add .
git status
git commit -m "Add Express Flask Docker Compose application"
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/fullstack-docker-assignment.git
git push -u origin main
```

Replace `YOUR_GITHUB_USERNAME` with your GitHub username. GitHub may prompt you to authenticate through a browser or credential manager.

## 7. Optional: test backend from inside the frontend container

```bash
docker compose exec frontend node -e "fetch('http://backend:5000/health').then(r=>r.text()).then(console.log)"
```

Expected response:

```json
{"status":"backend healthy"}
```

## Important notes

- Only the frontend is published to the host at port `3000`. Flask port `5000` is internal to the Compose network.
- `depends_on` starts the backend container before the frontend, but it does not wait for the backend application to become ready. If the first submission happens immediately after startup, retry after a few seconds.
- This is an assignment/demo app. It validates required fields and prints submissions to backend logs; it does not store data in a database.
- Do not commit passwords, access tokens, private keys, `.env` files, or `node_modules`.
