"use client";

import { HiOutlineTrash } from "react-icons/hi";

import { useRouter } from "next/navigation";

export default function RemoveToDo({ id }) {
  const router = useRouter();
  const removeTodo = async () => {
    const confirmed = confirm("are you sure ?");
    if (confirmed) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/todos?id=${id}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        router.refresh();
      }
    }
  };

  return (
    <button onClick={removeTodo} className="text-red-400">
      <HiOutlineTrash size={24}></HiOutlineTrash>
    </button>
  );
}
