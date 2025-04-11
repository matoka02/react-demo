import type { Session } from '@toolpad/core';
import React from 'react';

export interface SessionContextValue {
  session: Session | null;
  setSession: (session: Session | null) => void;
}

export const SessionContext = React.createContext<SessionContextValue>({
  session: {},
  setSession: () => {},
});

export function useSession() {
  return React.useContext(SessionContext);
}
