import type { User } from "@/features/signup/signUp.model";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  exp: number;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;

  setAuth: (user: User, token: string) => void;
  logout: () => void;
  checkToken: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      setAuth: (user, token) => {
        set({
          user,
          token,
          isAuthenticated: true,
        });
      },

      logout: () =>
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        }),

      checkToken: () => {
        const token = get().token;

        if (!token) {
          get().logout();
          return;
        }

        try {
          const decoded = jwtDecode<DecodedToken>(token);

          const currentTime = Date.now() / 1000;

          if (decoded.exp < currentTime) {
            get().logout();
          } else {
            set({ isAuthenticated: true });
          }
        } catch (error) {
          console.log(error)
          get().logout();
        }
      },
    }),
    {
      name: "auth-storage",
    }
  )
);




// export const useAuthStore = create<AuthState>()(
//   persist(
//     (set) => ({
//       user: null,
//       token: null,

//       setUser: (user) => set({ user }),
//       setToken: (token) => set({ token }),

//       logout: () => set({ user: null, token: null }),
//     }),
//     {
//       name: "auth-storage",
//     }
//   )
// );