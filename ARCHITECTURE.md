# proxydisplay — how it works

A two-screen IT support status sign:

- **Control page** (`/`) — a touch console (meant for an iPad at the help desk) where a staff member taps "OPEN" or "CLOSED".
- **Display page** (`/display`) — a full-screen sign (meant for a monitor/kiosk outside the office) that shows the current status to visitors, in English and German.

The two pages are different browser tabs/devices. They stay in sync over a WebSocket: tapping a button on the control page updates a single piece of state on the server, which immediately pushes the new status to every connected display (and control) page.

## Runtime & stack

- [Bun](https://bun.com) as the server, bundler, and dev server — no Node, no Vite, no Express (see `CLAUDE.md` for the house rules).
- React 19, rendered per-page via Bun's HTML-import bundling (each HTML file pulls in its own `*-entry.tsx`).
- [Zustand](https://github.com/pmndrs/zustand) on the client for the tiny bit of shared state (current status + WebSocket connection).
- Plain CSS (`src/index.css`), no Tailwind/CSS-in-JS.

## Request flow

```
                 ┌─────────────┐        WS: {type:"set", status}
  staff taps ───▶│ ControlPanel │───────────────────────────────┐
  OPEN/CLOSED    └─────────────┘                                ▼
                                                          ┌──────────────┐
                                                          │  index.ts     │
                                                          │  (Bun.serve)  │
                                                          │  currentStatus│
                                                          └──────────────┘
                                                                  │
                                              WS broadcast: {type:"status", status}
                                                                  ▼
                                                          ┌──────────────┐
                                                          │ DisplayPanel  │──▶ visitors see
                                                          └──────────────┘    the sign update
```

The server ([`index.ts`](index.ts)) is the single source of truth for status — it's just an in-memory variable (`currentStatus`), not a database. **Restarting the server resets the status to `"closed"`.**

## Server (`index.ts`)

- `Bun.serve()` with `routes`:
  - `"/"` → `index.html` (control page)
  - `"/display"` → `display.html` (display page)
- A raw `fetch` handler upgrades any request to `/ws` into a WebSocket connection; everything else 404s.
- WebSocket pub/sub, using Bun's built-in topic system (`ws.subscribe` / `server.publish`) instead of tracking a client list manually:
  - On `open`: the new client is subscribed to the `"status"` topic and immediately sent the current status, so a freshly loaded display page doesn't have to wait for the next change.
  - On `message`: if the payload is `{type: "set", status: "open" | "closed"}`, the server updates `currentStatus` and publishes `{type: "status", status}` to every subscriber (including the sender — the control page updates itself the same way the display does).
- `NODE_ENV=production` disables Bun's dev mode (HMR/console forwarding); this is set in the `Dockerfile`.

## Client state (`src/store.ts`)

A single Zustand store, shared by both pages:

- Opens one WebSocket to `${location.host}/ws` (using `wss://` automatically when the page is served over HTTPS).
- `status`: `"open" | "closed"`, defaults to `"closed"` until the server's initial message arrives.
- `connected`: tracks socket open/close, currently unused in the UI but available if you want to show a "disconnected" indicator later.
- `setStatus(status)`: sends `{type: "set", status}` to the server — it does **not** set local state directly. The UI only updates once the server echoes the change back over the socket. This keeps every open tab (control or display) provably in sync with the server rather than optimistically-updated and possibly wrong.

Both `index.ts` and `store.ts` independently declare `type SupportStatus = "open" | "closed"`. There's no shared types package — if you ever add a third status, **update both files**.

## Pages

### Control page — `index.html` → `src/control-entry.tsx` → [`src/ControlPanel.tsx`](src/ControlPanel.tsx)

Large touch-friendly OPEN/CLOSED buttons for a staff member. Reads `status` and calls `setStatus` from the store. Purely presentational — all the real logic is the store + server round trip described above.

### Display page — `display.html` → `src/display-entry.tsx` → [`src/DisplayPanel.tsx`](src/DisplayPanel.tsx)

Renders one of two full-screen "sign" cards depending on `status`, each with an English headline/subtitle, a divider, then the German translation:

- **Open**: green icon (`SupportOpenIcon`), "IT support is available at the moment" / "Zurzeit ist ein IT-Mitarbeiter erreichbar." No phone number — nothing urgent to call about.
- **Closed**: red icon (`SupportClosedIcon`), "No IT operator is available at the moment" / "Zurzeit ist kein IT Mitarbeiter erreichbar.", plus an emergency-contact block with the phone number.

**To change the emergency phone number**, edit the `EMERGENCY_PHONE` constant at the top of `src/DisplayPanel.tsx` — it's used in one place only.

**To change the wording**, edit the JSX directly in `DisplayPanel.tsx`; there's no i18n library, the English and German strings are just written out inline one after another.

### Icons (`src/icons.tsx`)

Hand-drawn inline SVG components, no icon library:

- `CheckCircleIcon` / `CloseCircleIcon` — small generic status glyphs, used on the control page's status banner and switch buttons.
- `SupportOpenIcon` / `SupportClosedIcon` — the larger "person at a help desk" icon shown on the display page, green with a checkmark badge vs. red with an X badge.
- `HeadsetIcon` — used in the control page header/logo.

### Styling (`src/index.css`)

One shared stylesheet for both pages (imported by both entry files). Organized in three sections, in this order in the file:

1. **Control Page** — dark theme, `.control-page`, `.status-banner`, `.switch-btn` etc.
2. **Display Page** — light theme, `.display-page`, `.status-sign` (the white card) and its `__icon` / `__title` / `__subtitle` / `__divider` / `__call-label` / `__phone` children, shared by both the open and closed variants via `.status-sign--open` / `.status-sign--closed` modifiers.

Colors are defined once as CSS custom properties at the top of the file (`--status-green`, `--status-red`, `--accent-blue`, etc.) — reuse those instead of hardcoding hex values in new rules.

## Local development

```bash
bun install
bun run dev      # bun --hot index.ts — hot reload on save
```

- Control console: `http://localhost:3000/`
- Display sign: `http://localhost:3000/display`

Open both in separate tabs/windows to see them sync live over the WebSocket.

## Deployment

- `Dockerfile` builds a `bun` image, installs production deps only, and runs `bun index.ts` on port 3000.
- `docker-compose.yml` runs two containers:
  - `app` — the Bun server (not exposed to the host directly, only `expose`d to the compose network).
  - `nginx` — reverse proxy, publishes port 80, forwards to `app:3000`.
- `nginx/default.conf` proxies everything to the app and explicitly forwards the `Upgrade`/`Connection` headers so the `/ws` WebSocket upgrade works through the proxy. If you add a new WebSocket path or move the app off port 3000, this file needs to match.

```bash
docker compose up --build
```

There is no environment-based configuration beyond `PORT` (server) and `NODE_ENV` (dev/prod mode) — see `index.ts`.
