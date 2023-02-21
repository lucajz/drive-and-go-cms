import React, { useEffect, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { NavLink } from "react-router-dom";

const activeLink = ({ isActive }) =>
  isActive
    ? "bg-blue-600 w-10/12 rounded-md text-white"
    : "w-10/12 rounded-md hover:bg-gray-300";

const SidebarItem = ({ item, isOpen, setIsOpen }) => {
  const [expandMenu, setExpandMenu] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setExpandMenu(false);
    }
  }, [isOpen]);
  useEffect(() => {
    if (expandMenu) {
      setIsOpen(true);
    }
  }, [expandMenu, setIsOpen]);

  if (item.childrens) {
    return (
      <div
        className={`w-10/12 transition-all z-20 ${
          expandMenu
            ? "border-b-4 border-l-2 border-r-2 border-t-[1px] border-blue-400 rounded-xl overflow-hidden shadow-lg"
            : ""
        }`}
        onClick={() => setExpandMenu(!expandMenu)}
      >
        <div
          className={`flex flex-1 p-1 items-center hover:bg-gray-300 rounded-md ${
            isOpen ? "justify-between" : "justify-center"
          }`}
        >
          <div className="flex space-x-2 items-center">
            <div className="">{item.icon}</div>
            {isOpen && <h4 className="text-lg">{item.title}</h4>}
          </div>
          {isOpen && (
            <KeyboardArrowDownIcon
              className={`${expandMenu && "rotate-180 transition-all"}`}
            />
          )}
        </div>
        {expandMenu && (
          <div className=" px-2 py-2 space-y-1 mb-2">
            {item.childrens.map((child, index) => {
              return (
                <div className="ml-4" key={index}>
                  <NavLink to={child.path}>
                    {child.icon && <div>{child.icon}</div>}
                    <div>{child.title}</div>
                  </NavLink>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  } else {
    return (
      <NavLink to={item.path} className={activeLink}>
        <div
          className={`flex space-x-2 p-1 items-center ${
            isOpen ? "justify-start" : "justify-center"
          }`}
        >
          <div>{item.icon}</div>
          {isOpen && <h4 className="text-lg">{item.title}</h4>}
        </div>
      </NavLink>
    );
  }
};
export default SidebarItem;
