'use client'
import React from 'react'
import Link from 'next/link'
import { useAuth, UserButton, SignInButton, SignUpButton } from '@clerk/nextjs'

export default function Header(): React.ReactElement {
  const { isLoaded, isSignedIn } = useAuth()

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-black">
            AI Research Assistant
          </Link>
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-black hover:text-gray-600 transition duration-300">
              Home
            </Link>
            <Link href="/pages/about" className="text-black hover:text-gray-600 transition duration-300">
              About
            </Link>
            <Link href="/pages/contact" className="text-black hover:text-gray-600 transition duration-300">
              Contact
            </Link>
            {isLoaded && isSignedIn && (
              <Link href="/pages/documents" className="text-black hover:text-gray-600 transition duration-300">
                Documents
              </Link>
            )}
            <div className="flex items-center space-x-4">
              {!isSignedIn ? (
                <>
                  <SignInButton mode="modal">
                    <button className="text-black hover:text-gray-600 transition duration-300">
                      Sign In
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition duration-300">
                      Sign Up
                    </button>
                  </SignUpButton>
                </>
              ) : (
                <UserButton afterSignOutUrl="/" />
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
} 