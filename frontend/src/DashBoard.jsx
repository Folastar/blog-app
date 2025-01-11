import {useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { AppContext } from "./context/AppContext";

const DashBoard = () => {
  const [divIndex, setDivIndex] = useState(0);
  const navigate= useNavigate()
  // const {dispatch} =useContext(AppContext) 
  const divInfo = [
    {
      heading: "Discover the Secrets of Healthy Living",
      paragraph:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum.",
      button: "Read more",
      image: "/assets/pexels-haleyve-2087391.jpg",
      alt: "Healthy lifestyle image",
    },
    {
      heading: "Tech Innovations to Watch in 2024",
      paragraph:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
      button: "Read more",
      image: "/assets/pexels-mastercowley-1153369.jpg",
      alt: "Technology image",
    },
    {
      heading: "Travel the World on a Budget",
      paragraph:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      button: "Read more",
      image: "/assets/pexels-andrew-3178818.jpg",
      alt: "Travel image",
    },
    // {
    //     heading: "Master the Art of Cooking with Ease",
    //     paragraph: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    //     button: "Read more",
    //     image: "",
    //     alt: "Cooking image"
    // }
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setDivIndex((prevIndex) => (prevIndex + 1) % divInfo.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [divIndex, divInfo.length, setDivIndex]);
  return (
    <>
      <div
        className="transition-all duration-500 ease-in-out h-screen w-full  text-white text-center px-3 relative z-10"
        style={{
          backgroundImage: `url(${divInfo[divIndex].image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="w-full h-full bg-black/20 flex justify-center items-center flex-col">
          <h1 className="font-tangerine font-bold text-cyan-500 text-7xl mb-5 ">
            {divInfo[divIndex].heading}
          </h1>
          <p className="w-1/2">{divInfo[divIndex].paragraph}</p>
          <button onClick={()=> navigate("/blogs")} className="border border-cyan-500 text-cyan-500 py-2 px-5 rounded-md text-lg mt-5 transition-all duration-200 ease-linear hover:bg-cyan-500 hover:text-white">
            {divInfo[divIndex].button}
          </button>
        </div>

        <button onClick={()=>{dispatch({type:"Add"})}}>
            Add
        </button>
      </div>
    </>
  );
};

export default DashBoard;
