import { createRequestHandler } from '@remix-run/express';
import { createCookie, createFileSessionStorage } from '@remix-run/node';
import express from 'express';

const viteDevServer =
  process.env?.NODE_ENV === "production"
    ? null
    : await import("vite").then((vite) =>
      vite.createServer({
        server: { middlewareMode: true },
      })
    );

const app = express();

app.use(
  viteDevServer
    ? viteDevServer.middlewares
    : express.static("build/client")
);

const build = viteDevServer
  ? () =>
    viteDevServer.ssrLoadModule(
      "virtual:remix/server-build"
    )
  : await import("./build/server/index.js");

const sessionCookie = createCookie("__session", {
  secrets: ["r3m1xr0ck5"],
  sameSite: true,
});

const session =
  createFileSessionStorage({
    dir: "sessions",
    cookie: sessionCookie,
  });
console.log("session: ", session);

app.all("*", createRequestHandler({ build }));

app.listen(3000, () => {
  console.log("App listening on http://localhost:3000");
});
