import { newTodo } from '@/utils/actions'

const NewTodoForm = () => {
  return (
    <div>
      <form action={newTodo}>
        <input
          id="content"
          name="content"
          type="text"
          className="border border-black/25"
        />
        <button type="submit">New Todo</button>
      </form>
    </div>
  )
}

export default NewTodoForm
