import control from "./index.html";
import display from "./display.html";
import type { ServerWebSocket } from "bun";

type SupportStatus = "open" | "closed";

const STATUS_TOPIC = "status";
let currentStatus: SupportStatus = "closed";

function statusMessage(status: SupportStatus) {
  return JSON.stringify({ type: "status", status });
}

const isProduction = process.env.NODE_ENV === "production";

const server = Bun.serve({
  hostname: "0.0.0.0",
  port: Number(process.env.PORT) || 3000,
  routes: {
    "/": control,
    "/display": display,
  },
  fetch(req, server) {
    const url = new URL(req.url);
    if (url.pathname === "/ws") {
      if (server.upgrade(req)) return;
      return new Response("Upgrade failed", { status: 400 });
    }
    return new Response("Not found", { status: 404 });
  },
  websocket: {
    open(ws: ServerWebSocket) {
      ws.subscribe(STATUS_TOPIC);
      ws.send(statusMessage(currentStatus));
    },
    message(ws: ServerWebSocket, message) {
      try {
        const data = JSON.parse(String(message));
        if (data?.type === "set" && (data.status === "open" || data.status === "closed")) {
          currentStatus = data.status;
          server.publish(STATUS_TOPIC, statusMessage(currentStatus));
        }
      } catch {
        // ignore malformed messages
      }
    },
    close(ws: ServerWebSocket) {
      ws.unsubscribe(STATUS_TOPIC);
    },
  },
  development: !isProduction,
});

console.log(`Control page:  ${server.url}`);
console.log(`Display page:  ${new URL("/display", server.url)}`);
