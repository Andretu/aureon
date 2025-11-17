Aureon Fullstack (demo)
=======================
This archive contains a minimal Aureon fullstack demo with:
  - app-server: Express backend with simple file-based routes + API
  - app-client: Vite-powered frontend (port 4200)
  - cli: aureon script to start both frontend and backend (aureon serve)

Quick start:
  1) Install per-app: 
     cd app-server && npm install
     cd ../app-client && npm install
  2) Start both from project root using the CLI:
     node cli/aureon serve
  Or start individually:
     cd app-server && npm run dev
     cd app-client && npm run dev
