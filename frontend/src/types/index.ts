export interface Repository {
  url: string;
  name: string;
  owner: string;
}

export interface Technology {
  name: string;
  icon: string;
  description: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: string;
}

export interface Contact {
  name: string;
  url: string;
  icon: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  isAuthenticated: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}
