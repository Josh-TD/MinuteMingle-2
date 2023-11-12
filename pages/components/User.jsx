import React from "react";
import Image from "next/image";
import * as Popover from "@radix-ui/react-popover";
import { MixerHorizontalIcon, Cross2Icon } from "@radix-ui/react-icons";

export default function User({ user }) {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button
          className="rounded-full w-[60px] h-[60px] inline-flex items-center justify-center text-violet11 bg-black shadow-[0_2px_10px] shadow-blackA4 hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-gray-400 cursor-default outline-none"
          aria-label="Update dimensions"
        >
          {user ? (
            <Image
              src={user.picture}
              alt="user picture"
              width={60}
              height={60}
              className="rounded-full"
            />
          ) : (
            <Image
              src={"/images/blank_profile.png"}
              alt="blank profile"
              width={60}
              height={60}
              className="rounded-full"
            />
          )}
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="rounded p-5 w-[200px] bg-black shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
          sideOffset={5}
        >
          <div className="flex flex-col gap-2.5">
            <a href="/profile" className="text-white text-[15px] leading-[19px] font-medium mb-2.5">
              {user ? "Your Profile" : "No user"}
            </a>
            {user ? (
              <a
                href="/api/auth/logout"
                className="text-white text-[15px] leading-[19px] font-medium hover:underline"
              >
                Logout
              </a>
            ) : (
              <a
                href="/api/auth/login"
                className="text-white text-[15px] leading-[19px] font-medium hover:underline"
              >
                Login
              </a>
            )}
          </div>
          <Popover.Close
            className="rounded-full h-[25px] w-[25px] inline-flex items-center justify-center text-violet11 absolute top-[5px] right-[5px] hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7 outline-none cursor-default"
            aria-label="Close"
          >
            <Cross2Icon />
          </Popover.Close>
          <Popover.Arrow className="fill-white" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
