# Park.me Frontend

<p align="center">
  <img src="./src/assets/images/cover.png" alt="Park.me Logo" width="400" />
</p>

## Live Demo

[Click here to try Park.me live!](https://park.me.gbolf.com)

## Overview

Park.me is a user-friendly web application designed to help drivers find, reserve, and pay for parking spots in real-time. Whether you're commuting to work or heading to an event, Park.me simplifies your parking experience, reduces time spent searching for a spot, and provides seamless payment options.

## Technology Stack

- **Framework:** React
- **Language:** TypeScript
- **Bundler:** Vite

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/gbolf/park.me-frontend.git
   cd park.me-frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

### Running Locally

Start the development server:

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:3000` (or the port Vite indicates).

### Building for Production

To create an optimized production build:

```bash
npm run build
```

The build output will be in the `dist` folder.

## Folder Structure

```
park.me-frontend/
├── public/           # Static public files
├── src/
│   ├── assets/       # Images, logos, and other static assets
│   ├── common/       # Shared utilities, constants, patterns
│   ├── components/   # Reusable UI components
│   ├── contexts/     # React context providers
│   ├── hooks/        # Custom React hooks
│   ├── layouts/      # Layout components
│   ├── views/        # Page-level components organized by feature/route
│   ├── main.tsx      # Application entry point
│   ├── theme.tsx     # MUI theme configuration and custom styles
│   └── types/        # TypeScript type definitions
├── .gitignore        # Git ignore file
├── index.html        # Main HTML file
├── package.json      # Project dependencies and scripts
├── README.md         # This file
├── tsconfig.json     # TypeScript configuration
└── vite.config.ts    # Vite build tool configuration
```

## Contact

For questions or feedback, please open an issue on GitHub or [contact the maintainer](mailto:dev.astonish166@passfwd.com)