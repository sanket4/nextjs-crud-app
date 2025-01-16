import EditTodoForm from "@/components/EditTodoForm";

const getTodobById = async (id) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todos/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch the todo item.");
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching todo by ID:", error);
  }
};

export default async function EditTodo({ params }) {
  const { id } = await params;
  if (!id) {
    return <div>Error: Invalid Todo ID</div>;
  }
  const todoData = await getTodobById(id);
  if (!todoData || !todoData.todo) {
    return <div>Error loading the todo item.</div>;
  }

  const { title, description } = todoData.todo;
  return <EditTodoForm id={id} title={title} description={description} />;
}
