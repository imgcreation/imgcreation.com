'use client'

import Link from 'next/link'
import { Instagram, Youtube, PinIcon as Pinterest, Facebook } from 'lucide-react'

export const Footer = () => {
    return (
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
        </div>
      </footer>
    )
}