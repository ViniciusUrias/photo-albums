# Album and Photos Manager

This project is a web application for managing albums and photos, built with **React**, **TypeScript**, and **Vite**. The application includes user authentication, navigation, and album/photo management functionality.

## Features

- **Login Page**: User authentication.
- **Home Page**: Displays a list of users. Clicking on a user card button redirects to their album list.
- **Profile Page**: Manage albums, photos and account data for the currently logged-in user.
- **Album List Page**: View albums and navigate to individual photo lists for each album.

## Stack

- **@tanstack/react-query**: Data fetching.
- **tailwind**: Utility-first CSS framework.
- **shadcn-ui**: UI Components.
- **vitest**: Testing framework for Vite projects.
- **@testing-library/react**: Testing components and interactions.
- **react-hook-form**: Handler for forms.
- **react-router**: Routing library for React applications.
- **zustand**: Lightweight state management library for React.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 18 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) or [pnpm](https://pnpm.io/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ViniciusUrias/photo-albums.git
   cd album-photos-manager
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. Open the application in your browser at `http://localhost:5173/`.

### Testing

- Run tests with:

  ```bash
  npm run test
  # or
  yarn test
  # or
  pnpm test
  ```
