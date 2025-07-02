# FlexWeb

FlexWeb is a web application built with [Astro](https://astro.build/) and [React](https://react.dev/) for managing property listings and reviews. It leverages both [Tailwind CSS](https://tailwindcss.com/) and [Material UI (MUI)](https://mui.com/) for flexible, modern, and highly customizable UI development.

**Backend API:** [FlexAPI](https://github.com/juanfranciscocis/FlexAPI)

## Table of Contents
- [Google Reviews](#google-reviews)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Libraries Used](#libraries-used)
- [Pages](#pages)
- [Why Tailwind with MUI?](#why-tailwind-with-mui)
- [How Are Requests Made?](#how-are-requests-made)

## Google Reviews

### Why Google Reviews Was Not Integrated

During the planning and development of this project, the possibility of integrating Google Reviews was evaluated as a way to enhance credibility and provide external validation. However, after careful consideration, it became clear that this approach was not feasible or aligned with the core objectives of the platform.

#### No Google Business Profile Available

At the time of development, the company did not have an official Google Business Profile with publicly accessible data. Without this profile, it is not possible to retrieve reviews via the Google Places API or any public review endpoint. This technical limitation alone made integration impractical.

#### Misalignment with Project Goals

Even if a Google Business Profile were available, the integration of Google Reviews would not be the most appropriate solution for the platform’s needs. This application is designed to collect and manage reviews at the property level, not for the company as a whole.

Google Reviews typically reflect feedback about the overall business entity, which may not provide the granularity required for a property management platform where each listing has its own features, quality, and guest experiences.

#### Custom Review System: The Better Fit

Instead of relying on third-party sources like Google, a custom review system was developed to meet the following goals:
	•	Allow guests to leave reviews tied specifically to individual property listings.
	•	Enable admins to manage, moderate, and respond to reviews within a centralized dashboard.
	•	Maintain control over the data structure and review categories (cleanliness, location, value, etc.).
	•	Provide flexibility for future features like filtering, sorting, and analytics.

This tailored solution ensures the platform remains scalable, maintainable, and fully aligned with business requirements.




## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd FlexWeb
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Project
To start the development server:
```bash
npm run dev
```
The app will be available at `http://localhost:4321` by default.

To build for production:
```bash
npm run build
```

To preview the production build:
```bash
npm run preview
```

## Available Scripts
- `npm run dev` — Start the development server
- `npm run build` — Build the app for production
- `npm run preview` — Preview the production build

## Project Structure
- `src/` — Source code
  - `components/` — Reusable React and Astro components
  - `layouts/` — Layout components
  - `pages/` — Astro pages (routes)
  - `assets/` — Static assets (images, SVGs)
  - `styles/` — Global and component styles
- `public/` — Public static files
- `astro.config.mjs` — Astro configuration
- `tsconfig.json` — TypeScript configuration

## Libraries Used
- [Astro](https://astro.build/) — Static site generator
- [React](https://react.dev/) — UI library for components
- [TypeScript](https://www.typescriptlang.org/) — Typed JavaScript
- [Tailwind CSS](https://tailwindcss.com/) ��� Utility-first CSS framework
- [Material UI (MUI)](https://mui.com/) — React UI component library
- [Axios](https://axios-http.com/) — Promise-based HTTP client for API requests

## Pages
- `/` — Home page
- `/Descriptions/[id]` — Listing descriptions page (dynamic route)
- `/ReviewsAdmin` — Reviews admin dashboard

## Why Tailwind with MUI?
Using both Tailwind CSS and MUI combines the best of both worlds:
- **Tailwind CSS** provides utility-first, low-level styling for rapid prototyping and custom design.
- **MUI** offers a robust set of pre-built, accessible, and themeable React components.

This hybrid approach allows for:
- Fast, consistent custom styling with Tailwind utilities.
- Leveraging MUI's advanced components (like dialogs, data grids, etc.) for complex UI needs.
- Easy overrides and customizations, making the UI both unique and highly functional.

## How Are Requests Made?
All HTTP requests to backend APIs are made using [Axios](https://axios-http.com/). Axios is a promise-based HTTP client that makes it easy to send asynchronous requests and handle responses. It is used throughout the project in service files (e.g., `listings.service.ts`, `reviews.service.ts`) to fetch and update data from the server.

Typical usage example:
```ts
import axios from 'axios';

axios.get('/api/listings')
  .then(response => {
    // handle data
  })
  .catch(error => {
    // handle error
  });
```

Axios is chosen for its simplicity, wide adoption, and built-in support for interceptors, request/response transformation, and error handling.
