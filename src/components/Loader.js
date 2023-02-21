import React from "react";
import loaderImg from "../assets/Spinner.gif";
const Loader = () => {
  return (
    <div className="fixed left-0 z-20  bg-[rgba(0,0,0,0.7)] w-screen h-screen flex justify-center items-center">
      <img src={loaderImg} alt="Loader" />
    </div>
  );
};

export default Loader;
