export const config = {
  runtime: "nodejs",
};

export default async function handler(request: Request) {
  try {
    // Vite/TanStack Start output in this repo is dist/server/server.js
    // Import by trying multiple known filenames to avoid Vercel 404s.
    const candidatePaths = [
      "../dist/server/index.mjs",
      "../dist/server/server.js",
      "../dist/server/server.mjs",
      "../dist/server.js",
      "../dist/server.mjs",
    ];

    let lastErr: unknown;
    for (const p of candidatePaths) {
      try {
        const serverPath = new URL(p, import.meta.url);
        const mod = await import(serverPath.href);
        const serverHandler = mod.default ?? (mod as any);
        const handlerFn = serverHandler?.fetch ?? serverHandler;
        if (typeof handlerFn === "function") {
          const res = await handlerFn(request, {}, {});
          return res;
        }
        lastErr = new Error(`Server handler not a function for: ${p}`);
      } catch (e) {
        lastErr = e;
      }
    }

    throw lastErr instanceof Error ? lastErr : new Error(String(lastErr));
  } catch (error) {
    console.error("[SSR Error]", error);
    const errorDetails = error instanceof Error ? error.message : String(error);
    return new Response(
      `<!DOCTYPE html>
<html>
<head>
  <title>Server Error</title>
  <style>
    body { font-family: monospace; margin: 40px; }
    .error { color: #d32f2f; }
    .details { background: #f5f5f5; padding: 10px; margin-top: 10px; }
  </style>
</head>
<body>
  <h1>Error rendering page</h1>
  <div class="error">${errorDetails}</div>
  <div class="details">
    <p>Server path: ../dist/server/index.mjs</p>
    <p>Check Vercel deployment logs for more details</p>
  </div>
</body>
</html>`,
      {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      }
    );
  }
}
