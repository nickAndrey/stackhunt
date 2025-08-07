import type { Staff } from '@/shared/types/staff';
import { createContext } from 'react';

type AuthContextProps = {
  isLoading: boolean;
  member:
    | Pick<Staff, 'first_name' | 'last_name' | 'id' | 'profile_image' | 'status' | 'role'>
    | null
    | undefined;
  login: (params: {
    email: string;
    password: string;
  }) => Promise<{ success: boolean; msg: string }>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextProps | null>(null);

export { AuthContext, type AuthContextProps };
