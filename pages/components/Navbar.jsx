import Image from "next/image";
import User from "./user";
import { Home } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="flex top-0 w-full h-[100px] bg-white grid grid-cols-3 grid-rows-1">
      <div className="flex justify-center items-center p-4">
        <h1 className="text-black text-4xl">
          <span className="flex inline-flex items-center">
            <a href="/">
              <Home size={30} color="#881c1c" />
            </a>{" "}
            <i>MinuteMingle</i>
          </span>
        </h1>
      </div>
      <div className="flex justify-center items-center">
        <Image
          src={"/images/umass_logo.png"}
          alt="umass logo"
          width={70}
          height={70}
          priority={true}
          className=""
        />
      </div>
      <User />
    </nav>
  );
}
