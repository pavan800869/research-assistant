import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import clientPromise from '@/lib/mongodb'
import { ObjectId, GridFSBucket } from 'mongodb'

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const client = await clientPromise
    const db = client.db()

    const document = await db.collection('documents').findOne({
      _id: new ObjectId(params.id),
    })

    if (!document) {
      return new NextResponse('Document not found', { status: 404 })
    }

    if (document.userId !== userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    // Delete file from GridFS
    const bucket = new GridFSBucket(db)
    await bucket.delete(document.fileId)

    // Delete document record
    await db.collection('documents').deleteOne({
      _id: new ObjectId(params.id),
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('Error deleting document:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
} 