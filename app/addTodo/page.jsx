"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddTodo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      alert("title and description are required.");
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/todos`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });
      if (res.ok) {
        router.push("/");
      } else {
        throw new Error("failed to create a todo");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <input
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        type="text"
        placeholder="todo title"
        className="border border-slate-400 px-8 py-2 rounded-lg"
      />
      <input
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        type="text"
        placeholder="todo description"
        className="border border-slate-400 px-8 py-2 rounded-lg"
      />
      <button
        type="submit"
        className="bg-green-500 rounded-lg font-bold text-white py-3 px-6 w-fit"
      >
        Add Todo
      </button>
    </form>
  );
}
