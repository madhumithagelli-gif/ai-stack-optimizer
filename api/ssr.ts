export const config = {
  runtime: "nodejs",
};

export default async function handler(request: Request) {
  try {
    // Dynamically import the built server handler at runtime
    // TanStack Start builds to dist/server/index.mjs
    const { default: serverHandler } = await import(
      `../dist/server/index.mjs?t=${Date.now()}`
    );
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
