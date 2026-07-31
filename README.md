# Notes App (Full Stack Open — Part 3)

This repository contains a simple "Notes" application used in the Full Stack Open course (Part 3: Communicating with the server). It is a small example project demonstrating a React frontend that communicates with a backend server to create, read, update, and delete notes.

## Features

- List notes fetched from a backend API
- Create new notes
- Toggle importance of notes
- Remove notes
- Basic form handling and usage of axios for HTTP requests
- Example of splitting frontend and backend concerns

## Tech stack

- Frontend: React (JavaScript)
- HTTP client: axios
- Backend: (expected) Node/Express server (not included here unless in repo)

## Getting started

1. Clone the repository

   git clone https://github.com/uepzues/fullstackopen-cicd-notes-app.git
   cd fullstackopen-cicd-notes-app

2. Install dependencies

   npm install

3. Start the development server

   npm start

By default this starts the frontend app. The app expects a backend API that serves notes at an endpoint such as `/api/notes`. If a backend is not included in this repository, you can run a separate backend following Full Stack Open Part 3 instructions or adapt the frontend to use a mocked backend.

- Full Stack Open — Part 3: Communicating with the server: https://fullstackopen.com/en/part3



