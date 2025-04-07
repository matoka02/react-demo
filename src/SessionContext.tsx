import type { Session } from '@toolpad/core';
import React, { useContext, useMemo, useState } from 'react';

export interface SessionContextValue {
  session: Session | null;
  setSession: (session: Session | null) => void;
}

export const SessionContext = React.createContext<SessionContextValue>({
  // session: {},
  session: null,
  setSession: () => {},
});

// export function useSession() {
//   return React.useContext(SessionContext);
// }

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);

  // const signIn = async (credentials: any) => {
  //   setSession({ user: credentials });
  // };

  // const signOut = () => {
  //   setSession(null);
  // };

  const contextValue = useMemo(
    () => ({
      session,
      setSession,
      // signIn,
      // signOut
    }),
    [session]
  );

  return <SessionContext.Provider value={contextValue}>{children}</SessionContext.Provider>;
}

export const useSession = () => useContext(SessionContext);
