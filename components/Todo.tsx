import { Todo as TodoType } from '@prisma/client'

type TodoProps = {
  todo: TodoType
}

const Todo = ({ todo }: TodoProps) => {
  return <div>{todo.content}</div>
}

export default Todo
