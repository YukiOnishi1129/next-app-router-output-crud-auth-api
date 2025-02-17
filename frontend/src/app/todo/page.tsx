import { redirect } from "next/navigation";
import { TodoListTemplate } from "@/components/templates";
import { getTodoList } from "@/actions/api/todoApi";
import { isCheckAuth } from "@/actions/auth";
import { NAVIGATION_LIST } from "@/constants/navigation";

export default async function TodoListPage() {
  const res = await getTodoList();
  const auth = await isCheckAuth();
  if (!auth) {
    redirect(NAVIGATION_LIST.LOGIN);
  }
  if (!res?.data) {
    return (
      <div>
        {res.errorCode}: {res.errorMessage}
      </div>
    );
  }
  return <TodoListTemplate data={res.data.todos} />;
}
