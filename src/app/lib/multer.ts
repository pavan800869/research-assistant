import multer from 'multer'
import { NextApiRequest } from 'next'
import { GridFSBucket } from 'mongodb'
import clientPromise from './mongodb'

// Configure multer for memory storage
const storage = multer.memoryStorage()

// File filter to only allow PDFs
const fileFilter = (_req: NextApiRequest, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true)
  } else {
    cb(new Error('Only PDF files are allowed'))
  }
}

// Configure multer upload
export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
})

// Helper function to store file in GridFS
export const storeFileInGridFS = async (
  file: Express.Multer.File,
  userId: string
): Promise<string> => {
  const client = await clientPromise
  const db = client.db()
  const bucket = new GridFSBucket(db)

  const uploadStream = bucket.openUploadStream(file.originalname, {
    metadata: {
      contentType: file.mimetype,
      userId,
    },
  })

  return new Promise((resolve, reject) => {
    uploadStream.write(file.buffer, (error) => {
      if (error) {
        reject(error)
      } else {
        resolve(uploadStream.id.toString())
      }
    })
  })
} 