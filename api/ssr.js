export const config = {
  runtime: "nodejs",
  maxDuration: 30,
};

export default async function handler(request) {
  try {
    const candidatePaths = [
      "../dist/server/index.mjs",
      "../dist/server/server.js",
      "../dist/server/server.mjs",
      "../dist/server.js",
      "../dist/server.mjs",
    ];

    let serverHandler;
    let lastErr;

    for (const p of candidatePaths) {
      try {
        const mod = await import(p);
        serverHandler = mod.default ?? mod;
        if (serverHandler) break;
      } catch (e) {
        lastErr = e;
      }
    }

    if (!serverHandler) {
      throw new Error(
        `Failed to import server handler. Last error: ${lastErr?.message ?? String(lastErr)}`
      );
    }

    const handlerFn =
      serverHandler.fetch ||
      (serverHandler.default ? serverHandler.default.fetch : undefined) ||
      serverHandler;

    if (typeof handlerFn !== "function") {
      throw new Error(
        `Server handler is not a function. Got: ${typeof handlerFn}. ` +
          `Available properties: ${Object.keys(serverHandler).join(", ")}`
      );
    }

    return await handlerFn(request, {}, {});
  } catch (error) {
    console.error("[SSR Handler Error]", error);

    const errorDetails =
      error instanceof Error ? `${error.message}\n\n${error.stack || ""}` : String(error);

    return new Response(
      `<!DOCTYPE html>
<html>
<head>
  <title>Server Error</title>
  <meta charset="utf-8">
  <style>
    body { font-family: monospace; margin: 40px; }
    .error { color: #d32f2f; }
    .details { background: #f5f5f5; padding: 10px; margin-top: 10px; white-space: pre-wrap; }
  </style>
</head>
<body>
  <h1>Error rendering page</h1>
  <div class="error">${escapeHtml(errorDetails)}</div>
  <div class="details">
    <p>Check Vercel Function Logs for more details.</p>
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

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

