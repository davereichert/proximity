import { create } from "zustand";

export type SupportStatus = "open" | "closed";

interface SupportStore {
  status: SupportStatus;
  connected: boolean;
  setStatus: (status: SupportStatus) => void;
}

const wsProtocol = location.protocol === "https:" ? "wss" : "ws";
const socket = new WebSocket(`${wsProtocol}://${location.host}/ws`);

export const useSupportStore = create<SupportStore>((set) => {
  socket.addEventListener("open", () => set({ connected: true }));
  socket.addEventListener("close", () => set({ connected: false }));
  socket.addEventListener("message", (event) => {
    try {
      const data = JSON.parse(event.data);
      if (data.type === "status" && (data.status === "open" || data.status === "closed")) {
        set({ status: data.status });
      }
    } catch {
      // ignore malformed messages
    }
  });

  return {
    status: "closed",
    connected: false,
    setStatus: (status) => {
      socket.send(JSON.stringify({ type: "set", status }));
    },
  };
});
