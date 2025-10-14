# CipherStack

**CipherStack** is a LeetCode-style competitive coding platform designed for learners, educators, and developers to improve problem-solving skills collaboratively. It supports Group Coding Challenges, 1v1 Battles, Pair Coding Sessions, and Interview Challenges — all with real-time collaboration (voice, video, screen sharing) and in-browser code execution powered by Judge0.

---

## 🚀 Quick Overview

* **Platform type:** Competitive coding / interview practice
* **Backend:** Node.js + TypeScript (Clean Architecture + SOLID)
* **Frontend:** Next.js (React) — in-browser editor and realtime UI
* **Execution engine:** Judge0 (containerized/hosted)
* **Auth:** JWT (user & admin tokens), Google OAuth, OTP email verification
* **Deployment:** Docker + NGINX, hosted on AWS EC2 (HTTPS via SSL)
* **Persistence:** Polyglot persistence — different DBs chosen per use case

---

## 🧩 Core Features

* Solve algorithmic problems directly in browser with multi-language support
* Real-time collaboration modes:

  * **Group Coding Challenges** (hosted sessions with timer + leaderboard)
  * **1v1 Battles** (head-to-head matches with scoring)
  * **Pair Coding Mode** (shared editor for mentorship)
  * **Interview Challenges** (simulated interviews with voice/video/screen share)
* Integrated Judge0 for code execution and sandboxing
* User profiles, stats, challenge history
* Admin panel for problem and challenge management
* Clean Architecture, modular codebase, and SOLID principles

---

## 🛠️ Tech Stack

**Backend**

* Node.js + TypeScript
* Express (or chosen HTTP framework)
* MongoDB / PostgreSQL / Redis (depending on the service)
* Mongoose / TypeORM (depending on chosen DB)
* JWT for auth, OAuth for Google
* Dockerized services

**Frontend**

* Next.js + React + TypeScript
* Editor integration (Monaco / CodeMirror)
* WebRTC / Socket.io for real-time communication (voice/video/screen share)

**Execution**

* Judge0 (self-hosted or managed instance)

**Infra / Deployment**

* Docker & docker-compose
* NGINX reverse proxy
* SSL (Let's Encrypt or commercial certs)
* Hosted on AWS EC2 (or any preferred cloud)

---


## ⚙️ Environment Variables (example)

> Create a `.env` file in `Backend/` with values appropriate for your environment.

```
PORT=4000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/cipherstack
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=7d
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
EMAIL_SMTP_HOST=smtp.example.com
EMAIL_SMTP_PORT=587
EMAIL_SMTP_USER=your@email
EMAIL_SMTP_PASS=your_smtp_password
JUDGE0_BASE_URL=http://judge0:3000
JUDGE0_API_KEY=optional_api_key
FRONTEND_URL=http://localhost:3000
REDIS_URL=redis://localhost:6379
```

Adjust values depending on which services you choose (Mongo/Postgres, Redis, etc.).

---

## 🚀 Local Development (Backend)

**Prerequisites**: Node.js, Docker, docker-compose, DB (MongoDB/Postgres), Redis 

1. Clone the repo

```bash
git clone <repo-url>

```

2. Install dependencies

```bash
 npm install 
```

3. Create `.env` and fill in values (see example above)

4. Start local dependencies (Mongo, Redis, Judge0) via `docker-compose`

```bash
docker-compose up -d
```




**Build and run**

```bash
docker-compose  build
docker-compose  up -d
```



---


## 📬 Contact

Maintainers: `CipherStack Team`



## Acknowledgements

Built with ❤️

