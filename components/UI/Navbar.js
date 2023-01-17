import sgpLogo from "../../assets/logo-sgp.png";
import Image from "next/image";

import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";


import Link from "next/link";

export default function Navbar() {
  const router = useRouter();
  const activeClasses = "text-white";

  const { status } = useSession();

  return (
    <header className="flex py-2 px-24 items-center justify-center px-6 bg-dourado-500 text-dourado-50 shadow shadow-yellow-700/50 border-b">
      <ul className="flex flex-1 justify-between items-center">
        <li>
          <Link href="/" className={`hover:text-orange-100 font-bold text-2xl`}>
            <Image
              src={sgpLogo}
              width={250}
              alt="Mesquita SGP"
              className="drop-shadow-md w-[190px] sm:w-[230px] md:w-[250px]"
            />
          </Link>
        </li>
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
      </ul>
    </header>
  );
}