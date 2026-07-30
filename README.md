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

## Configuration

- If the frontend uses environment variables for the API base URL, create a `.env` file or set `REACT_APP_API_URL` accordingly. Example:

  REACT_APP_API_URL=http://localhost:3001

- Ensure CORS is enabled on the backend if frontend and backend run on different ports.

## Testing

Part 3 of Full Stack Open introduces component testing and testing of services that communicate with servers. If tests are included in this repository, run:

   npm test

Add or adapt tests to verify:

- Component rendering
- Mocking axios requests (for services that fetch notes)
- User interactions (creating and toggling notes)

## CI / CD notes

This repository name includes "cicd" — examples of CI/CD you may want to add:

- GitHub Actions to run `npm test` and `npm build` on push and pull requests
- Linting and formatting checks (ESLint / Prettier)
- Deployment step to host a static build (Netlify, Vercel) or deploy both frontend and backend (Heroku, Render, or using Docker)

A basic GitHub Actions workflow could run on push to `main` and run: `npm ci`, `npm test`, `npm run build`.

## Resources

- Full Stack Open — Part 3: Communicating with the server: https://fullstackopen.com/en/part3
- axios: https://github.com/axios/axios

## Contributing

If you want to extend this project:

- Add a backend server implementation in `backend/` (Node/Express) following Part 3 examples
- Add tests for components and services
- Add CI workflow files under `.github/workflows/`

## License

This repository follows the license (if any) specified by the owner. If none is present, add a LICENSE file to clarify reuse rights.
