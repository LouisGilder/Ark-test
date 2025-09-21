Ark Take Home Assessment — Package Dashboard


What I built
A small React + TypeScript application that satisfies the user stories:


- Shows a list of residents with a package summary (total & status counts)
- Clicking a resident shows the resident's package list and details
- Shows total number of unassigned packages at top
- Graceful handling of API failures and Error Boundary
- Simple, usable styling 


Tech stack
- React (with Vite)
- TypeScript
- Plain `fetch` with custom retry/backoff logic
- CSS for styling 


What I would do with more time
- Add visual tests and unit tests (Jest + React Testing Library)
- Add accessibility checks and fix any issues (a11y)
- Use React Query (TanStack Query) for better caching/retries and background refetching
- Add pagination and search for residents and packages
- Add E2E tests (Cypress)
- Add user interactions to assign/unassign packages (mutations)


Running locally
1. Ensure Node is installed.
2. Create a folder and copy the project files into it.
3. Install dependencies and run dev server:

npm install
npm run dev

4. Open `http://localhost:5173` (Vite's default) in your browser.