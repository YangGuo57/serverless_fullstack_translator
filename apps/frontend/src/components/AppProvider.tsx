"use client";

import { useToast } from "@/hooks/use-toast";
import { IAuthUser } from "@/lib";
import React, { useContext, createContext, useState } from "react"


type IAppContext = {
  user: IAuthUser | null | undefined;
  setUser: (user: IAuthUser | null) => void;
  serError: (msg: string) => void;
  resetError: () => void;
}

const AppContext = createContext<IAppContext>({
  user: null,
  setUser: (user) => { },
  serError: (msg) => { },
  resetError: () => { },
})

function useInitialApp(): IAppContext {
  const [user, setUser] = useState<IAuthUser | null | undefined>(undefined)
  const { toast, dismiss } = useToast();

  return {
    user,
    setUser,
    serError: (msg) => {
      toast({
        variant: "destructive",
        title: 'Error',
        description: msg,
      })
    },
    resetError: () => {
      dismiss();
    }
  }
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const initialValue = useInitialApp();
  return (<AppContext.Provider value={initialValue}>{children}</AppContext.Provider>)
}

// Custom hook to use the app context
export function useApp() {
  return useContext(AppContext)
}