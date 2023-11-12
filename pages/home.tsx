"use client";

import clientPromise from "../lib/mongodb";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import RightArrow from "./components/RightArrow";
import { useEffect, useState } from "react";
import Image from "next/image";
import { maleImages, femaleImages } from "../data/imagePaths";
import { useUser } from "@auth0/nextjs-auth0/client";
import FilterDropdown from "../pages/components/FilterDropdown";

type ConnectionStatus = {
  isConnected: boolean;
};

export const getServerSideProps: GetServerSideProps<
  ConnectionStatus
> = async () => {
  try {
    await clientPromise;
    // `await clientPromise` will use the default database passed in the MONGODB_URI
    // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
    //
    // `const client = await clientPromise`
    // `const db = client.db("myDatabase")`
    //
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands

    return {
      props: { isConnected: true },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
};

export default function Home({
  isConnected,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [person, setPerson] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [picture, setPicture] = useState<string>("/images/happy_guy.jpg");
  const { user, error, isLoading } = useUser();

  console.log(user)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await fetch("/api/randomUser");
      const json = await res.json();
      setPerson(json);
      setLoading(false);
      if (person && person.basicInfo.gender == "Male")
        setPicture(maleImages[Math.floor(Math.random() * maleImages.length)]);
      else if (person && person.basicInfo.gender == "Female")
        setPicture(
          femaleImages[Math.floor(Math.random() * femaleImages.length)]
        );
    };
    fetchData();
  }, []);

  let sendMatch = () => {
    fetch("http://localhost:3000/api/addMatch", {
      method: "POST",
      body: JSON.stringify({
        sender: "jocelynbot",
        receiver:person.contactInfo.email,
        senderInfo:"stuff",
        receiverInfo:"stuff"
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
    alert("You sent a match")
  }

  return (
    <div className="relative w-full h-full">
      <div className="absolute top-1/2 -translate-y-[50%] right-[10%]">
        <RightArrow
          person={person}
          setPerson={setPerson}
          setPicture={setPicture}
        />
      </div>

      <div className="bg-gray-200">
        <div className="flex flex-col justify-center mx-auto mt-10 w-1/2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <h5 className="p-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {person && person.basicInfo.firstName}{" "}
            {person && person.basicInfo.lastName},{" "}
            {person && person.basicInfo.age}
          </h5>
          <Image
            src={picture}
            alt="picture of a person"
            id="profilePic"
            width={2000}
            height={2000}
            className="rounded-t-lg transition duration-500 w-[70%] h-auto p-4 mx-auto"
          />

          <div className="p-5">
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Major(s): {person && person.academicInfo.majors}
            </p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Minor(s): {person && person.academicInfo.minors}
            </p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Courses: {person && person.academicInfo.classes}
            </p>
          </div>
          <div className = "absolute top-[25px] left-12">
            <FilterDropdown />
          </div>
          <div className="flex mb-4 justify-center">
            <a
              href="#"
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-center text-black bg-gray-200 rounded-lg hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-400 dark:text-white dark:bg-black dark:hover:bg-gray-500 dark:focus:ring-gray-600"
              onClick={sendMatch}
            >
              Become Study Buddies with {person && person.basicInfo.firstName}!
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
