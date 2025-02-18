import { TodoListTemplate } from "@/components/templates";
import { getTodoList } from "@/actions/api/todoApi";

export default async function TodoListPage() {
  const res = await getTodoList();
  if (!res?.data) {
    return (
      <div>
        {res.errorCode}: {res.errorMessage}
      </div>
    );
  }
  return <TodoListTemplate data={res.data.todos} />;
}
