import { useState } from 'react';

import type { AuthState } from '../types';

export const useAuth = () => {
  // Start with unauthenticated state
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
  });

  const login = (email: string, _password: string) => {
    // Simplified login - sets authenticated state without mock user data
    setAuthState({
      user: {
        id: Date.now().toString(),
        name: 'Usuário',
        email,
      },
      isAuthenticated: true,
    });
  };

  const logout = () => {
    setAuthState({
      user: null,
      isAuthenticated: false,
    });
  };

  const register = (name: string, email: string, _password: string) => {
    // Simplified register - sets authenticated state without mock user data
    setAuthState({
      user: {
        id: Date.now().toString(),
        name,
        email,
      },
      isAuthenticated: true,
    });
  };

  return {
    ...authState,
    login,
    logout,
    register,
  };
};
