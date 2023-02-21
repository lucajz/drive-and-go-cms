import React, { useState } from "react";
import LoginIcon from "@mui/icons-material/Login";
import { loginUser } from "../features/auth/authService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SET_LOGIN, SET_USER } from "../features/auth/authSlice";
import Loader from "../components/Loader";

const initialState = {
  email: null,
  password: null,
};
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.car.isLoading);
  const [credentials, setCredentials] = useState(initialState);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(credentials);
      dispatch(SET_USER(data));
      dispatch(SET_LOGIN(true));
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="bg-gradient-to-b from-[#00B4DB] to-[#0083B0] min-h-screen w-full flex justify-center items-center">
        <div className="w-9/12 h-4/6 bg-gray-50 p-5 space-y-3 rounded-lg shadow-lg md:w-3/6 lg:w-3/12">
          <div className="flex justify-center text-[#0083B0] font-semibold text-2xl space-x-2">
            <h2>Login </h2>
            <LoginIcon sx={{ fontSize: 35 }} />
          </div>
          <hr className="border-b border-[#0083B0]" />

          <form onSubmit={login} className="flex flex-col space-y-2">
            <input
              name="email"
              type="text"
              className="border-b w-11/12 mx-auto rounded-sm outline-none pl-2 font-semibold"
              placeholder="Email"
              onChange={handleInputChange}
            />
            <input
              name="password"
              type="password"
              className="border-b w-11/12 mx-auto rounded-sm outline-none pl-2 font-semibold"
              placeholder="Password"
              onChange={handleInputChange}
            />
            <button className="bg-[#0083B0] py-1 w-5/6 mx-auto rounded-2xl text-white font-semibold">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
