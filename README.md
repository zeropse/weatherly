# Weatherly

Weatherly is a modern weather dashboard built with React and Vite. It lets users search for any city and view current conditions alongside a 5-day forecast broken into 3-hour intervals.

The app uses an internal serverless API route to keep the OpenWeather API key on the server side while the frontend talks to a simple `/api/weather` endpoint.

## Features

- Search weather by city name
- View current conditions, including temperature, feels-like temperature, humidity, pressure, visibility, and wind
- See sunrise, sunset, and timezone information
- Browse a 5-day forecast with 3-hour detail blocks
- Share searches through the URL query string
- Use the app in light or dark theme

## Tech Stack

- React
- Vite
- TailwindCSS
- Shadcn Components
- Vercel Serverless Functions
- OpenWeather API

## Getting Started

### Prerequisites

- Node.js 20 or later
- npm
- An OpenWeather API key

### Installation

```bash
npm install
```

Create a local environment file:

```bash
cp .env.example .env
```

Add your OpenWeather key:

```env
OPEN_WEATHER_API_KEY=your_api_key_here
```

### Run Locally

Frontend development server:

```bash
npm run dev
```

## Available Scripts

- `npm run dev` starts the Vite dev server
- `npm run dev:vercel` starts Vercel local development
- `npm run build` creates a production build
- `npm run lint` runs ESLint
- `npm run preview` previews the production build locally

## Environment Variables

| Variable               | Required | Description                                     |
| ---------------------- | -------- | ----------------------------------------------- |
| `OPEN_WEATHER_API_KEY` | Yes      | API key used by the serverless weather endpoint |

## Project Structure

```text
weatherly/
├── api/                  # Serverless API handlers
├── public/               # Static assets and icons
├── src/
│   ├── components/       # Reusable UI and weather components
│   ├── layout/           # App shell components
│   ├── lib/              # Weather API and data formatting logic
│   ├── pages/            # Route-level pages
│   └── style/            # Theme and global styles
├── vercel.json           # Rewrite rules for SPA + API routing
└── vite.config.js        # Vite configuration
```

## API

### `GET /api/weather?city=<name>`

Returns current weather and forecast data for the provided city.

Example:

```bash
curl "http://localhost:3000/api/weather?city=Tokyo"
```

Possible error cases include:

- `400` when `city` is missing
- `404` when the city cannot be resolved
- `405` for unsupported methods
- `500` for configuration or upstream service failures

## Deployment

Weatherly is configured for Vercel.

To deploy:

1. Import the repository into Vercel.
2. Set the `OPEN_WEATHER_API_KEY` environment variable.
3. Deploy.

The included [vercel.json](./vercel.json) rewrites both SPA routes and API requests appropriately.

## Contributing

Contributions are welcome. Please read [CONTRIBUTING.md](./CONTRIBUTING.md) before opening a pull request.

## License

This project is available under the MIT License. See [LICENSE](./LICENSE).
