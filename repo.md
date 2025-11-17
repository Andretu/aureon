# Aureon Fullstack Demo

## Description
A minimal Aureon fullstack demo consisting of an Express backend, Vite-powered frontend, and a CLI tool to start both services.

## Architecture
- **app-server**: Express backend with file-based routes and API endpoints
- **app-client**: Vite-powered frontend running on port 4200
- **cli**: Aureon script to start both frontend and backend simultaneously

## Technologies
- **Backend**: Node.js, Express
- **Frontend**: Vite
- **CLI**: Node.js script

## Installation
1. Install dependencies for each component:
   - `cd app-server && npm install`
   - `cd app-client && npm install`

## Usage
- **Start both services**: `node cli/aureon serve`
- **Start individually**:
  - Backend: `cd app-server && npm run dev`
  - Frontend: `cd app-client && npm run dev`

## Project Structure
```
aureon/
├── app-server/          # Backend application
│   ├── src/
│   │   ├── server.js    # Main server file
│   │   ├── api/         # API endpoints
│   │   └── routes/      # Route handlers
│   └── package.json
├── app-client/          # Frontend application
│   ├── src/
│   │   ├── main.ts      # Main entry point
│   │   └── styles.scss  # Styles
│   └── package.json
├── cli/                 # CLI tool
│   ├── aureon           # Script to start services
│   └── package.json
├── LICENSE              # Unlicense (Public Domain)
└── README.md            # Original README
```

## Dependencies
- **app-server**:
  - express: ^4.18.2
  - nodemon: ^3.0.1 (dev)
- **app-client**:
  - vite: ^5.0.0 (dev)

## License
This project is released into the public domain under the Unlicense.