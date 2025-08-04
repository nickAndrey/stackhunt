import { loginMember } from '@/shared/services/members/login-member';
import { useEffect, useState, type ReactNode } from 'react';
import { AuthContext, type AuthContextProps } from './auth-context';

type AuthProviderProps = { children: ReactNode };

export function AuthProvider({ children }: AuthProviderProps) {
  const [member, setMember] = useState<AuthContextProps['member']>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleLogin = async (params: { email: string; password: string }) => {
    try {
      const member = await loginMember(params);

      setMember({
        id: member.id,
        role: member.role,
        status: member.status,
        first_name: member.first_name,
        last_name: member.last_name,
        profile_image: member.profile_image,
      });

      return {
        success: true,
        msg: '',
      };
    } catch (e) {
      console.error('Login failed:', e);

      const err = e as Error;

      return {
        success: false,
        msg: err.message,
      };
    }
  };

  const handleLogout = () => {
    setMember(null);
  };

  useEffect(() => {
    const stored = localStorage.getItem('auth');
    if (stored) setMember(JSON.parse(stored));
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (member) {
      localStorage.setItem('auth', JSON.stringify(member));
    } else {
      localStorage.removeItem('auth');
    }
  }, [member]);

  return (
    <AuthContext.Provider
      value={{
        member,
        isLoading,
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
