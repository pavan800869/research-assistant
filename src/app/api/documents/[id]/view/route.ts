import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import clientPromise from '@/lib/mongodb'
import { ObjectId, GridFSBucket } from 'mongodb'

export async function GET(
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

    const bucket = new GridFSBucket(db)
    const downloadStream = bucket.openDownloadStream(document.fileId)
    
    const chunks: Buffer[] = []
    for await (const chunk of downloadStream) {
      chunks.push(chunk)
    }
    const buffer = Buffer.concat(chunks)

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${document.title}.pdf"`,
      },
    })
  } catch (error) {
    console.error('Error fetching document:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
} 