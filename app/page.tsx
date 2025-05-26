import type { Metadata } from 'next'
import { Header } from "@/components/ui/header";
import { Slideshow } from "@/components/ui/slideshow";
import { Footer } from "@/components/ui/footer";
import fs from "fs";
import path from "path";
import { IHomePage, IMenu } from "@/lib/types";

async function getMenuData() {
  const filePath = path.join(process.cwd(), "public", "data", "menu.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const menuJson: IMenu[] = JSON.parse(jsonData);
  return menuJson;
}

async function getHomePageData() {
  const filePath = path.join(process.cwd(), "public", "data", "home.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const homeJson: IHomePage = JSON.parse(jsonData);
  return homeJson;
}

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getHomePageData();
 
  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
  }
}

export default async function Home() {
  const { slideshow: slides } = await getHomePageData();
  const menu = await getMenuData();

  return (
    <div className="min-h-screen flex flex-col">
      <Header menu={menu} />
      <main className="flex-1 container mx-auto px-4 py-4">
        <Slideshow slides={slides} />
      </main>
      <Footer />
    </div>
  );
}
