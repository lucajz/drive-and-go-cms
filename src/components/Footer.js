import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";

const Footer = () => {
  return (
    <div className="h-36 w-full bg-gradient-to-t from-blue-600 to-blue-500">
      <div className="h-full w-full flex flex-col justify-center items-center space-y-1">
        <code className="text-gray-200 hover:text-white">
          Designed and developed by _lucajz
          <hr className="border-t border-white w-[100%] mx-auto" />
        </code>
        <div className="text-gray-200 hover:text-white transition-all">
          <a href="https://instagram.com/_lucajz">
            <InstagramIcon />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
