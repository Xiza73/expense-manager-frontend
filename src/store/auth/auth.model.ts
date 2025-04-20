import { User } from '@/domain/user.interface';

export interface AuthState {
  isAuthenticated: boolean;
  isProcessing: boolean;
  user?: User;
}

export interface AuthStore extends AuthState {
  login: (user: User) => void;
  logout: () => void;
  endProcessing: () => void;
}
