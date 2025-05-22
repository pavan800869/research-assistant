import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'
import { storeFileInGridFS } from '@/app/lib/multer'
import { NextRequest } from 'next/server'
import { Readable } from 'stream'

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    // Parse the multipart form data
    const formData = await request.formData()
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const file = formData.get('file') as File

    if (!title || !file) {
      return new NextResponse('Missing required fields', { status: 400 })
    }

    // Convert File to Buffer for Multer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Create a mock Multer file object
    const multerFile: Express.Multer.File = {
      fieldname: 'file',
      originalname: file.name,
      encoding: '7bit',
      mimetype: file.type,
      buffer,
      size: buffer.length,
      destination: '',
      filename: '',
      path: '',
      stream: Readable.from(buffer),
    }

    // Store file in GridFS
    const fileId = await storeFileInGridFS(multerFile, userId)

    // Create document record
    const document = {
      _id: new ObjectId(),
      title,
      description,
      userId,
      fileId: new ObjectId(fileId),
      status: 'processing',
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    // Save document metadata
    const client = await clientPromise
    const db = client.db()
    await db.collection('documents').insertOne(document)

    return NextResponse.json({
      id: document._id,
      title: document.title,
      status: document.status,
    })
  } catch (error) {
    console.error('Error uploading document:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
} 