import { metadata } from './config';
import React from 'react';

import './globals.css';

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
          data-testid="meta-description"
          name="description"
          content={
            typeof metadata.description === 'string' ? metadata.description : ''
          }
        />
        <link rel="icon" href="/favicon.ico" data-testid="favicon-link" />
      </head>
      <body>{children}</body>
    </html>
  );
}
