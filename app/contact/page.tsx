import type { Metadata } from "next";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import fs from "fs";
import path from "path";
import { IAboutPage, IMenu } from "@/lib/types";
import { Hero } from "@/components/ui/hero";
import { Mail, MapPin, Phone } from 'lucide-react'
import Image from "next/image";

async function getMenuData() {
    const filePath = path.join(process.cwd(), "public", "data", "menu.json");
    const jsonData = fs.readFileSync(filePath, "utf-8");
    const menuJson: IMenu[] = JSON.parse(jsonData);
    return menuJson;
}

async function getPageData() {
    const filePath = path.join(process.cwd(), "public", "data", "contact.json");
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

const Content = ({ heading, body }: { heading: string, body: string }) => {
    return (
        <div className="max-w-3xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <h2 className="text-2xl font-semibold">Get in Touch</h2>

                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <Phone className="text-primary" />
                            <div>
                                <p className="font-medium">Kids Photography</p>
                                <a
                                    href="https://wa.me/9289890076?text=I%27m%20interested%20in%20your%20kid%20photography"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:underline"
                                >
                                    +91-9289890076
                                </a>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            <Phone className="text-primary" />
                            <div>
                                <p className="font-medium">Wedding Photography</p>
                                <a
                                    href="https://wa.me/9289890075?text=I%27m%20interested%20in%20your%20wedding%20photography"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:underline"
                                >
                                    +91-9289890075
                                </a>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            <Mail className="text-primary" />
                            <a
                                href="mailto:info@imgcreation.com"
                                className="text-primary hover:underline"
                            >
                               info@imgcreation.com
                            </a>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <h2 className="text-2xl font-semibold">Our Location</h2>

                    <div className="aspect-video relative">
                        <Image
                            src="/photos/studio-location.png" 
                            alt="Studio location map"
                            fill
                            className="object-cover rounded-lg"
                        />
                    </div>

                    <div className="flex items-start space-x-3">
                        <MapPin className="text-primary flex-shrink-0 mt-1" />
                        <p>
                            Sector 88, Faridabad, Haryana, India
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default async function Contact() {
    const { hero, content } = await getPageData();
    const menu = await getMenuData();

    return (
        <div className="min-h-screen flex flex-col">
            <Header menu={menu} />
            <main className="flex-1 container mx-auto px-4 py-4">
                <Hero {...hero} />
                <Content {...content} />
            </main>
            <Footer />
        </div>
    );
}
