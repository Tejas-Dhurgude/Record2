import React, { useRef, useEffect } from "react";
import "./Home.css";
import backgroundvdo from "./backgroundvdo.mp4";
import Navbar from "../../Navbar/Navbar";
import { Link } from "react-router-dom";

function Home() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener("loadedmetadata", () => {
        videoRef.current.currentTime = 20;
        videoRef.current.play();
        setTimeout(() => {
          videoRef.current.pause();
          videoRef.current.currentTime = 40;
        }, 9999);
        // 10000
      });
    }
  }, []);

  return (
    <>
      <Navbar />
      <Link to={"/report"}>
        <button>See Report</button>
      </Link>
      <Link to={"/input"}>
        <button>Input</button>
      </Link>
    </>
  );
}

export default Home;
