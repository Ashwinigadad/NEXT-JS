import { auth, signIn, signOut } from "@/auth";
import { BadgePlus, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="px-5 py-2 bg-orange-100 shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Image src="/LOGONEXT.png" alt="logo" width={40} height={40} />
            <span className="text-black font-bold text-2xl ml-0">Directory</span>
          </Link>
        </div>
        <div className="flex items-center gap-4 text-black">
          {session && session?.user ? (
            <>
              <Link href="/startup/create">
                <span className="max-sm:hidden"></span>
                <BadgePlus/>
              </Link>
              <form
                action={async () => {
                  "use server";
                  await signOut();
                }}
              >
                <button
                  type="submit"
                > 
                <span className="max-sm:hidden">Logout</span>
                  <LogOut className="size-6 sm:hidden text-red-500"/>
                </button>
              </form>
              <Link href={`/user/${session?.id}`}>
               <Avatar className="size-10">
                <AvatarImage src={session?.user?.image || ""}
                alt={session?.user?.name || ""}
                />
                <AvatarFallback>AV</AvatarFallback>
               </Avatar>
                
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <button
                type="submit"
                className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-full"
              >
                Login
              </button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
