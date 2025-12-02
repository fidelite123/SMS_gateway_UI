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

## WeCall (Frontend)

WeCall is a demo frontend built with Vite + React. The project contains core UI for admin/reseller/client flows that you can run locally and test.

Key technologies:

- React + Vite
- Tailwind CSS
- React Router for routing
- Zustand + Context for state management
- Recharts for charts/dashboards
- Mock JSON for initial demo data

## Quick start (Windows PowerShell)

```powershell
cd .\sms_ui
npm install
npm run dev
```

Open http://localhost:5173/ in your browser.

## Project layout

- `src/` — React source files
- `src/components/` — UI components (Navbar, Sidebar, Footer)
- `src/pages/` — App pages
- `src/store.js` — Zustand store
- `src/mockData.js` — Mock demo data

## Connect to backend

- Add a `.env` with `VITE_API_URL=https://your-backend.example`
- Replace mock data usage with `axios` calls to your API

## Next steps

- Create a dev proxy in `vite.config.js` to forward `/api` during development
- Add authentication and role-protected routes
- Replace mock data with real API calls and add tests

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
>>>>>>> Stashed changes
