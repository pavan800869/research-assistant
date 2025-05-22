import { Document } from '@/app/types/document'

export async function getDocuments(): Promise<Document[]> {
  const response = await fetch('/api/documents')
  if (!response.ok) {
    throw new Error('Failed to fetch documents')
  }
  return response.json()
}

export async function deleteDocument(id: string): Promise<void> {
  const response = await fetch(`/api/documents/${id}`, {
    method: 'DELETE',
  })
  
  if (!response.ok) {
    const error = await response.text()
    throw new Error(error || 'Failed to delete document')
  }
} 