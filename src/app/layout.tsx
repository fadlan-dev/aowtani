import RootStyleRegistry from './emotion';
import './globals.css';
import './base.css';
import { Anuphan } from 'next/font/google';
import Header from './Header';
import Footer from './Footer';
import Providers from '@/components/Providers';

const anuphan = Anuphan({ subsets: ['thai'] });

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={anuphan.className}>
        <RootStyleRegistry>
          <Header />
          <Providers>
            <main
              style={{
                minHeight: 'calc(100vh - 143px)',
                backgroundColor: 'rgb(248, 249, 250)',
              }}
            >
              {children}
            </main>
          </Providers>
          <Footer />
        </RootStyleRegistry>
      </body>
    </html>
  );
}
