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

    // Find the document first to get the fileId
    const document = await db.collection('documents').findOne({
      _id: new ObjectId(params.id),
      userId, // Ensure the document belongs to the user
    })

    if (!document) {
      return new NextResponse('Document not found', { status: 404 })
    }

    // Delete file from GridFS
    const bucket = new GridFSBucket(db)
    try {
      await bucket.delete(document.fileId)
    } catch (error) {
      console.error('Error deleting file from GridFS:', error)
      // Continue with document deletion even if file deletion fails
    }

    // Delete document record
    const result = await db.collection('documents').deleteOne({
      _id: new ObjectId(params.id),
      userId, // Ensure the document belongs to the user
    })

    if (result.deletedCount === 0) {
      return new NextResponse('Document not found', { status: 404 })
    }

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('Error deleting document:', error)
    return new NextResponse(
      error instanceof Error ? error.message : 'Internal Server Error',
      { status: 500 }
    )
  }
} 