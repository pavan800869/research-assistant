import { Document } from '../types/document'

export async function getDocuments(): Promise<Document[]> {
  try {
    const response = await fetch('/api/documents')
    if (!response.ok) {
      throw new Error('Failed to fetch documents')
    }
    return response.json()
  } catch (error) {
    console.error('Error fetching documents:', error)
    throw error
  }
}

export async function deleteDocument(id: string): Promise<void> {
  try {
    const response = await fetch(`/api/documents/${id}`, {
      method: 'DELETE',
    })
    if (!response.ok) {
      throw new Error('Failed to delete document')
    }
  } catch (error) {
    console.error('Error deleting document:', error)
    throw error
  }
} 