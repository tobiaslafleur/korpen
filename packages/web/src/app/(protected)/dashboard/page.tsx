'use client';

import { useSession } from '~/components/session-context';

const Dashboard = () => {
  const { session, signOut } = useSession();

  return (
    <>
      ASDASD {session?.first_name}
      <button onClick={signOut}>Sign out</button>
    </>
  );
};

export default Dashboard;
