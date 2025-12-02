# WeCall (Frontend)

<<<<<<< Updated upstream
This repository contains the WeCall frontend built with Vite + React. Below are the main technologies used and why they were chosen.

| Technology | Purpose | Why It’s the Best Choice |
|---|---|---|
| React.js | Frontend framework | Component-based, scalable, SaaS-ready; large ecosystem and developer productivity |
| Tailwind CSS | Styling | Fast, responsive, utility-first approach that speeds up UI development and enforces consistency |
| React Router | Navigation | Declarative routing, route composition, supports role-based routing & redirection |
| Context API / Zustand | State management | Lightweight global state (Zustand) and optional Context for small scopes — fast, minimal boilerplate |
| Chart.js / Recharts | Charts & dashboards | Interactive, customizable charts; Recharts integrates well with React components |
| JSON Mock Data | Backend simulation | Allows building and testing the UI before APIs are available; easy to swap for real endpoints |
=======
This repository contains the WeCall frontend built with Vite + React.

Features:

- React + Vite
- Tailwind CSS
- React Router
- Zustand for global state
- Recharts for charts and dashboards
- Mock JSON data for demo
>>>>>>> Stashed changes

## Quick start (Windows PowerShell)

```powershell
cd C:\Users\user\SMS_gateway_UI\sms_ui
npm install
npm run dev
```

Open `http://localhost:5174/` in your browser (Vite may choose a different port if 5173 is in use).

## Project layout

- `src/` — React source files
- `src/components/` — UI components (Navbar, Sidebar, Footer)
- `src/pages/` — App pages (Dashboard, Calls, Users, Analytics, Settings)
- `src/store.js` — Zustand store
- `src/mockData.js` — Mock data for demo purposes

## Connect to backend

- Add a `.env` with `VITE_API_URL=https://your-backend.example`
- Replace mock data usage with `axios` calls to your API

<<<<<<< Updated upstream
## Next steps

- Set up a dev proxy in `vite.config.js` to forward `/api` to your backend during development
- Add auth (login) and protect routes by role
- Replace mock data with real API calls and update the Zustand store
=======
## Git

This folder will be initialized as a git repository and the initial scaffold committed.
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
>>>>>>> Stashed changes
