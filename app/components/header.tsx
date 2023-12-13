import { Pencil2Icon } from '@radix-ui/react-icons';
import Link from 'next/link';

import ThemeSwitch from './theme-switch';

export default function Header() {
  return (
    <header className="py-4 flex justify-between items-center">
      <Link href="/" className="flex items-center gap-3">
        <Pencil2Icon className="w-6 h-6" />
        <div className="hidden md:block font-semibold">Recipe Suggestions</div>
      </Link>
      <ThemeSwitch />
    </header>
  );
}
