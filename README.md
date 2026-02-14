# KyaPakaon - Pakistani & Indian Recipe Finder

Can't think of what to cook? Use KyaPakaon to discover authentic Pakistani and Indian dishes you can make with ingredients already in your pantry.

## About

KyaPakaon is a full-stack web application that helps you find traditional desi recipes based on what you have on hand. Simply enter your available ingredients, and the app intelligently matches them against a curated collection of 38+ authentic recipes.

## Features

- Smart ingredient matching with live search
- Recipe ranking based on available ingredients
- Cooking time, servings, and spice level details
- Separate views for perfect matches and near matches
- Autocomplete ingredient suggestions

## Tech Stack

**Frontend**
- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- shadcn/ui components

**Backend**
- Node.js
- Express
- TypeScript
- MongoDB with Mongoose

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB running locally

### Installation

1. Clone the repository
```bash
git clone https://github.com/ArsalanAnwer0/KyaPakaon.git
cd KyaPakaon
```

2. Install server dependencies
```bash
cd server
npm install
```

3. Install client dependencies
```bash
cd ../client
npm install
```

4. Seed the database
```bash
cd ../server
npm run seed
```

### Running the Application

1. Start the server
```bash
cd server
npm run dev
```
Server will run on http://localhost:5001

2. Start the client (in a new terminal)
```bash
cd client
npm run dev
```
Client will run on http://localhost:5173

## Project Structure

```
KyaPakaon/
├── client/          # React frontend
├── server/          # Express backend
└── README.md
```

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/recipes/search?ingredients=chicken,rice` - Search recipes by ingredients

## License

MIT
