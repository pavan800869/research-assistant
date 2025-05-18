'use client'
import React from 'react'
import Link from 'next/link'

export default function HomePage(): React.ReactElement {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-black mb-6 font-poppins">
              AI-Powered Research Assistant
            </h1>
            <p className="text-xl text-black mb-8">
              Upload your research papers and get instant insights. Our AI helps you understand complex academic content quickly and efficiently.
            </p>
            <Link
              href="/pages/about"
              className="bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 transition duration-300 inline-block"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-black text-center mb-12 font-poppins">
            Key Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-black mb-4">Smart Document Analysis</h3>
              <p className="text-black">
                Upload your research papers and let our AI analyze the content, extract key insights, and provide comprehensive summaries.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-black mb-4">Natural Language Queries</h3>
              <p className="text-black">
                Ask questions about your papers in plain English. Our AI understands context and provides relevant, accurate answers.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-black mb-4">Secure & Private</h3>
              <p className="text-black">
                Your documents are encrypted and stored securely. We maintain strict privacy standards to protect your research.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-black mb-6 font-poppins">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-black mb-8">
            Join researchers and students who are already using our platform to enhance their work.
          </p>
          <Link
            href="/pages/documents"
            className="bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 transition duration-300 inline-block"
          >
            View Your Documents
          </Link>
        </div>
      </section>
    </main>
  )
} 