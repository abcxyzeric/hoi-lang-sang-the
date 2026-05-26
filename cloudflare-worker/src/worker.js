const ORIGIN_WORKSHOP = "https://cloudflare-workshop.saugrodep.workers.dev";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
};
const NO_STORE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
  "Pragma": "no-cache",
  "Expires": "0",
};
const TRANSLATED_DATA_PREFIX = "/workshop-data/api";
const WORKSHOP_SHELL_VERSION = "20260526-11de93cf";

function withCors(response) {
  const headers = new Headers(response.headers);
  for (const [key, value] of Object.entries(CORS_HEADERS)) {
    headers.set(key, value);
  }
  for (const [key, value] of Object.entries(NO_STORE_HEADERS)) {
    headers.set(key, value);
  }
  if (String(headers.get("Content-Type") || "").includes("application/json")) {
    headers.set("Content-Type", "application/json; charset=utf-8");
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

function withNoStore(response) {
  const headers = new Headers(response.headers);
  for (const [key, value] of Object.entries(NO_STORE_HEADERS)) {
    headers.set(key, value);
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

function redirectNoStore(location, status = 302) {
  return new Response(null, {
    status,
    headers: {
      ...NO_STORE_HEADERS,
      Location: location,
    },
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

function getTranslatedApiAssetPath(url) {
  if (url.pathname === "/api/site-config") {
    return `${TRANSLATED_DATA_PREFIX}/site-config.json`;
  }

  if (url.pathname === "/api/presets") {
    return `${TRANSLATED_DATA_PREFIX}/presets.json`;
  }

  const presetFileMatch = url.pathname.match(/^\/api\/presets\/([^/]+)\/file$/);
  if (presetFileMatch) {
    return `${TRANSLATED_DATA_PREFIX}/preset_files/${decodeURIComponent(presetFileMatch[1])}.json`;
  }

  const presetDetailMatch = url.pathname.match(/^\/api\/presets\/([^/]+)$/);
  if (presetDetailMatch) {
    return `${TRANSLATED_DATA_PREFIX}/presets/${decodeURIComponent(presetDetailMatch[1])}.json`;
  }

  if (url.pathname === "/api/content") {
    const type = url.searchParams.get("type");
    if (type === "character" || type === "extension") {
      return `${TRANSLATED_DATA_PREFIX}/content_${type}.json`;
    }
  }

  const contentDetailMatch = url.pathname.match(/^\/api\/content\/([^/]+)$/);
  if (contentDetailMatch) {
    return `${TRANSLATED_DATA_PREFIX}/content/${decodeURIComponent(contentDetailMatch[1])}.json`;
  }

  return "";
}

async function serveTranslatedApiData(request, env, assetPath) {
  const assetUrl = new URL(request.url);
  assetUrl.pathname = assetPath;
  assetUrl.search = "";

  const response = await env.ASSETS.fetch(new Request(assetUrl, request));
  if (response.status === 404) {
    return null;
  }
  if (!String(response.headers.get("Content-Type") || "").includes("application/json")) {
    return null;
  }

  return withCors(response);
}

function translatedApiNotFound() {
  return new Response(JSON.stringify({
    error: "translated_content_not_found",
    message: "Mục này chưa có bản dịch tiếng Việt.",
  }), {
    status: 404,
    headers: {
      ...CORS_HEADERS,
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    if (request.method === "GET" && url.pathname.startsWith("/api/")) {
      const translatedAssetPath = getTranslatedApiAssetPath(url);
      if (translatedAssetPath) {
        const translatedResponse = await serveTranslatedApiData(request, env, translatedAssetPath);
        if (translatedResponse) {
          return translatedResponse;
        }
        return translatedApiNotFound();
      }
    }

    if (url.pathname.startsWith("/api/")) {
      return proxyToOrigin(request, url);
    }

    if (url.pathname === "/") {
      url.pathname = "/index.html";
      return withNoStore(await env.ASSETS.fetch(new Request(url, request)));
    }

    if (url.pathname === "/embed" || url.pathname === "/embed/") {
      return redirectNoStore(`/?workshop_shell=${WORKSHOP_SHELL_VERSION}`);
    }

    return env.ASSETS.fetch(request);
  },
};
