<img src="client/public/icons/og-banner.png" width="300" height="120" alt="RAG AI App"/>

# RAG AI Web Application

---

![Build Status](https://img.shields.io/badge/build-passing-brightgreen?style=flat-square)
![Version](https://img.shields.io/badge/version-1.0.0-blue?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-purple?style=flat-square)
![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg?style=flat-square)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)

![React](https://img.shields.io/badge/react-%2320232a.svg?style=flat-square&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=flat-square&logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=flat-square&logo=typescript&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=flat-square&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=flat-square&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=flat-square&logo=mongodb&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-black?style=flat-square&logo=socket.io)
![Google Gemini](https://img.shields.io/badge/Google%20Gemini-8E75B2?style=flat-square&logo=google-gemini&logoColor=white)

---

## Live Demo

**<a href="https://your-rag-app-demo.onrender.com" target="_blank">https://your-rag-app-demo.onrender.com</a>**

---

## Demo & Screenshots

<img src="./docs/s1.png" width="400" alt="Dashboard Demo"> <img src="./docs/s2.png" width="400" alt="Document Upload Demo">
<img src="./docs/s3.png" width="400" alt="RAG Architecture Demo"> <img src="./docs/s3.png" width="400" alt="Real-time Chat Demo">

## Video Demo On Facebook

**<a href="https://web.facebook.com/share/v/14pDbssh6i6/" target="_blank">https://web.facebook.com/share/v/14pDbssh6i6/</a>**

---

## Project Overview

The **RAG AI App** is a full-stack Retrieval-Augmented Generation (RAG) platform powered by **Google Gemini** and real-time **Socket.io** streaming. Built with **React**, **Vite**, **TypeScript**, **Express**, **Node.js**, and **MongoDB**, it enables users to upload document context, process high-accuracy contextual retrieval, and converse with an AI assistant over dynamic, real-time channels across fully responsive device screens.

---

## Table of Contents

- [Architecture & Data Flow](#architecture--data-flow)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Environment Variables](#environment-variables)
  - [Installation & Setup](#installation--setup)
- [Frontend Setup (React + Vite)](#frontend-setup-react--vite)
- [API & Socket Events](#api--socket-events)
- [License](#license)

---

## Architecture & Data Flow

```plaintext
[ React + Vite Frontend (TypeScript) ]
       │
       ├──> (HTTP / Multipart Document Upload)
       │
       ├──> (Real-Time Bidirectional WebSockets via Socket.io)
       │
       ▼
[ Express.js + Node.js Backend ] ◄── Context Retrieval & Prompt Pipeline
       │
       ├──> Vector & Document Persistence ──> [ MongoDB ]
       │
       └──> Embedding & Generation API ────> [ Google Gemini API ]
```

---

## Key Features

- **Document Processing & Knowledge Ingestion: Upload custom documents to build personal or workspace contextual databases.**

- **Retrieval-Augmented Generation (RAG): Context-aware intelligent query responses powered by Google Gemini AI.**

- **Real-Time Communication: Instant stream responses and bidirectional socket events using Socket.io.**

- **Fully Responsive UI: Modern, clean client application optimized for mobile, tablet, and desktop views.**

- **Type-Safe Full-Stack: End-to-end type safety leveraging TypeScript across client and server environments.**

---

## Getting Started

### Prerequisites

- **Node.js 18.x or higher & npm / pnpm / yarn**

- **MongoDB Instance (Local or MongoDB Atlas)**

- **Google Gemini API Key**

---

## Environment Variables

**Create a .env file in your backend directory:**

```bash
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/rag-chat
ANTHROPIC_API_KEY=XXXXXXXXXXXXXXXXXX
GEMINI_API_KEY=XXXXXXXXXXXXXXXXXXXXX
PORT=3000
CORS_ORIGIN=http://localhost:5000
```

---

## Installation & Setup

```bash
# Clone the repository
git clone [https://github.com/ghsjulian/rag-ai.git](https://github.com/ghsjulian/rag-ai.git)
cd rag-ai/server

# Install server dependencies
npm install

# Start backend development server
npm run dev
```

## Frontend Setup (React + Vite)

```bash
cd ../client

# Install dependencies
npm install

# Start Vite development server
npm run dev
```

---

## License

**Distributed under the MIT License. See LICENSE for details.**

### Thank You So Much

### Radhe Radhe
