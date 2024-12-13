import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="p-4 bg-gray-100">
      <Link href="/" className="mr-4 text-blue-500">
        Home
      </Link>
      <Link href="/calendar" className="text-blue-500">
        Calendar
      </Link>
    </nav>
  );
}
