import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  isLoggedIn: boolean;
  email: string;
  login: (email: string, password: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      email: '',
      login: (email, password) => {
        if (email === 'test@visionexdigital.com.au' && password === 'password123') {
          set({ isLoggedIn: true, email });
        }
      },
      logout: () => set({ isLoggedIn: false, email: '' }),
    }),
    {
      name: 'auth-storage',     }
  )
);