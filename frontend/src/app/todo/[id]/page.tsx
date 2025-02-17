import { TodoDetailTemplate } from "@/components/templates";
import { getTodo } from "@/actions/api/todoApi";

type TodoDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function TodoDetailPage({ params }: TodoDetailPageProps) {
  const { id } = await params;
  const res = await getTodo({
    id,
  });
  if (!res?.data) {
    return (
      <div>
        {res.errorCode}: {res.errorMessage}
      </div>
    );
  }
  return <TodoDetailTemplate todo={res.data} />;
}
