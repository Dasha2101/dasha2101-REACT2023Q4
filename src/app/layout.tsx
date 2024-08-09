import { metadata } from './config';
import { Inter } from 'next/font/google';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <title>
          {typeof metadata.title === 'string' ? metadata.title : ''}
        </title>
        <meta
          name="description"
          content={
            typeof metadata.description === 'string' ? metadata.description : ''
          }
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
