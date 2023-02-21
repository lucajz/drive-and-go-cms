import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import menu from "../data/menu";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import SidebarItem from "./SidebarItem";
import { useDispatch } from "react-redux";
import { logoutUser } from "../features/auth/authService";
import { SET_LOGIN } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () => {
    dispatch(logoutUser);
    dispatch(SET_LOGIN(false));
    navigate("/login");
  };

  // const user = useSelector(selectUser);
  return (
    <div className="flex">
      <div
        className={` ${
          isOpen ? `w-full lg:w-[240px] ` : `w-[64px]`
        } min-h-[100vh] bg-gray-100 transition-all fixed shadow-lg`}
      >
        <div className="min-h-[100vh] flex flex-col ">
          <div
            className={`w-full h-[42px] ${
              isOpen ? "justify-start pl-2" : "justify-center"
            } flex bg-blue-600`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <MenuIcon className="text-gray-200 m-1" fontSize="large" />
          </div>
          <hr />
          <div className="flex-grow bg-gray-100 w-full items-center space-y-1 flex flex-col mt-4">
            {menu.map((item, index) => {
              return (
                <SidebarItem
                  key={index}
                  item={item}
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                />
              );
            })}
          </div>
          <div className=" w-full h-14 flex bg-blue-600 rounded-t-md items-center">
            <div
              className={`flex ${
                isOpen ? "justify-end" : "justify-center"
              } flex w-full mx-3 my-2 space-x-1 items-center`}
            >
              <div className="flex text-center space-x-2 items-center font-thin">
                <h3
                  className={`${
                    isOpen ? "block" : "hidden"
                  } font-light text-sm text-white`}
                >
                  Log Out
                </h3>
              </div>
              <div className={` text-white hover:scale-110 transition-all`}>
                <PowerSettingsNewIcon sx={{ fontSize: 30 }} onClick={logout} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <main
        className={`${
          isOpen ? "ml-[240px]" : "ml-[64px]"
        } transition-all w-full h-full bg-gray-100 min-h-screen`}
      >
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
