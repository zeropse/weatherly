import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import { getCityWeather, WeatherApiError } from "./src/lib/weather-service.js";
import process from "process";

const __dirname = path.resolve();

function vercelApiDevPlugin(env) {
  return {
    name: "vercel-api-dev-plugin",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const requestUrl = new URL(req.url ?? "/", "http://localhost");

        if (requestUrl.pathname !== "/api/weather") {
          next();
          return;
        }

        const query = Object.fromEntries(requestUrl.searchParams.entries());
        const apiRes = {
          status(code) {
            res.statusCode = code;
            return apiRes;
          },
          json(payload) {
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(payload));
            return apiRes;
          },
        };

        try {
          const city = query.city?.trim();
          if (!city) {
            apiRes.status(400).json({ error: "Pass ?city=<name> parameter." });
            return;
          }

          const weather = await getCityWeather(city, env);
          apiRes.status(200).json({ weather });
        } catch (error) {
          if (error instanceof WeatherApiError) {
            apiRes.status(error.status).json({ error: error.message });
            return;
          }
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.end(
            JSON.stringify({
              error:
                error instanceof Error
                  ? error.message
                  : "Unexpected server error.",
            }),
          );
        }
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), tailwindcss(), vercelApiDevPlugin(env)],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      port: 3000,
    },
  };
});
