import { getStaffMemberWithRelatedData } from '@/shared/services/get-staff-member-with-related-data';
import type { Staff } from '@/shared/types/staff';
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
      const memberRecord = await loginMember(params);
      const profileImage = memberRecord.files?.find((item) => item.name === 'profile-image');

      const initialMember = {
        id: memberRecord.id,
        role: memberRecord.role,
        status: memberRecord.status,
        first_name: memberRecord.first_name,
        last_name: memberRecord.last_name,
        profile_image: profileImage?.file,
      };

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

  const handleUpdateMember = <K extends 'profile_image' | 'status' | 'role'>(
    key: K,
    value: Staff[K]
  ) => {
    if (!member) return;

    const memberUpdated: AuthContextProps['member'] = {
      ...member,
      [key]: value,
    };

    setMember(memberUpdated);
  };

  useEffect(() => {
    const checkStaffMember = async () => {
      try {
        const stored = localStorage.getItem('auth');

        if (stored) {
          const parsedStored = JSON.parse(stored);
          const exists = await checkMemberExist(parsedStored.id);

          if (exists) {
            const memberRecord = await getStaffMemberWithRelatedData(parsedStored.id);
            const profileImage = memberRecord.files?.find((item) => item.name === 'profile-image');

            setMember({
              id: memberRecord.id,
              role: memberRecord.role,
              status: memberRecord.status,
              first_name: memberRecord.first_name,
              last_name: memberRecord.last_name,
              profile_image: profileImage?.file,
            });
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
        handleUpdateMember,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
