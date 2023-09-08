import { redirect } from 'next/navigation';
import { ReactNode } from 'react';
import SessionContexProvider from '~/components/session-context';
import useServerSession from '~/lib/sessions';

const ProtectedLayout = async ({ children }: { children: ReactNode }) => {
  const session = await useServerSession();

  if (!session) redirect('/sign-in');

  return (
    <main className="flex h-screen items-center justify-center text-sm ">
      <SessionContexProvider session={session}>
        {children}
      </SessionContexProvider>
    </main>
  );
};

export default ProtectedLayout;
