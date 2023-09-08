import { ReactNode } from 'react';

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex h-screen items-center justify-center text-sm ">
      {children}
    </main>
  );
};

export default RootLayout;
