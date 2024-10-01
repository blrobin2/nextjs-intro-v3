import { NextResponse } from 'next/server'

import db from '@/utils/db'

export const GET = async (
  _request: Request,
  { params }: { params: { id: string } }
) => {
  const todoId: string = params.id

  const data = await db.todo.findFirst({
    where: {
      id: todoId,
    },
  })
  return NextResponse.json({ data })
}
