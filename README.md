# Lopply

This project is a web platform for discovering and tracking running races in Sweden and around the world. Users can filter events, save favorites to a personal bucket list, get matched with races based on their running preferences and add new races. Admin can approve submitted races, manage access and delete events. The goal is to create an interactive, user-friendly tool that connects runners with upcoming events and makes race discovery easier.

[Link to live version](https://lopply.vercel.app/)

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Screenshots](#screenshots)
  - [Deployed](#deployed)
  - [Wireaframes](#wireframes)
- [Documentation](#documentation)
  - [Project Structure](#project-structure)
  - [Database](#database)
  - [Authentication](#authentication)
  - [Testing](#testing)
  - [Lighthouse Report](#lighthouse-report)
- [Authors](#authors)

## Features

- 🏃 **Browse & Filter Races** - Explore running races worldwide with advanced filtering by distance, terrain, location and date
- ❤️ **Bucket List** - Save your favorite races to a personalized bucket list for easy access
- 🎯 **Race Matching** - Get personalized race recommendations based on your running preferences and goals
- ➕ **Submit Races** - Submit new races for admin approval
- 🔐 **User Authentication** - Secure sign-up and login with NextAuth integration
- 👨‍💼 **Admin Dashboard** - Manage races, approve submissions, handle user access and remove events
- 📱 **Responsive Design** - Responsive interface powered by TailwindCSS
- ⚡ **Performance Optimized** - Built with Next.js 16 for fast page loads and optimal user experience
- 🧪 **Well-tested** - Comprehensive test coverage with Vitest

## Tech Stack

- ![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
- ![React](https://img.shields.io/badge/React-%2361DAFB.svg?style=for-the-badge&logo=react&logoColor=black)
- ![TypeScript](https://img.shields.io/badge/TypeScript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
- ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
- ![ESLint](https://img.shields.io/badge/ESLint-%234B32C3.svg?style=for-the-badge&logo=eslint&logoColor=white)
- ![Prettier](https://img.shields.io/badge/Prettier-%23F7B93E.svg?style=for-the-badge&logo=prettier&logoColor=white)
- ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

## Installation

Install Lopply locally with npm

```bash
# Clone this repository
$ git clone https://github.com/ellinorjohansson/Lopply

# Go into the repository
$ cd Lopply

# Install dependencies
$ npm install

# Run the development server
$ npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Other Scripts

```bash

# Run tests
$ npm test

# Run tests with UI
$ npm run test:ui

# Generate test coverage report
$ npm run test:coverage

```

## Screenshots

### Deployed

![Screenshot](/public/images/screenshots/liveVersion//lopply-screenshot2.avif)

![Screenshot](/public/images/screenshots/liveVersion//lopply-screenshot1.avif)

### Wireframes

[Link to Figma](https://www.figma.com/design/tz8TvD7opvZ2Fh5mfqlrpv/Examensarbete-2025-2026-Front-End?node-id=1-19&t=GlWHkLM8ob72SZ63-1)

### Mobile

![Screenshot](/public/images/screenshots/wireframes/wireframe-mobile.avif)

### Tablet

![Screenshot](/public/images/screenshots/wireframes/wireframe-tablet.avif)

### Desktop

![Screenshot](/public/images/screenshots/wireframes/wireframe-desktop.avif)

## Documentation

### Project Structure

```
src/
├── app/              # Next.js app directory with routes
├── api/              # API endpoints for backend operations
├── common/           # Shared components, hooks and utilities
├── i18n/             # Internationalization setup (for future development)
├── lib/              # Database and utility functions
├── models/           # MongoDB models (User, Race, Bucketlist)
├── services/         # Business logic for races and bucket lists
└── types/            # TypeScript type definitions
```

### Database

Lopply uses MongoDB with Mongoose for data persistence. The application includes models for:

- **User** - User accounts with authentication
- **Race** - Running event information with submission status
- **Bucketlist** - Personal race collections for each user

### Authentication

Built with NextAuth for secure user authentication and authorization. The system supports:

- User registration and login
- Admin role management
- Protected routes and API endpoints

### Testing

The project includes comprehensive test coverage using:

- **Vitest** - Fast unit and integration tests

Run tests with: `npm test` or `npm run test:coverage`

### Lighthouse Report

![Lighthouse Report](/public/images/screenshots/lighthouse/lighthouse-report.avif)

The application is optimized for performance, accessibility and user experience with high Lighthouse scores across all metrics.

## Authors

- [@ellinorjohansson](https://www.github.com/ellinorjohansson)
