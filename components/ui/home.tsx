'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Instagram, Youtube, PinIcon as Pinterest, Facebook, ChevronLeft, ChevronRight, Menu } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

const images = [
  'https://placehold.co/600x800/EEE/31343C?text=img1',
  'https://placehold.co/600x800/EEE/31343C?text=img2',
  'https://placehold.co/600x800/EEE/31343C?text=img3',
  'https://placehold.co/600x800/EEE/31343C?text=img4',
  'https://placehold.co/600x800/EEE/31343C?text=img5',
  'https://placehold.co/600x800/EEE/31343C?text=img6',
]

export function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [slidesToShow, setSlidesToShow] = useState(3)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % (images.length - slidesToShow + 1))
  }, [slidesToShow])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + (images.length - slidesToShow + 1)) % (images.length - slidesToShow + 1))
  }, [slidesToShow])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        if (window.innerWidth < 640) {
          setSlidesToShow(1)
        } else if (window.innerWidth < 1024) {
          setSlidesToShow(2)
        } else {
          setSlidesToShow(3)
        }
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prevSlide()
      } else if (e.key === 'ArrowRight') {
        nextSlide()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [nextSlide, prevSlide])

  const MenuItems = () => (
    <>
      <Link href="/" className="block py-2 hover:text-teal-500">Home</Link>
      <Link href="/slideshows" className="block py-2 hover:text-teal-500">Slideshows</Link>
      <Link href="/galleries" className="block py-2 hover:text-teal-500">Galleries</Link>
      <Link href="/about" className="block py-2 hover:text-teal-500">About</Link>
      <Link href="/templates" className="block py-2 hover:text-teal-500">Templates</Link>
      <Link href="/order-prints" className="block py-2 hover:text-teal-500">Order Prints</Link>
      <Link href="/booking" className="block py-2 hover:text-teal-500">Booking</Link>
    </>
  )

  return (
    <div className="min-h-screen flex flex-col">
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

      <main className="flex-1 container mx-auto px-4 py-4">
        <div className="max-w-6xl mx-auto relative pb-10">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * (100 / slidesToShow)}%)` }}
            >
              {images.map((src, index) => (
                <div
                  key={index}
                  className="w-full flex-shrink-0"
                  style={{ flex: `0 0 ${100 / slidesToShow}%` }}
                >
                  <div className="p-2">
                    <div className="relative aspect-[3/4]">
                      <Image
                        src={src}
                        alt={`Gallery image ${index + 1}`}
                        fill
                        className="object-cover rounded-lg"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-1 rounded-full hover:bg-black/75 transition-colors z-10"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-1 rounded-full hover:bg-black/75 transition-colors z-10"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {Array.from({ length: images.length - slidesToShow + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full ${
                  currentSlide === index ? 'bg-teal-500' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </main>

      <footer className="bg-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex justify-center space-x-6 mb-4">
            <Link href="https://instagram.com" className="text-gray-400 hover:text-teal-500">
              <Instagram className="h-6 w-6" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link href="https://youtube.com" className="text-gray-400 hover:text-teal-500">
              <Youtube className="h-6 w-6" />
              <span className="sr-only">YouTube</span>
            </Link>
            <Link href="https://pinterest.com" className="text-gray-400 hover:text-teal-500">
              <Pinterest className="h-6 w-6" />
              <span className="sr-only">Pinterest</span>
            </Link>
            <Link href="https://facebook.com" className="text-gray-400 hover:text-teal-500">
              <Facebook className="h-6 w-6" />
              <span className="sr-only">Facebook</span>
            </Link>
          </div>
          <div className="text-center text-sm text-gray-500">
            <p>Copyright © {new Date().getFullYear()} · All Rights Reserved</p>
          </div>
        </div>
      </footer>
    </div>
  )
}