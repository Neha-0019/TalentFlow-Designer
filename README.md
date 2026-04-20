# TalentFlow Designer

A React + TypeScript workflow builder for creating HR process flows using a visual canvas.

## Project Overview

TalentFlow Designer is a front-end workflow orchestration tool where users can design HR business processes visually instead of writing logic manually. Users drag node types (Start, Task, Approval, Automated, End) onto a canvas, connect them to define execution flow, and configure each node from a dynamic form panel.

The project demonstrates core product-engineering skills: component-driven UI design, state management with Zustand, graph-based validation logic, modular architecture (canvas, nodes, forms, sandbox, API), and realistic API integration using MSW mocks. It also includes simulation and JSON export features, showing how workflows can be validated and shared.

In short, this project showcases how to build a scalable, extensible workflow editor with clean separation of concerns and production-style frontend practices.

## Core Functionality

- Visual workflow building with drag-and-drop nodes
- Node-to-node connections to define process execution flow
- Dynamic node configuration panel for editing selected node data
- Workflow validation checks before simulation
- Simulation log output for understanding execution path
- JSON export for workflow portability and sharing

## Tech Stack

- **Frontend Framework:** React 18, TypeScript, Vite
- **Workflow Canvas:** `@xyflow/react` (React Flow)
- **State Management:** Zustand
- **Validation:** Zod + custom graph validation utilities
- **Mock Backend:** MSW (Mock Service Worker)
- **Testing:** Vitest, React Testing Library, JSDOM
- **Styling:** Tailwind CSS, PostCSS, Autoprefixer
- **Code Quality:** ESLint

## Architecture

The application follows a modular, layer-based frontend architecture with clear separation of concerns:

- **Canvas Layer (`src/components/canvas`)**  
  Handles drag-drop, node placement, edge creation, zoom/controls, and canvas interactions.

- **Node Layer (`src/components/nodes`)**  
  Contains reusable custom node components for each workflow node type.

- **Form Layer (`src/components/forms`)**  
  Renders configuration forms based on selected node type and updates node data in real time.

- **State Layer (`src/store`)**  
  Centralized workflow state (nodes, edges, selection, updates) using Zustand.

- **Domain + Utility Layer (`src/types`, `src/utils`)**  
  Defines workflow data contracts and pure utilities for validation/serialization.

- **API + Mock Layer (`src/api`, `src/mocks`)**  
  Encapsulates API calls and development-time mocked endpoints (`/automations`, `/simulate`).

## Project Structure

```text
src/
  api/                # API client, mock data, handlers, shared types
  components/
    canvas/           # Canvas, toolbar, node palette
    nodes/            # Custom node UI components
    forms/            # Node configuration forms
    sandbox/          # Simulation + execution log panel
  hooks/              # Workflow, form, and simulation hooks
  mocks/              # MSW browser setup
  store/              # Zustand workflow store
  types/              # Workflow domain types
  utils/              # Graph validation and serialization helpers
```

## Getting Started

### Prerequisites

- Node.js 18+ (or latest LTS)
- npm 9+

### Install

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

The app will open on a Vite local URL (usually `http://localhost:5173`).
If that port is busy, Vite automatically chooses another port (for example `5174`).

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Type-check and create production build
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run test` - Run tests once (Vitest)
- `npm run test:watch` - Run tests in watch mode

## API Mocking (MSW)

MSW is started automatically in development from `src/main.tsx`.
The service worker file already exists in `public/mockServiceWorker.js`, so no extra setup command is needed.

Mocked endpoints are implemented in `src/api/handlers.ts`, including:

- `GET /automations`
- `POST /simulate`

## Notes

- This app currently uses in-memory state (no backend persistence)
- Workflow simulation and validation run in the client
  <img width="1919" height="864" alt="Screenshot 2026-04-21 000801" src="https://github.com/user-attachments/assets/28dc9e78-0608-4586-9d73-fa5aa01c1914" />

