'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'
import { Document } from '@/app/types/document'

export default function DocumentViewer({ params }: { params: Promise<{ id: string }> }): React.ReactElement {
  const [document, setDocument] = useState<Document | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { isLoaded, isSignedIn } = useAuth()
  const resolvedParams = React.use(params)

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in')
      return
    }

    if (isSignedIn) {
      fetchDocument()
    }
  }, [isLoaded, isSignedIn, router])

  const fetchDocument = async () => {
    try {
      const response = await fetch(`/api/documents/${resolvedParams.id}`)
      if (!response.ok) throw new Error('Failed to fetch document')
      const data = await response.json()
      setDocument(data)
    } catch (_err) {
      setError('Failed to load document')
    } finally {
      setLoading(false)
    }
  }

  if (!isLoaded || !isSignedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-black">{error}</div>
      </div>
    )
  }

  return (
    <main className="min-h-screen py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-black mb-4">{document?.title}</h1>
          <p className="text-black">{document?.description}</p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-4">
          <iframe
            src={`/api/documents/${resolvedParams.id}/view`}
            className="w-full h-[800px] border border-gray-200"
            title={document?.title}
          />
        </div>
      </div>
    </main>
  )
} 