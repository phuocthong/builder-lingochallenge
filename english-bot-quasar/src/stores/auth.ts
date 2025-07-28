import { defineStore } from "pinia";

export interface UserStats {
  rank: number;
  totalCorrect: number;
  streak: number;
  accuracy: number;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  email: string;
  stats?: UserStats;
}

export interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    user: null,
    isLoggedIn: false,
  }),

  getters: {
    currentUser: (state) => state.user,
    userAvatar: (state) =>
      state.user?.name
        ?.split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase() || "U",
  },

  actions: {
    login(userData: { name: string; email: string }) {
      const avatar = userData.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();

      this.user = {
        id: Math.random().toString(36).substr(2, 9),
        name: userData.name,
        email: userData.email,
        avatar,
        stats: {
          rank: Math.floor(Math.random() * 100) + 1,
          totalCorrect: Math.floor(Math.random() * 1000) + 500,
          streak: Math.floor(Math.random() * 30) + 1,
          accuracy: Math.floor(Math.random() * 20) + 80,
        },
      };
      this.isLoggedIn = true;

      // Persist to localStorage
      localStorage.setItem("auth_user", JSON.stringify(this.user));
      localStorage.setItem("auth_logged_in", "true");
    },

    logout() {
      this.user = null;
      this.isLoggedIn = false;

      // Clear localStorage
      localStorage.removeItem("auth_user");
      localStorage.removeItem("auth_logged_in");
    },

    // Restore auth state from localStorage
    restoreAuth() {
      const savedUser = localStorage.getItem("auth_user");
      const savedLoggedIn = localStorage.getItem("auth_logged_in");

      if (savedUser && savedLoggedIn === "true") {
        this.user = JSON.parse(savedUser);
        this.isLoggedIn = true;
      }
    },
  },
});
