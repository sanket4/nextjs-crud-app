import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="flex justify-between items-center bg-blue-500 px-8 py-4 rounded-lg text-white font-bold">
      <Link href={"/"}>To Do Application</Link>
      <Link
        className="hover:bg-slate-600 rounded-lg px-3 py-2"
        href={"/addTodo"}
      >
        Add Todo
      </Link>
    </nav>
  );
}
