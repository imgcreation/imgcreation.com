import { Header } from "@/components/ui/header";
import { Slideshow } from "@/components/ui/slideshow";
import { Footer } from "@/components/ui/footer";
import fs from "fs";
import path from "path";
import { Slide } from "@/lib/types";

async function getSlides() {
  const filePath = path.join(process.cwd(), "public", "slideshow.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const slides: Slide[] = JSON.parse(jsonData);
  return slides;
}

export default async function Home() {
  const slides = await getSlides();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-4">
        <Slideshow slides={slides} />
      </main>
      <Footer />
    </div>
  );
}
