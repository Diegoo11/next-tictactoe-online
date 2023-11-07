import ReactQuery from '@/app/providers/ReactQuery';
import './globals.css';
import NextAuth from '@/app/providers/NextAuth';
import { UtilsProvider } from './providers/UtilsContext';

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReactQuery>
          <NextAuth>
            <UtilsProvider>
              <div className="w-full flex flex-col justify-between h-full bg-[#f1f2f4] min-h-screen">
                <nav className="bg-[#fefffe] border-b-2 text-black font-extrabold text-4xl lg:text-6xl text-center p-5">
                  Tic-Tac-Toe-Online
                </nav>
                <main className="w-full flex flex-col justify-center items-center">
                  {children}
                </main>
                <footer className="w-full bg-[#fefffe] border-t-2 text-black font-semibold text-base md:text-md lg:text-xl text-center p-1 md:p-5">
                  Copyright © 2023 Diegoo11
                </footer>
              </div>
            </UtilsProvider>
          </NextAuth>
        </ReactQuery>
      </body>
    </html>
  );
}
