import sgpLogo from "../../assets/logo-sgp.png";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import ThemeToggler from "./ThemeToggler";

export default function Navbar() {
  const { data, status } = useSession();

  return (
    <header className={`flex justify-between items-center px-6 bg-dourado text-white text-2xl font-bold z-10 shadow shadow-black/30`}>
      <Link href="/">
        <Image
          src={sgpLogo}
          width={250}
          alt="Mesquita SGP"
          className="py-3 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)] w-[190px] sm:w-[230px] md:w-[250px]"
        />
      </Link>
      <ul className="flex gap-6 relative self-stretch items-center">
        {status === "unauthenticated" &&
          <>
            <li>
              <Link href="/login">LOGIN</Link>
            </li>
          </>
        }
        <ThemeToggler />
        {status === "authenticated" &&
          <>
            <div className="peer self-stretch flex items-center">
              <button className="bg-roxo px-4 py-2 rounded-full text-4xl">{data.user.name.charAt(0)}</button>
            </div>
            <div className="p-3 w-[8rem] absolute left-[-1.2rem] border border-t-0 dark:border-dark-500 shadow shadow-black/30 z-10 top-[5.45rem] sm:top-[6.25rem] md:top-[6.7rem] text-base hidden peer-hover:flex hover:flex flex-col items-end text-light-50 bg-light-500 dark:bg-dark-500 dark:text-dark-50">
              <Link href="/changepassword">Alterar Senha</Link>
              <button onClick={() => signOut({ callbackUrl: "/login" })}>Sair</button>
            </div>
          </>
        }
      </ul>
    </header>
  );
}