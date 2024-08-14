/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

// export default {
// 	async fetch(request, env, ctx): Promise<Response> {
// 		return new Response('Hello World!');
// 	},
// } satisfies ExportedHandler<Env>;

export default {
	async fetch(request, env, ctx): Promise<Response> {
	  try {
		await env.kv_test.put("KEY", "VALUE");
		const value = await env.kv_test.get("KEY");
		if (value === null) {
		  return new Response("Value not found", { status: 404 });
		}
		return new Response(value);
	  } catch (err) {
		// In a production application, you could instead choose to retry your KV
		// read or fall back to a default code path.
		console.error(`KV returned error: ${err}`)
		return new Response("An error occurred while accessing the KV store.", { status: 500 })
	  }
	},
  } satisfies ExportedHandler<Env>;