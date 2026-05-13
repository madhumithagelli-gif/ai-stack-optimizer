export const config = {
  runtime: "nodejs",
};

export default async function handler(request: Request) {
  try {
    // In Vercel's build environment, the server is built to dist/server/index.mjs
    // We need to use the file: protocol with proper path resolution
    const serverPath = new URL("../dist/server/index.mjs", import.meta.url);
    const { default: serverHandler } = await import(serverPath.href);
    
    if (!serverHandler || !serverHandler.fetch) {
      throw new Error("Server handler not properly exported");
    }
    
    const response = await serverHandler.fetch(request, {}, {});
    return response;
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
