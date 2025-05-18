'use client'
import React from 'react'
import Link from 'next/link'

export default function AboutPage(): React.ReactElement {
  return (
    <main className="min-h-screen py-20 bg-white">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-black mb-8 font-poppins">About AI Research Assistant</h1>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-black mb-4">Our Mission</h2>
          <p className="text-black mb-4">
            We're on a mission to make academic research more accessible and efficient. Our AI-powered platform helps researchers, students, and academics navigate through complex research papers and extract valuable insights quickly.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-black mb-6">How It Works</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-black mb-3">1. Upload Your Papers</h3>
              <p className="text-black">
                Upload your research papers in PDF format. Our system will process and index them for quick access and analysis.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-black mb-3">2. Ask Questions</h3>
              <p className="text-black">
                Ask questions about your papers in natural language. Our AI will analyze the content and provide relevant answers.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-black mb-4">Technology</h2>
          <p className="text-black mb-4">
            We leverage state-of-the-art natural language processing and machine learning technologies to provide accurate and relevant insights from your research papers.
          </p>
        </section>

        <div className="text-center">
          <Link
            href="/pages/contact"
            className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition duration-300"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </main>
  )
} 