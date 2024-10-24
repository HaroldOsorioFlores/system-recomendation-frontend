import { ResponseLogin } from "@/lib/definitions";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  sub: string;
  exp: number;
}

interface IAuthStore {
  token: string | null;
  email: string | null;
  login: (userData: ResponseLogin) => void;
  logout: () => void;
  exp: number | null;
}

const useAuthStore = create<IAuthStore>()(
  persist(
    (set) => ({
      token: null,
      email: null,
      exp: null,
      login: (userData: ResponseLogin) => {
        const token = userData.access_token;

        const decoded = jwtDecode<DecodedToken>(token);
        console.log({ decoded });

        set({
          token,
          email: decoded.sub,
          exp: decoded.exp,
        });
      },
      logout: () => {
        set({ token: null, email: null, exp: null });
        console.log("Logging out...");
        localStorage.removeItem("auth-storage");
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuthStore;
