# WeCall (Frontend)

This repository contains the WeCall frontend built with Vite + React. Below are the main technologies used and why they were chosen.

| Technology | Purpose | Why It’s the Best Choice |
|---|---|---|
| React.js | Frontend framework | Component-based, scalable, SaaS-ready; large ecosystem and developer productivity |
| Tailwind CSS | Styling | Fast, responsive, utility-first approach that speeds up UI development and enforces consistency |
| React Router | Navigation | Declarative routing, route composition, supports role-based routing & redirection |
| Context API / Zustand | State management | Lightweight global state (Zustand) and optional Context for small scopes — fast, minimal boilerplate |
| Chart.js / Recharts | Charts & dashboards | Interactive, customizable charts; Recharts integrates well with React components |
| JSON Mock Data | Backend simulation | Allows building and testing the UI before APIs are available; easy to swap for real endpoints |

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

## Next steps

- Set up a dev proxy in `vite.config.js` to forward `/api` to your backend during development
- Add auth (login) and protect routes by role
- Replace mock data with real API calls and update the Zustand store
