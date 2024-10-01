import { NextResponse } from 'next/server'

import db from '@/utils/db'

export const GET = async (_request: Request) => {
  const data = await db.todo.findMany({})
  return NextResponse.json({ data })
}

export const POST = async (request: Request) => {
  const data = await request.json()

  const todo = await db.todo.create({
    data,
  })

  return NextResponse.json({ data: todo })
}

export const OPTIONS = () => {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'COntent-Type, Authorization',
    },
  })
}
