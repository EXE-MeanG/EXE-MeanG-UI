// stores/registerStore.ts
import { create } from "zustand";

interface RegisterData {
  email: string;
  password: string;
  clear: () => void;
  setData: (data: { email: string; password: string }) => void;
}

export const useRegisterStore = create<RegisterData>((set) => ({
  email: "",
  password: "",
  setData: ({ email, password }) => set({ email, password }),
  clear: () => set({ email: "", password: "" }),
}));
