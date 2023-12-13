import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { ThemeProvider } from '~/providers/theme-provider';

import '~/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Recipe Suggestions',
  description:
    'Discover delicious recipes based on the ingredients you have. Enter your available ingredients and get personalized recipe suggestions instantly.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
