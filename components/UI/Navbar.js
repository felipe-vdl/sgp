import sgpLogo from "../../assets/logo-sgp.png";
import Image from "next/image";

import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";


import Link from "next/link";
import ThemeToggler from "./ThemeToggler";

export default function Navbar({ bgColor }) {
  const router = useRouter();
  const activeClasses = "text-white";

  const { status } = useSession();

  return (
    <header className={`flex justify-between items-center py-3 px-6 bg-dourado text-white drop-shadow`}>
      <Link href="/" className={`hover:text-orange-100 font-bold text-2xl`}>
        <Image
          src={sgpLogo}
          width={250}
          alt="Mesquita SGP"
          className="drop-shadow w-[190px] sm:w-[230px] md:w-[250px]"
        />
      </Link>
      <ul className="flex gap-6">
        {status === "authenticated" &&
          <>
            <li>
              <button onClick={() => signOut({ callbackUrl: "/login" })} className="hover:text-orange-100 text-2xl font-bold" >LOGOUT</button>
            </li>
          </>
        }
        {status === "unauthenticated" &&
          <>
            <li>
              <Link href="/login" className={`hover:text-orange-100 text-2xl font-bold ${router.pathname === "/login" ? activeClasses : ""}`}>LOGIN</Link>
            </li>
          </>
        }
        <ThemeToggler />
      </ul>
    </header>
  );
}