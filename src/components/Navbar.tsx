import Link from "next/link";
import Image from "next/image";

import { ROOT_PATH, ABOUT_PATH } from "@root/config/routes";

const TAB_INDEX_HAMBURGER_MENU = 0;

export default function Navbar() {
  return (
    <header className="shadow-xs sticky top-0 z-1 bg-base-100">
      <nav className="navbar px-4">
        <div className="navbar-start">
          <Link href={ROOT_PATH}>
            <Image
              src="/logo-vertical-transparent.svg"
              className=""
              width={150}
              height={31.5}
              alt=""
            />
          </Link>
        </div>
        <div className="navbar-end">
          <div className="dropdown dropdown-bottom dropdown-end">
            <div tabIndex={TAB_INDEX_HAMBURGER_MENU} role="button" className="btn btn-ghost px-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </div>

            <ul
              tabIndex={TAB_INDEX_HAMBURGER_MENU}
              className="dropdown-content menu bg-base-100 rounded-box z-1 w-45 p-2 shadow-sm"
            >
              <li>
                <Link href={ROOT_PATH}>TOP</Link>
              </li>
              <li>
                <Link href={ABOUT_PATH}>AIFriendとは</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
