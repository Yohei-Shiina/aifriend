import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <header className="relative shadow-xs">
      <nav className="navbar">
        <Link href="/">
          <Image
            src="/logo-vertical-transparent.svg"
            className="ml-2"
            width={150}
            height={31.5}
            alt=""
          />
        </Link>
      </nav>
    </header>
  );
}
