import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import logoImg from "@/assets/logo.png";

import NavLink from "./nav-link";

export default function MainHeader() {
  return (
    <>
      <nav className="flex items-center justify-between flex-wrap bg-teal p-6 bg-white shadow-lg">
        <div className="flex items-center flex-no-shrink text-white mr-6">
          <Link href="/">
            <Image
              src={logoImg}
              alt="a logo image : apple"
              priority
              className="object-cover h-10 w-10"
            />
          </Link>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow">
            <a
              href="#responsive-header"
              className="block mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white mr-4"
            >
              <p className="font-poppins text-gray-500 text-xl" >Docs</p>
            </a>
            <a
              href="#responsive-header"
              className="block mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white mr-4"
            >
               <p className="font-poppins text-gray-500 text-xl" >Examples</p>
            </a>
            <a
              href="/memo"
              className="block mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white"
            >
               <p className="font-poppins text-gray-500 text-xl" >Memo</p>
            </a>
          </div>
          <div>
            <a
              href="/login"
              className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal hover:bg-white mt-4 lg:mt-0"
            >
               <button type='button'
                        className="text-white bg-[#007bff] hover:bg-blue-600 font-semibold rounded-md text-xm px-7 py-2.5 w-full">Login</button>
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
