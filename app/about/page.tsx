import type { Metadata } from "next";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import fs from "fs";
import path from "path";
import { IAboutPage } from "@/lib/types";
import { Hero } from "@/components/ui/hero";

async function getPageData() {
  const filePath = path.join(process.cwd(), "public", "data", "about.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const pageJson: IAboutPage = JSON.parse(jsonData);
  return pageJson;
}

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getPageData();

  return {
    title: meta.title,
    description: meta.description,
  };
}

const Content = ({ heading, body } : { heading: string, body: string}) => {
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-4xl font-serif mb-8 text-gray-800">
        {heading}
      </h2>

      <div className="space-y-6 text-gray-600">
        <p>
          {body}
        </p>
      </div>
    </div>
  );
};

export default async function Home() {
  const { hero, content } = await getPageData();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-4">
        <Hero {...hero} />
        <Content {...content} />
      </main>
      <Footer />
    </div>
  );
}
