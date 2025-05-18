import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import clientPromise from '@/lib/mongodb'
import { ObjectId, GridFSBucket } from 'mongodb'

export async function POST(request: Request) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const formData = await request.formData()
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const file = formData.get('file') as File

    if (!title || !file) {
      return new NextResponse('Missing required fields', { status: 400 })
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Connect to MongoDB
    const client = await clientPromise
    const db = client.db()

    // Store file in GridFS
    const bucket = new GridFSBucket(db)
    const uploadStream = bucket.openUploadStream(file.name, {
      metadata: {
        contentType: file.type,
        userId,
      },
    })

    // Write file to GridFS
    await new Promise((resolve, reject) => {
      uploadStream.write(buffer, (error) => {
        if (error) reject(error)
        else resolve(null)
      })
    })

    // Create document record
    const document = {
      _id: new ObjectId(),
      title,
      description,
      userId,
      fileId: uploadStream.id,
      status: 'processing',
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    // Save document metadata
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