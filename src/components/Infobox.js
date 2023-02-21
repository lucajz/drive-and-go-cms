import React from "react";

const Infobox = ({ icon, title, value, text, bg }) => {
  return (
    <div className="bg-white flex justify-between lg:py-12 lg:px-10 py-6 px-5 rounded-lg shadow-lg border items-center">
      <div className="flex space-x-2 items-center">
        <div className={`${text} px-1 py-1 ${bg} rounded-full border`}>
          {icon}
        </div>
        <h4 className={` lg:text-base font-light`}>{title}</h4>
      </div>
      <p className={`text-lg ${text} font-semibold`}>{value}</p>
    </div>
  );
};

export default Infobox;
