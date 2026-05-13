export const config = {
  runtime: "nodejs",
};

// Import the server handler built by TanStack Start
import serverHandler from "../dist/server.js";

export default async function handler(request: Request) {
  try {
    const response = await serverHandler.fetch(request, {}, {});
    return response;
  } catch (error) {
    console.error("SSR Error:", error);
    return new Response(
      `<!DOCTYPE html>
<html>
<head><title>Error</title></head>
<body>
  <h1>Error rendering page</h1>
  <pre>${error instanceof Error ? error.stack : String(error)}</pre>
</body>
</html>`,
      {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      }
    );
  }
}
