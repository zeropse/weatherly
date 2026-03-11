import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import weatherHandler from "./api/weather.js";

const __dirname = path.resolve();

function vercelApiDevPlugin() {
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
          await weatherHandler(
            {
              method: req.method,
              query,
            },
            apiRes,
          );
        } catch (error) {
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
export default defineConfig({
  plugins: [react(), tailwindcss(), vercelApiDevPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
  },
});
