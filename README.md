# TaskNest

TaskNest is a modern, real-time task management and team collaboration platform built for high-performance product teams. It features a clean, responsive, and minimalist user interface inspired by premium SaaS tools.

---

## 🚀 Key Features

### 📋 Task Management
- **Dashboard Overview**: Productivity trackers, task status breakdown rings, and workspace activity statistics.
- **My Tasks View**: Dynamic horizontal tab strip sorting tasks by status (`Todo`, `Backlog`, `In Progress`, `In Review`, `Completed`) with live, automatic count badges.
- **Interactive Rows**: Custom table cards featuring hover highlights and inline quick-actions (Status, Priority, Assignee changes) without leaving the list view.
- **Task Details Modal**: Expansive detail views featuring card-based text containers, commenting streams, user initial avatars, and attribute badges.
- **Task Creation**: Clean, borderless input fields with embedded image attachment controls.

### 💬 Real-Time Messaging
- **Chat Inbox**: Sidebar loaded with workspace contacts, individual avatar cards, and active user indicators.
- **WebSocket Synchronization**: Live message delivery backed by a WebSocket server.
- **Connection Badge**: Live indicator dot showing your connection status (`Live` pulsing green or `Offline` red badge).
- **Auto-Scrolling Chat Frame**: Snaps the chat window frame to the bottom automatically when sending, receiving, or switching chat threads.

### 🏢 Workspace Onboarding
- **Dedicated Setup Landing Page**: Standalone onboarding flow at `/workspaces` for creating a workspace, subdomain sluggifying, and managing team workspace redirects.

---

## 🛠️ Tech Stack

### Frontend (`/`)
- **Framework**: Next.js 15 (App Router, Turbopack)
- **UI & Components**: React 19, Mantine Core (v8), Heroicons
- **Styling**: TailwindCSS 4, Vanilla CSS
- **Authentication**: Firebase Auth

### Backend (`/tasknest-backend`)
- **Server**: Node.js, Express, TypeScript, `ts-node-dev`
- **Real-Time Protocol**: WebSockets (WS)

---

## 📂 Project Structure

```
task-manager/
├── src/                          # Next.js App Source
│   ├── app/                      # Routes and Pages
│   │   ├── dashboard/            # Core Dashboard (Overview, Tasks, Inbox)
│   │   ├── workspaces/           # Workspace Setup Landing Page
│   │   └── (auth)/               # User Login & Registration Pages
│   ├── components/               # Shareable UI Modals and Dropdowns
│   ├── context/                  # Workspace, Auth, and Task React Contexts
│   └── lib/                      # Styling Utilities
├── public/                       # Static Assets
└── tasknest-backend/             # Express & WebSocket Node.js Server
```

---

## ⚙️ Getting Started

To run the application locally, you will need to start both the backend server and the frontend client.

### 1. Run the Backend Server

Navigate to the backend directory, install the dependencies, and start the development server:

```bash
cd tasknest-backend
npm install
npm run dev
```

The WebSocket server starts on `ws://localhost:8000` and the REST API server runs on `http://localhost:8000`.

### 2. Run the Frontend Client

In the root directory, install the node modules and launch the Next.js dev server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 🔨 Build & Linting

### Compile Frontend Production Bundle
```bash
npm run build
```

### Run Formatting
```bash
npm run format
```
