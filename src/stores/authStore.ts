import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface User {
  id?: string;
  username?: string;
  email?: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  setUser: (user: User) => void;
  clearAuth: () => void;
  updateAccessToken: (accessToken: string) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  clearTokens: () => void;
}

const storage =
  typeof window !== "undefined"
    ? createJSONStorage(() => localStorage)
    : undefined;

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      setTokens: (accessToken, refreshToken) => {
        set({ accessToken, refreshToken });
      },
      setUser: (user) => {
        set({ user });
      },

      clearAuth: () => {
        set({ user: null, accessToken: null, refreshToken: null });
      },

      updateAccessToken: (accessToken) => {
        set({ accessToken });
      },
      clearTokens: () => {
        set({ accessToken: null, refreshToken: null });
      },
    }),
    {
      name: "auth-storage",
      storage: storage!, // dùng dấu ! để bảo TS chắc chắn không undefined ở client
    }
  )
);
