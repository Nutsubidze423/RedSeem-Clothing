import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthUser {
  name: string;
  email: string;
}

interface AuthStore {
  user: AuthUser | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,

      login: (email, _password) => {
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return false;
        const name = email.split("@")[0].replace(/[._]/g, " ");
        set({ user: { name, email }, isLoggedIn: true });
        return true;
      },

      register: (name, email, _password) => {
        set({ user: { name, email }, isLoggedIn: true });
      },

      logout: () => set({ user: null, isLoggedIn: false }),
    }),
    { name: "redseem-auth" }
  )
);
