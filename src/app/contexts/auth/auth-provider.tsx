import { useEffect, useState, type ReactNode } from 'react';
import { AuthContext, type AuthContextProps } from './auth-context';
import { checkMemberExist } from './services/check-member-exist';
import { loginMember } from './services/login-member';

type AuthProviderProps = { children: ReactNode };

export function AuthProvider({ children }: AuthProviderProps) {
  const [member, setMember] = useState<AuthContextProps['member'] | null | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const handleLogin = async (params: { email: string; password: string }) => {
    try {
      const { id, role, status, first_name, last_name, profile_image } = await loginMember(params);

      const initialMember = { id, role, status, first_name, last_name, profile_image };

      setMember(initialMember);
      localStorage.setItem('auth', JSON.stringify(initialMember));

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
    const checkStaffMember = async () => {
      try {
        const stored = localStorage.getItem('auth');

        if (stored) {
          const parsedStored = JSON.parse(stored);
          const exists = await checkMemberExist(parsedStored.id);

          if (exists) {
            setMember(parsedStored);
          } else {
            localStorage.removeItem('auth');
            setMember(null);
          }
        } else {
          setMember(null);
        }
      } catch (err) {
        console.error('Error checking auth:', err);
        setMember(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkStaffMember();
  }, []);

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
