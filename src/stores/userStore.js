import { create } from "zustand";

export const useUserStore = create(() => ({
  users: [
    { id: "AthirK", displayName: "Athir" },
    { id: "JoLundan", displayName: "Johanna" },
    { id: "De1ora", displayName: "Lisa" },
    { id: "rydalund", displayName: "Magnus" },
    { id: "EnanderW", displayName: "William" },
  ],
}));