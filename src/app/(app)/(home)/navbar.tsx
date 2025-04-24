"use client";

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Poppins } from 'next/font/google';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useState } from 'react';
import { MenuIcon } from 'lucide-react';
import { NavbarSidebar } from './navbar-sidebar';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

interface NavbarItemProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
}

const NavbarItem = ({ href, children, isActive }: NavbarItemProps) => {
  return (
    <Button
      asChild
      variant={'outline'}
      className={cn(
        'bg-transparent hover:bg-transparent rounded-full hover:border-primary border-transparent px-3.5 text-lg',
        isActive && 'bg-black text-white hover:bg-black hover:text-white'
      )}
    >
      <Link href={href}>
        {children}
      </Link>
    </Button>
  );
};

const navbarItems = [
  {
    href: '/',
    children: 'Home',
  },
  {
    href: '/about',
    children: 'About',
  },
  {
    href: '/features',
    children: 'Features',
  },
  {
    href: '/pricing',
    children: 'Pricing',
  },
  {
    href: '/contact',
    children: 'Contact',
  },
];

export const Navbar = () => {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <nav className="h-20 flex border-b justify-between font-medium bg-white">
      <Link href="/" className="pl-6 flex items-center">
        <span className={cn('text-5xl font-bold text-pink-700', poppins.className)}>
          Funroad
        </span>
      </Link>
      <NavbarSidebar 
        open={isSidebarOpen}
        onOpenChange={setIsSidebarOpen}
        items={navbarItems}
      />
      <div className="items-center gap-4 hidden lg:flex">
        {navbarItems.map((item) => (
          <NavbarItem key={item.href} href={item.href} isActive={pathname === item.href}>
            {item.children}
          </NavbarItem>
        ))}
      </div>
      <div className="hidden lg:flex items-center gap-4 pr-6">
        <Link href="/sign-in">
          <Button variant={'elevated'} className="hidden lg:flex mr-6 hover:bg-pink-400 border-2 border-black hover:text-white">Login</Button>
        </Link>
        <Link href="/sign-up">
          <Button variant={'elevated'} className="hidden lg:flex mr-6 bg-black text-white hover:bg-pink-400 border-2 border-black hover:text-white">Start selling</Button>
        </Link>
      </div>
      <div className="flex lg:hidden items-center justify-center">
        <Button variant={'ghost'} className="size-12 border-transparent bg-white" onClick={() => setIsSidebarOpen(true)}>
          <MenuIcon />
        </Button>
      </div>
    </nav>
  );
};
