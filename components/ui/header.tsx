"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import Image from "next/image";
import { IMenu } from "@/lib/types";

const MenuItems = ({menu}: { menu: IMenu[]}) => ( // Fixed prop typing
  <>
    {menu.map((item) => (
      <Link
        key={item.name}
        href={item.url}
        className="block py-2 px-4 hover:text-teal-500"
      >
        {item.name}
      </Link>
    ))}
  </>
);

export const Header = ({ menu }: { menu: IMenu[]}) => {
  return (
    <header className="bg-white py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-around items-center">
          <Link
            href="/"
            className="text-4xl font-light text-teal-500 font-['Dancing_Script'] mb-4 lg:mb-0"
          >
            <Image
              width={200}
              height={150}
              src="/photos/imgcreation-logo.png"
              title="imgcreation-logo"
              alt="imgcreation logo"
            />
          </Link>
          <nav className="hidden lg:flex space-x-6 text-sm uppercase tracking-wider">
            <MenuItems menu={menu} />
          </nav>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden mt-2">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[240px]">
              <SheetTitle className="text-xl font-semibold mb-4">
                Menu
              </SheetTitle>
              <nav className="flex flex-col gap-4 mt-6">
                <MenuItems menu={menu} />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
