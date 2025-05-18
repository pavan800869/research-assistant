import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import clientPromise from '@/lib/mongodb'

export async function GET() {
  try {
    const { userId } = await auth()

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const client = await clientPromise
    const db = client.db()

    const documents = await db.collection('documents')
      .find({ userId })
      .sort({ createdAt: -1 })
      .toArray()

    return NextResponse.json(documents)
  } catch (error) {
    console.error('Error fetching documents:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
} 