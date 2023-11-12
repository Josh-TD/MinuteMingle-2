import {
  Mail,
  PhoneOutgoing,
  GraduationCap,
  BookCopy,
  Pencil,
  PencilLine,
  Pen,
  PencilRuler,
  PenSquare,
  BookOpenText,
  BookMarked,
} from "lucide-react";
import Image from "next/image";
import AcademicInformation from "./components/academic";

const getRandomInteger = (n: number) => {
  return Math.floor(Math.random() * n);
};

export default function Profile() {
  const firstName = "John";
  const lastName = "Billybob";
  const age = 20;
  const gender = "male";
  const email = "johnbob@umass.edu";
  const phoneNumber = "(123)-456-7890";
  const onCampus = true;
  const residentialArea = "Honors College";
  const majors = ["Computer Science", "Informatics"];
  const minors = ["Philosophy", "Mathematics"];
  const year = "Junior";
  const interests = ["sports", "music", "food"];
  const bio = "I am a student at UMass Amherst";

  return (
    <main className="p-8 bg-black">
      <div className="grid grid-cols-3 mb-8">
        <div className="flex flex-col col-span-1">
          <h2 className="text-4xl font-bold mb-4">
            {firstName} {lastName}, {age}
          </h2>
          <h3 className="text-2xl font-semibold inline-flex items-center">
            <Mail className="mr-2 " />{" "}
            <a href={`mailto:${email}`} className="hover:underline">
              {email}
            </a>
          </h3>
          <h3 className="text-2xl font-light inline-flex items-center">
            <PhoneOutgoing className="mr-2" />{" "}
            <a href={`tel:${phoneNumber}`} className="hover:underline">
              {phoneNumber}
            </a>
          </h3>
        </div>
        <div className="col-span-2">
          <Image
            src={"/images/honors.jpg"}
            alt="Residential Area"
            width={800}
            height={800}
            priority={true}
          />
        </div>
      </div>
      <div className="grid grid-cols-3">
        <div className="flex col-span-2">
          <AcademicInformation paths={majors} />
          <AcademicInformation paths={minors} />
          
        </div>
        <div className="col-span-1"></div>
      </div>
    </main>
  );
}
