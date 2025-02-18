import { redirect } from "next/navigation";
import { TodoListTemplate } from "@/components/templates";
import { getTodoList } from "@/actions/api/todoApi";
import { NAVIGATION_LIST } from "@/constants/navigation";

import { auth } from "@/auth/auth";

export default async function TodoListPage() {
  const session = await auth();
  if (!session?.user) {
    redirect(NAVIGATION_LIST.LOGIN);
  }
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
