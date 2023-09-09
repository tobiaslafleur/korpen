import { redirect } from 'next/navigation';
import { ReactNode } from 'react';
import SessionContexProvider from '~/context/session-context';
import useServerSession from '~/lib/sessions';

const ProtectedLayout = async ({ children }: { children: ReactNode }) => {
  const session = await useServerSession();

  if (!session) redirect('/sign-in');

  return (
    <main className="container mx-auto mt-4">
      <SessionContexProvider session={session}>
        {children}
      </SessionContexProvider>
    </main>
  );
};

export default ProtectedLayout;
