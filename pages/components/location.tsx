import Image from "next/image";

export default function LocationInformation({
  isOnCampus,
  residentialArea,
}: {
  isOnCampus: boolean;
  residentialArea: string;
}) {
  const residentialPaths = [
    "/images/residential/off_campus.jpg",
    "/images/residential/central.jpg",
    "/images/residential/northeast.jpg",
    "/images/residential/southwest.jpg",
    "/images/residential/north.jpg",
    "/images/residential/orchard_hill.jpg",
  ];
  const findCampusLocation = () => {
    if (!isOnCampus) {
      return residentialPaths[0];
    } else {
      if (residentialArea == "central") {
        return residentialPaths[1];
      } else if (residentialArea == "northeast") {
        return residentialPaths[2];
      } else if (residentialArea == "southwest") {
        return residentialPaths[3];
      } else if (residentialArea == "north") {
        return residentialPaths[4];
      } else if (residentialArea == "orchard_hill") {
        return residentialPaths[5];
      } else {
        return residentialPaths[0];
      }
    }
  };
  return (
    <>
      <Image
        src={findCampusLocation()}
        alt="Residential Area"
        width={800}
        height={800}
        className="shadow-lg rounded-lg shadow-gray-400"
      />
    </>
  );
}
