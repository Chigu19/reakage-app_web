"use client";

import { useAuth as useAuthContext } from '@/components/auth/auth-provider';

export const useAuth = () => {
  const context = useAuthContext();
  
  return {
    user: context.profile,
    isLoading: context.isLoading,
    login: context.signIn,
    logout: context.signOut,
    signup: context.signUp,
    updateProfile: context.updateProfile,
  };
};