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

const Content = () => {
    return (
        <div className="max-w-3xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <h2 className="text-2xl font-semibold">Get in Touch</h2>
                    <p className="text-sm text-gray-500 flex items-center space-x-2">
                        <Phone className="text-primary" size={24} />
                        <span>
                            <a href="tel:+919289890075" className="hover:underline">+91-9289890075</a>
                            {" / "}
                            <a href="tel:+919289890076" className="hover:underline">+91-9289890076</a>
                        </span>    
                    </p>
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-2">
                                <a
                                    href="https://wa.me/9289890075?text=I%27m%20interested%20in%20your%20wedding%20photography"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Image src="/photos/icons8-whatsapp.gif" alt="WhatsApp" width={35} height={35} />
                                </a>
                            </div>
                            <div>
                                <p className="font-medium">Wedding Photography</p>
                                <a
                                    href="https://wa.me/9289890075?text=I%27m%20interested%20in%20your%20wedding%20photography"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary underline"
                                >
                                    click to chat
                                </a>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-2">
                                <a
                                    href="https://wa.me/9289890076?text=I%27m%20interested%20in%20your%20kid%20photography"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Image src="/photos/icons8-whatsapp.gif" alt="WhatsApp" width={35} height={35} />
                                </a>
                            </div>
                            <div>
                                <p className="font-medium">Kids Photography</p>
                                <a
                                    href="https://wa.me/9289890075?text=I%27m%20interested%20in%20your%20kid%20photography"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary underline"
                                >
                                    Click to chat
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
                            src="/photos/fbd-studio-map.png"
                            alt="Studio location map"
                            fill
                            className="object-none rounded-lg"
                        />
                    </div>

                    <div className="flex items-start space-x-3">
                        <MapPin className="text-primary flex-shrink-0 mt-1" />
                        <p>
                        SCO-2, FIRST FLOOR, VILLAGE BHATOLA, NEAR CHANDILA CHOWK, MASTER ROAD, 100 METER AHEAD FROM OMAX WORLD STREET, SECTOR 82, GREATER FARIDABAD, HARYANA 121002
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default async function Contact() {
    const { hero } = await getPageData();
    const menu = await getMenuData();

    return (
        <div className="min-h-screen flex flex-col">
            <Header menu={menu} />
            <main className="flex-1 container mx-auto px-4 py-4">
                <Hero {...hero} />
                <Content />
            </main>
            <Footer />
        </div>
    );
}
