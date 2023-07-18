import RootStyleRegistry from './emotion';
import './globals.css';
import './base.css';
import { Anuphan } from 'next/font/google';
import Header from './Header';
import Footer from './Footer';
import Providers from '@/components/Providers';

const anuphan = Anuphan({ subsets: ['thai'] });

export const metadata = {
  title: 'Pattani smart tourism',
  description: 'Generated by create next app',
  openGraph: {
    title: 'Pattani smart tourism',
    description: 'Generated by create next app',
    url: 'https://triple-i.in',
    siteName: 'Pattani smart tourism',
    publishedTime: '2023-01-01T00:00:00.000Z',
    authors: ['triple-i'],
    images: [
      {
        url: './vercel.svg',
        width: 800,
        height: 600,
      },
      {
        url: './vercel.svg',
        width: 1800,
        height: 1600,
        alt: 'My custom alt',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={anuphan.className}>
        <RootStyleRegistry>
          <Header />
          <Providers>
            {modal}
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
