"use client";

import {
  BookCopy,
  BookMarked,
  BookOpenText,
  GraduationCap,
  Pen,
  PenSquare,
  Pencil,
  PencilLine,
  PencilRuler,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function AcademicInformation({
  paths,
  majors,
}: {
  paths: string;
  majors: boolean;
}) {
  const [shuffled, setShuffled] = useState<JSX.Element[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const classStyle = "font-bold mb-4";

  const classIcons = [
    <BookCopy className={classStyle} color="#000000" />,
    <Pencil className={classStyle} color="#000000" />,
    <PencilLine className={classStyle} color="#000000" />,
    <Pen className={classStyle} color="#000000" />,
    <PencilRuler className={classStyle} color="#000000" />,
    <PenSquare className={classStyle} color="#000000" />,
    <BookOpenText className={classStyle} color="#000000" />,
    <BookMarked className={classStyle} color="#000000" />,
  ];

  useEffect(() => {
    if (loading) {
      const x = [...classIcons].sort(() => 0.5 - Math.random());
      setShuffled(x.slice(0, 5));
      setLoading(false);
    }
  }, [loading]);

  const numClassIcons = classIcons.length;

  return (
    <div className="flex flex-col mr-4">
      <div className="flex inline-flex mb-4">
        <GraduationCap color="#000000" className="mr-2" size={32}/>
        <h2 className="text-2xl text-black">
          Academic {`${majors ? "Major(s)" : "Minor(s)"}`}:
        </h2>
      </div>
      <div className="flex flex-col">
        {paths && paths.split(',').map((path, i) => (
          <div className="flex flex-row inline-flex">
            {shuffled[i % numClassIcons]}
            <h2 className="ml-2 text-2xl text-black">{path}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
