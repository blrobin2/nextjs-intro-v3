'use server'

import { revalidatePath } from 'next/cache'
import db from './db'

export const newTodo = async (formData: FormData) => {
  const content = formData.get('content')?.toString()
  if (content === undefined || content === '') {
    throw new Error('Please define a todo!')
  }

  await db.todo.create({
    data: {
      content,
    },
  })

  revalidatePath('/todos')
}

export const completeTodo = async (id: string) => {
  await db.todo.update({
    where: {
      id,
    },
    data: {
      completed: true,
    },
  })

  revalidatePath('/todos')
}
