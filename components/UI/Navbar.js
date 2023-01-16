import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import Link from "next/link";

export default function Navbar() {
  const router = useRouter();
  const activeClasses = "text-white";

  const { status } = useSession();

  return (
    <ul className="flex flex-1 justify-between items-center">
      <li>
        <Link href="/" className={`hover:text-dourado-50 font-bold text-2xl ${router.pathname === "/" ? activeClasses : ""}`}>SGP</Link>
      </li>
      {status === "authenticated" &&
        <>
        </>
      }
      {status === "unauthenticated" &&
        <>
          <li>
            <Link href="/login" className={`hover:text-dourado-50 font-bold ${router.pathname === "/login" ? activeClasses : ""}`}>Login</Link>
          </li>
        </>
      }
    </ul>
  );
}