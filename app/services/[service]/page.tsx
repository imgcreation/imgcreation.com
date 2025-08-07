import type { Metadata } from "next";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import fs from "fs";
import path from "path";
import { IServicePage, IMenu } from "@/lib/types";
import { Carousel } from "@/components/ui/carousel";
import { TabbedGallery } from "@/components/ui/tabbed-gallery";
import Image from "next/image"

export const dynamicParams = false;

export async function generateStaticParams() {
  const filePath = path.join(
    process.cwd(),
    "public",
    "data",
    "services",
    "index.json"
  );
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const services: string[] = JSON.parse(jsonData);

  return services.map((service) => ({
    service,
  }));
}

async function getMenuData() {
  const filePath = path.join(process.cwd(), "public", "data", "menu.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const menuJson: IMenu[] = JSON.parse(jsonData);
  return menuJson;
}

async function getServicePageData(service: string): Promise<IServicePage> {
  const filePath = path.join(
    process.cwd(),
    "public",
    "data",
    "services",
    `${service}.json`
  );
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const pageJson: IServicePage = JSON.parse(jsonData);
  return pageJson;
}

interface PageParams {
  params: Promise<{
    service: string;
  }>;
}

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const { service } = await params;
  const { meta } = await getServicePageData(service);
  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
  };
}

const Content = ({ heading, body }: { heading: string; body: string }) => (
  <div className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-8 py-6">
    <h1 className="text-3xl sm:text-4xl font-serif text-center mb-4 text-gray-900 px-4">
      {heading}
    </h1>
    <p className="text-center text-gray-600 mb-6 max-w-2xl mx-auto px-4">
      {body}
    </p>
  </div>
);

export default async function Page({ params }: PageParams) {
  const { service } = await params;
  const { slideshow, content, gallery, videoGallery } = await getServicePageData(service);
  const menu = await getMenuData();

  return (
    <div className="min-h-screen flex flex-col">
      <Header menu={menu} />
      <main className="flex-1 container mx-auto px-4 py-4">
        <Carousel images={slideshow} />
        <Content {...content} />
        <TabbedGallery images={gallery} videos={videoGallery} />
        <Image
          className="hidden object-top"
          src="/photos/gallery/Maternity/0L7A1661BW.jpg"
          alt="Test hidden image"
          width={100}
          height={100}
        />
      </main>
      <Footer />
    </div>
  );
}
