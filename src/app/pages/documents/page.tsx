'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'
import { Document } from '@/app/types/document'
import { getDocuments, deleteDocument } from '@/app/services/documentService'
import Link from 'next/link'

export default function DocumentsPage(): React.ReactElement {
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { isLoaded, isSignedIn } = useAuth()

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in')
      return
    }

    if (isSignedIn) {
      fetchDocuments()
    }
  }, [isLoaded, isSignedIn, router])

  const fetchDocuments = async (): Promise<void> => {
    try {
      setLoading(true)
      const data = await getDocuments()
      setDocuments(data)
      setError(null)
    } catch (_err) {
      setError('Failed to fetch documents. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string): Promise<void> => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      try {
        await deleteDocument(id)
        setDocuments(documents.filter(doc => doc.id !== id))
      } catch (_err) {
        setError('Failed to delete document. Please try again later.')
      }
    }
  }

  const getStatusColor = (status: Document['status']): string => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'processing':
        return 'bg-yellow-100 text-yellow-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
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

  return (
    <main className="min-h-screen py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-black font-poppins">My Documents</h1>
          <Link
            href="/pages/upload"
            className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition duration-300"
          >
            Upload New Document
          </Link>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {documents.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-black mb-4">No documents yet</h2>
            <p className="text-black mb-6">Upload your first research paper to get started!</p>
            <Link
              href="/pages/upload"
              className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition duration-300"
            >
              Upload Document
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-semibold text-black mb-2">{doc.title}</h2>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        doc.status
                      )}`}
                    >
                      {doc.status}
                    </span>
                  </div>
                  <p className="text-black mb-4 line-clamp-2">{doc.description}</p>
                  <div className="text-sm text-black mb-4">
                    <p>Created: {new Date(doc.createdAt).toLocaleDateString()}</p>
                    <p>Updated: {new Date(doc.updatedAt).toLocaleDateString()}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <Link
                      href={`/pages/documents/${doc.fileId}`}
                      className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition duration-300"
                    >
                      View Document
                    </Link>
                    <button
                      onClick={() => handleDelete(doc._id)}
                      className="text-red-600 hover:text-red-800 transition duration-300"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
} 