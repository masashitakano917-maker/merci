export default {
  async fetch(request, env) {
    const assets = env && env.ASSETS;

    if (!assets || typeof assets.fetch !== "function") {
      return new Response("Site assets are not available.", { status: 500 });
    }

    const response = await assets.fetch(request);

    if (response.status !== 404) {
      return response;
    }

    const url = new URL(request.url);
    const indexRequest = new Request(new URL("/index.html", url), request);
    return assets.fetch(indexRequest);
  },
};
