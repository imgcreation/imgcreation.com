"use client";

import Link from "next/link";
import {
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const MenuItems = () => (
  <>
    <Link href="/" className="block py-2 hover:text-teal-500">
      Home
    </Link>
    <Link href="/slideshows" className="block py-2 hover:text-teal-500">
      Slideshows
    </Link>
    <Link href="/galleries" className="block py-2 hover:text-teal-500">
      Galleries
    </Link>
    <Link href="/about" className="block py-2 hover:text-teal-500">
      About
    </Link>
    <Link href="/templates" className="block py-2 hover:text-teal-500">
      Templates
    </Link>
    <Link href="/order-prints" className="block py-2 hover:text-teal-500">
      Order Prints
    </Link>
    <Link href="/booking" className="block py-2 hover:text-teal-500">
      Booking
    </Link>
  </>
);

export const Header = () => {
  return (
    <header className="bg-white py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <Link
            href="/"
            className="text-4xl font-light text-teal-500 font-['Dancing_Script'] mb-4"
          >
            IMG CREATION
          </Link>
          <nav className="hidden lg:flex space-x-6 text-sm uppercase tracking-wider">
            <MenuItems />
          </nav>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden mt-2">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <nav className="flex flex-col space-y-4 text-sm uppercase tracking-wider mt-6">
                <MenuItems />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
