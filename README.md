# 🎬 CineFind — Modern Movie Discovery App

[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=FastAPI&logoColor=white)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-B738CF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

**CineFind** is a sleek, modern Movie Discovery platform designed to demonstrate the cutting-edge single-origin paradigm. Leveraging **FastAPI's native `app.frontend()` feature**, this architecture eliminates complex reverse proxy setups (like Nginx) in staging environments by allowing Python to natively serve compiled Single Page Applications (SPAs) with absolute zero-config client-side routing fallbacks.

---

## 🗺️ System Architecture

CineFind utilizes a unified Monorepo topology. While components remain entirely decoupled during development, they merge seamlessly into a single high-performance engine for production deployments.

```text
Movie App/
├── README.md
├── backend/
│   ├── app/
│   │   ├── routes/
│   │   ├── main.py
│   │   └── database.py
│   ├── requirements.txt
│   └── .env.example
│
└── frontend/
    ├── src/
    │   ├── routes/
    │   ├── components/
    │   ├── router.tsx
    │   └── start.tsx
    ├── vite.config.js        # Build configuration mapping to /dist
    └── package.json

    