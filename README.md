# Kibuz Main Dashboard

Frontend dashboard built with React, TypeScript, and Vite.

## Prerequisites

- Node.js 18+ (LTS recommended)
- Yarn (recommended) or npm

## Environment Variables

This project reads Vite environment variables at build/runtime. Create a `.env.local` file at the repo root:

```dotenv
VITE_URL_API_DEV=https://your-dev-api.example.com
VITE_URL_API_PROD=https://your-prod-api.example.com
```

Notes:

- `VITE_URL_API_DEV` is required for local development.
- `VITE_URL_API_PROD` is optional; if omitted, the app falls back to `VITE_URL_API_DEV`.

## Step-by-step: Setup and Run

1. Install dependencies:

```bash
yarn install
```

2. Configure environment variables:

Create a `.env.local` file and add the variables shown above.

3. Start the dev server:

```bash
yarn dev
```

The app will be available at `http://localhost:5173` by default.

## Build and Preview

Build for production:

```bash
yarn build
```

Preview the production build locally:

```bash
yarn preview
```
