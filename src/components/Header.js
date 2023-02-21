import React from "react";

const Header = ({ title }) => {
  return (
    <header className="w-full h-[42px] bg-blue-600 ">
      <div className="w-11/12 h-full mx-auto my-auto  flex justify-center md:justify-start ">
        <h3 className="text-3xl font-bold text-white tracking-widertext-">
          {title}
        </h3>
      </div>
    </header>
  );
};

export default Header;
