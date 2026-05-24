const ORIGIN_WORKSHOP = "https://cloudflare-workshop.saugrodep.workers.dev";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
};

function withCors(response) {
  const headers = new Headers(response.headers);
  for (const [key, value] of Object.entries(CORS_HEADERS)) {
    headers.set(key, value);
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

async function proxyToOrigin(request, url) {
  const target = new URL(url.pathname + url.search, ORIGIN_WORKSHOP);
  const headers = new Headers(request.headers);
  headers.set("Host", target.host);
  headers.set("Origin", ORIGIN_WORKSHOP);
  headers.set("Referer", `${ORIGIN_WORKSHOP}/`);

  const proxied = new Request(target, {
    method: request.method,
    headers,
    body: request.method === "GET" || request.method === "HEAD" ? undefined : request.body,
    redirect: "manual",
  });

  const response = await fetch(proxied);
  return withCors(response);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    if (url.pathname.startsWith("/api/")) {
      return proxyToOrigin(request, url);
    }

    if (url.pathname === "/") {
      url.pathname = "/index.html";
      return env.ASSETS.fetch(new Request(url, request));
    }

    if (url.pathname === "/embed" || url.pathname === "/embed/") {
      url.pathname = "/embed.html";
      return env.ASSETS.fetch(new Request(url, request));
    }

    return env.ASSETS.fetch(request);
  },
};
