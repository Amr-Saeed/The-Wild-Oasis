import Link from "next/link";
import { auth } from "@/app/_lib/auth";

export default async function Navigation() {

  //! this makes this as a dynamic route because this auth working with cookies and headers so this auth function needs to read the cookies from the incoming request
  //! and reading cookies switch the route to dynamic because cookies are none at runtime not at build time

  const session = await auth();

  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li>
          <Link href="/cabins" className="hover:text-accent-400 transition-colors">
            Cabins
          </Link>
        </li>
        <li>
          <Link href="/about" className="hover:text-accent-400 transition-colors">
            About
          </Link>
        </li>
        <li>
          {session?.user?.image ? (
            <Link href="/account" className="hover:text-accent-400 transition-colors flex items-center justify-center gap-2">
              <img
                referrerPolicy="no-referrer"
                className="h-8 w-8 rounded-full object-cover"
                src={session.user.image}
                alt={session.user.name || "User Profile"}
              />
              <span>Guest Area</span>
            </Link>
          ) : (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors"
            >
              Guest area
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
