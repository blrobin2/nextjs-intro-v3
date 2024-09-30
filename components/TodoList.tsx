import { Todo as TodoType } from '@prisma/client'
import Todo from './Todo'

type TodoListProps = {
  todos: TodoType[]
}

const TodoList = ({ todos }: TodoListProps) => {
  return (
    <div>
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </div>
  )
}

export default TodoList
