import { maleImages, femaleImages } from "../../data/imagePaths";

export default function RightArrow({ person, setPerson, setPicture }) {
  const swipe = async () => {
    const res = await fetch("/api/randomUser");
    const json = await res.json();
    setPerson(json);
    const profilePic = document.querySelector("#profilePic");
    profilePic.style.transform = "translateX(100%)";
    profilePic.style.opacity = 0;
    setTimeout(() => {
      profilePic.style.transform = "translateX(0%)";
    }, 500);
    setTimeout(() => {
      profilePic.style.opacity = 1;
      if (person.basicInfo.gender == "Male")
        setPicture(maleImages[Math.floor(Math.random() * maleImages.length)]);
      else
        setPicture(
          femaleImages[Math.floor(Math.random() * femaleImages.length)]
        );
    }, 750);
    console.log(person.basicInfo.gender);
  };
  return (
    <button id="RightArrow" onClick={() => swipe()}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1}
        stroke="currentColor"
        style={{ width: "4rem", height: "4rem" }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </button>
  );
}
