import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container mx-auto p-4 space-y-4">
      <p>Ooops, it seems the page you are looking for does not exist or too shy to show up.</p>
      <Link href="/" className="underline text-blue-500! hover:text-blue-700">
        Try this page instead!
      </Link>
    </div>
  );
}
