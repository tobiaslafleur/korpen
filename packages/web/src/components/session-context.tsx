'use client';

import { useRouter } from 'next/navigation';
import { ReactNode, createContext, useContext, useState } from 'react';

type Session = {
  session: string;
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  created_at: string;
  updated_at: string;
};

type SessionContext = {
  signIn: (credentials: { email: string; password: string }) => Promise<void>;
  signOut: () => Promise<void>;
  session: Session | undefined;
};

const sessionContext = createContext<SessionContext>({
  signIn: async () => {},
  signOut: async () => {},
  session: undefined,
});

const SessionContexProvider = ({
  children,
  session: initialSession,
}: {
  children: ReactNode;
  session?: Session;
}) => {
  const router = useRouter();

  const [session, setSession] = useState(initialSession);

  const signIn = async (credentials: { email: string; password: string }) => {
    const res = await fetch('http://localhost:4000/api/v1/sessions', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!res.ok) {
      return;
    }

    setSession(await res.json());

    router.push('/');
  };

  const signOut = async () => {
    const res = await fetch('http://localhost:4000/api/v1/sessions', {
      method: 'DELETE',
      credentials: 'include',
    });

    if (!res.ok) {
      return;
    }

    setSession(undefined);

    router.push('/');
  };

  return (
    <sessionContext.Provider value={{ signIn, signOut, session }}>
      {children}
    </sessionContext.Provider>
  );
};

export default SessionContexProvider;

export const useSession = () => useContext(sessionContext);
