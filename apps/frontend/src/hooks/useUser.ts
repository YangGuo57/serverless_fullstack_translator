"use client";

import { useCallback, useEffect, useState } from 'react';
import { autoSignIn, confirmSignUp, getCurrentUser, signIn, signOut, signUp } from 'aws-amplify/auth';
import { useApp } from '@/components';
import { ILoginFormData, IRegisterConfirmation, IRegisterFormData, ISignInState, ISignUpState } from '@/lib';


export const useUser = () => {
  const [busy, setBusy] = useState<boolean>(false);

  const { user, setUser, serError, resetError } = useApp();

  useEffect(() => {
    async function fetchUser() {
      setBusy(true);
      await getUser();
      setBusy(false);
    }
    fetchUser();
  }, []
  );

  const login = useCallback(async ({ email, password }: ILoginFormData) => {
    try {
      setBusy(true);
      resetError();
      await signIn(
        {
          username: email,
          password,
          options: {
            userAttributes: {
              email,
            }
          }
        }
      );
      await getUser();
    } catch (error: any) {
      serError(error.toString());
    } finally {
      setBusy(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      setBusy(true);
      resetError();
      await signOut();
      setUser(null);
    } catch (error: any) {
      serError(error.toString());
    } finally {
      setBusy(false);
    }
  }, []);

  const register = async ({
    email,
    password,
    password2,
  }: IRegisterFormData): Promise<ISignUpState | null> => {
    let rtnValue = null;
    try {
      setBusy(true);
      resetError();
      if (password !== password2) {
        throw new Error("Passwords do not match!");
      }

      const { nextStep } = await signUp({
        username: email,
        password: password,
        options: {
          userAttributes: {
            email,
          },
          autoSignIn: true,
        },
      });
      rtnValue = nextStep as ISignUpState
    } catch (error: any) {
      serError(error.toString());
    } finally {
      setBusy(false);
      return rtnValue;
    }
  };

  const confirmRegister = async ({
    email,
    verificationCode,
  }: IRegisterConfirmation): Promise<ISignUpState | null> => {
    let rtnValue = null;
    try {
      setBusy(true);
      resetError();
      const { nextStep } = await confirmSignUp({
        confirmationCode: verificationCode,
        username: email,
      });

      rtnValue = nextStep as ISignUpState
    } catch (error: any) {
      serError(error.toString());
    } finally {
      setBusy(false);
      return rtnValue;
    }
  };

  const autoLogin = useCallback(async (): Promise<ISignInState | null> => {
    let rtnValue = null;
    try {
      setBusy(true);
      resetError();
      const { nextStep } = await autoSignIn();
      rtnValue = nextStep as ISignInState;
      await getUser();
    } catch (error: any) {
      serError(error.toString());
    } finally {
      setBusy(false);
      return rtnValue;
    }
  }, []);


  const getUser = async () => {
    try {
      const curUser = await getCurrentUser();
      setUser(curUser);
    } catch (error) {
      setUser(null);
    }
  }

  return {
    user,
    busy,
    login,
    logout,
    register,
    confirmRegister,
    autoLogin,
  };
};