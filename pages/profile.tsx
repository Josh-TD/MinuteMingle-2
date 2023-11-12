"use client";

import Image from "next/image";
import { Mail, PhoneOutgoing } from "lucide-react";
import AcademicInformation from "./components/academic";
import ScrollAreaItem from "./components/scroll";
import React, { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Profile() {
  const { user, error, isLoading } = useUser();

  const [matches, setMatches] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [majors, setMajors] = useState("");
  const [minors, setMinors] = useState("");
  const [classes, setClasses] = useState("");

  useEffect(() => {
    if (user) {
      console.log('email', user.email)
      // fetch("http://localhost:3000/api/getMatches", {
      //   method: "POST",
      //   body: JSON.stringify({
      //     username: user?.email,
      //   }),
      //   headers: {
      //     "Content-type": "application/json",
      //   },
      // })
      //   .then((response) => {
      //     if (!response.ok) {
      //       throw new Error("Network response was not ok"); // TODO: Handle this error
      //     }
      //     return response.json();
      //   })
      //   .then((data) => {
      //     setMatches(data.toString());
      //   })
      //   .catch((error) => {
      //     console.error("Error:", error);
      //   });

      
        fetch("/api/getUserInfo", {
        method: "POST",
        body: JSON.stringify({
          username: user.email as string,
        }),
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            setFirstName(data.basicInfo.firstName);
            setLastName(data.basicInfo.lastName);
            setAge(data.basicInfo.age);
            setEmail(data.contactInfo.email);
            setPhoneNumber(data.contactInfo.phoneNumber);
            setMajors(data.academicInfo.majors);
            setMinors(data.academicInfo.minors);
            setClasses(data.academicInfo.classes);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [user]);

  return (
    <main className="p-8 bg-gray-100">
      <div className="grid grid-cols-3 mb-8">
        <div className="flex flex-col col-span-1">
          <h2 className="text-4xl font-bold mb-4 text-black">
            {firstName} {lastName}, {age}
          </h2>
          <h3 className="text-2xl text-black font-semibold inline-flex items-center">
            <Mail className="mr-2" />{" "}
            <a href={`mailto:${email}`} className="hover:underline">
              {email}
            </a>
          </h3>
          <h3 className="text-2xl text-black font-light inline-flex items-center">
            <PhoneOutgoing className="mr-2" />{" "}
            <a href={`tel:${phoneNumber}`} className="hover:underline">
              {phoneNumber}
            </a>
          </h3>
          <h2 className="text-2xl text-black font-bold mb-4">
            Matches: {matches}
          </h2>
        </div>
        <div className="col-span-2">
          <Image
            src={"/images/honors.jpg"}
            alt="Residential Area"
            width={800}
            height={800}
            priority={true}
            className="shadow-lg rounded-lg shadow-gray-400"
          />
        </div>
      </div>
      <div className="grid grid-cols-3">
        <div className="flex col-span-2">
          <AcademicInformation paths={majors} majors={true} />
          <AcademicInformation paths={minors} majors={false} />
        </div>
        <div className="flex col-span-1">
          <ScrollAreaItem classes={classes} />
        </div>
      </div>
    </main>
  );
}
