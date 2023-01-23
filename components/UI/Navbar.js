import sgpLogo from "../../assets/logo-sgp.png";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import ThemeToggler from "./ThemeToggler";

export default function Navbar() {
  const { status } = useSession();

  return (
    <header className={`flex justify-between items-center py-3 px-6 bg-dourado text-white text-2xl font-bold z-10 shadow shadow-black/30`}>
      <Link href="/">
        <Image
          src={sgpLogo}
          width={250}
          alt="Mesquita SGP"
          className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)] w-[190px] sm:w-[230px] md:w-[250px]"
        />
      </Link>
      <ul className="flex gap-6">
        {status === "authenticated" &&
          <>
            <li>
              <button onClick={() => signOut({ callbackUrl: "/login" })}>LOGOUT</button>
            </li>
          </>
        }
        {status === "unauthenticated" &&
          <>
            <li>
              <Link href="/login">LOGIN</Link>
            </li>
          </>
        }
        <ThemeToggler />
      </ul>
    </header>
  );
}