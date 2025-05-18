export type Document = {
  _id: string
  title: string
  description?: string
  userId: string
  fileId: string
  status: 'processing' | 'completed' | 'failed'
  createdAt: string
  updatedAt: string
} 