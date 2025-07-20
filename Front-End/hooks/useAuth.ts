import { useState } from "react";
import { User, AuthState } from "../types";

export const useAuth = () => {
  // Mock authenticated user for testing
  const [authState, setAuthState] = useState<AuthState>({
    user: {
      id: "1",
      name: "João Silva",
      email: "joao.silva@buildsynt.dev",
      avatar:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      isAuthenticated: true,
    },
    isAuthenticated: true,
  });

  const login = (email: string, password: string) => {
    // Mock login logic
    const mockUser: User = {
      id: "1",
      name: "João Silva",
      email: email,
      avatar:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      isAuthenticated: true,
    };

    setAuthState({
      user: mockUser,
      isAuthenticated: true,
    });
  };

  const logout = () => {
    setAuthState({
      user: null,
      isAuthenticated: false,
    });
  };

  const register = (name: string, email: string, password: string) => {
    // Mock register logic
    const mockUser: User = {
      id: "2",
      name: name,
      email: email,
      avatar:
        "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      isAuthenticated: true,
    };

    setAuthState({
      user: mockUser,
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
