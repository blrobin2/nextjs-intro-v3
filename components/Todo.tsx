'use client'

import { completeTodo } from '@/utils/actions'
import { Todo as TodoType } from '@prisma/client'
import { useTransition } from 'react'

completeTodo

type TodoProps = {
  todo: TodoType
}

const Todo = ({ todo }: TodoProps) => {
  const [isPending, startTransition] = useTransition()

  return (
    <div
      className={`border border-black/20 cursor-pointer ${
        todo.completed ? 'line-through text-gray-900' : ''
      }`}
      onClick={() => startTransition(() => completeTodo(todo.id))}
    >
      {todo.content}
    </div>
  )
}

export default Todo
