import React from 'react';

export const metadata = {
  title: 'rps',
  description: 'Made by yours truly, Renz',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400&amp;display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="urbanist-font">{children}</body>
    </html>
  );
}
