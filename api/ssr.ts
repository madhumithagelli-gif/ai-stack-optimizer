export const config = {
  runtime: "nodejs",
};

// Import the actual server handler directly, bypassing the dynamic import wrapper
import serverHandler from "../dist/server/assets/server-C4A5TEzd.js";

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
