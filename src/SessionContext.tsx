import type { Session } from '@toolpad/core';
import React, { useContext, useState } from 'react';

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

  return (
    <SessionContext.Provider
      value={{
        session,
        setSession,
        // signIn,
        // signOut
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export const useSession = () => useContext(SessionContext);
