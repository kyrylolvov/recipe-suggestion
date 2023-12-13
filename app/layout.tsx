import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { ThemeProvider } from '~/providers/theme-provider';

import '~/styles/globals.css';
import { QueryProvider } from './providers/query-provider';

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
        <QueryProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
