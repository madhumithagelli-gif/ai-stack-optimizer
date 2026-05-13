export const config = {
  runtime: "nodejs",
  maxDuration: 30,
};

export default async function handler(request) {
  try {
    // For TanStack Start on Vercel, the built server is in dist/server
    // Try multiple possible paths to find the server
    let serverHandler;
    
    try {
      // First try: exact path
      const { default: handler1 } = await import("../dist/server/index.mjs");
      serverHandler = handler1;
    } catch (e1) {
      try {
        // Second try: without index
        const { default: handler2 } = await import("../dist/server.js");
        serverHandler = handler2;
      } catch (e2) {
        try {
          // Third try: mjs extension
          const { default: handler3 } = await import("../dist/server.mjs");
          serverHandler = handler3;
        } catch (e3) {
          throw new Error(
            `Failed to import server handler. Tried paths:\n` +
            `1. ../dist/server/index.mjs: ${e1.message}\n` +
            `2. ../dist/server.js: ${e2.message}\n` +
            `3. ../dist/server.mjs: ${e3.message}`
          );
        }
      }
    }
    
    if (!serverHandler) {
      throw new Error("Server handler module is empty");
    }
    
    // Handle both default export and .fetch method
    const handler = serverHandler.fetch || serverHandler.default?.fetch || serverHandler;
    
    if (typeof handler !== "function") {
      throw new Error(
        `Server handler is not a function. Got: ${typeof handler}. ` +
        `Available properties: ${Object.keys(serverHandler).join(", ")}`
      );
    }
    
    const response = await handler(request, {}, {});
    return response;
  } catch (error) {
    console.error("[SSR Handler Error]", error);
    
    const errorDetails = error instanceof Error 
      ? `${error.message}\n\n${error.stack || ""}`
      : String(error);
    
    return new Response(
      `<!DOCTYPE html>
<html>
<head>
  <title>Server Error</title>
  <meta charset="utf-8">
  <style>
    body { 
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", monospace; 
      margin: 0;
      padding: 40px;
      background: #fafafa;
      color: #333;
    }
    .container { max-width: 800px; }
    h1 { color: #d32f2f; margin-top: 0; }
    .error-box { 
      background: white; 
      border: 2px solid #d32f2f; 
      border-radius: 4px;
      padding: 20px;
      margin: 20px 0;
    }
    pre { 
      background: #f5f5f5; 
      padding: 15px; 
      border-radius: 4px;
      overflow-x: auto;
      font-size: 12px;
      line-height: 1.5;
    }
    .info { color: #666; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <h1>⚠️ Server Rendering Error</h1>
    <div class="error-box">
      <h2>What happened?</h2>
      <p>The application encountered an error while rendering on the server.</p>
      <pre>${escapeHtml(errorDetails)}</pre>
    </div>
    <div class="info">
      <p>📋 To debug this:</p>
      <ul>
        <li>Check Vercel Function Logs: Dashboard → Deployments → Function Logs</li>
        <li>Verify dist/server files exist after build</li>
        <li>Check console output for import errors</li>
      </ul>
    </div>
  </div>
</body>
</html>`,
      {
        status: 500,
        headers: { 
          "content-type": "text/html; charset=utf-8",
          "cache-control": "no-cache, no-store, must-revalidate"
        },
      }
    );
  }
}

function escapeHtml(text) {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}
