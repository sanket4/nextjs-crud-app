import Link from "next/link";
import RemoveToDo from "./RemoveToDo";
import { HiPencilAlt } from "react-icons/hi";

const getTodoList = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todos`, {
      cache: "no-store", // Prevent stale data by skipping cache
    });

    if (!res.ok) {
      throw new Error("Failed to fetch todos");
    }
    return res.json(); // Return the response as JSON
  } catch (error) {
    console.log("Error Loading todos", error);
    return { todoList: [] }; // Return an empty list in case of error
  }
};

export default async function ToDoList() {
  const { todoList } = await getTodoList();

  return (
    <div>
      {todoList && todoList.length > 0 ? (
        todoList.map((t) => (
          <div
            key={t._id}
            className="p-4 border rounded-lg border-slate-300 my-3 gap-5 flex justify-between items-start"
          >
            <div>
              <h2 className="font-bold">{t.title}</h2>
              <div>{t.description}</div>
            </div>
            <div className="flex gap-2">
              <RemoveToDo id={t._id} /> {/* Pass the ID to RemoveToDo */}
              <Link href={`/editTodo/${t._id}`}>
                <HiPencilAlt size={24}></HiPencilAlt>
              </Link>
            </div>
          </div>
        ))
      ) : (
        <p>No todos found.</p>
      )}
    </div>
  );
}
