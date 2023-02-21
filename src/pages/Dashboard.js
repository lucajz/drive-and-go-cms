import React, { useEffect } from "react";
import Header from "../components/Header";
import EuroIcon from "@mui/icons-material/Euro";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import Infobox from "../components/Infobox";
import CarCard from "../components/CarCard";
import AddIcon from "@mui/icons-material/Add";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  CALC_TOTAL_CARS,
  CALC_TOTAL_VALUE,
  getCars,
  selectTotalCars,
  selectTotalValue,
} from "../features/car/carSlice";
import useRedirectLoggedOut from "../hooks/useRedirectLoggedOut";
import { getUser } from "../features/auth/authService";
import { SET_USER } from "../features/auth/authSlice";
import HotCar from "../components/HotCar";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

const Dashboard = () => {
  useRedirectLoggedOut("/login");

  const dispatch = useDispatch();
  const { cars, hotCar, isError, isLoading, message } = useSelector(
    (state) => state.car
  );

  const totalValue = useSelector(selectTotalValue);
  const totalCars = useSelector(selectTotalCars);

  useEffect(() => {
    const getUserData = async () => {
      const data = await getUser();
      await dispatch(SET_USER(data));
    };
    getUserData();
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCars());

    if (isError) {
      toast.error(message);
    }
  }, [dispatch, isError, message]);

  useEffect(() => {
    dispatch(CALC_TOTAL_CARS(cars));
    dispatch(CALC_TOTAL_VALUE(cars));
  }, [dispatch, cars]);

  let num = new Intl.NumberFormat("en-RO", {
    style: "currency",
    currency: "EUR",
    maximumSignificantDigits: 3,
  }).format(totalValue);

  return (
    <div className="">
      {isLoading && <Loader />}
      <Header title="Dashboard" />
      <div className="w-11/12 py-6 mx-auto grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-2 lg:gap-y-8">
        <Infobox
          icon={<EuroIcon sx={{ fontSize: 40 }} />}
          title="Valoarea magazinului:"
          value={num}
          text="text-green-600"
          bg="bg-green-100"
        />
        <Infobox
          icon={<DirectionsCarIcon sx={{ fontSize: 40 }} />}
          title="Total masini:"
          value={totalCars}
          text="text-red-600"
          bg="bg-red-100"
        />
        <Infobox
          icon={<WhatshotIcon sx={{ fontSize: 40 }} />}
          title="Hot Car:"
          value={hotCar.marca + " " + hotCar.model + " " + hotCar.an}
          text="text-orange-500"
          bg="bg-orange-100"
        />

        <section className="lg:col-span-2 p-4 bg-gray-50 rounded-lg shadow-lg space-y-2 ">
          <div className="flex justify-between px-2 items-center">
            <h2 className="lg:text-2xl text-lg font-bold">Existing Cars</h2>
            <NavLink
              to="/add-car"
              className="bg-blue-500 w-fit h-10 self-center justify-self-end space-x-2 text-gray-50 px-5 py-1 rounded-lg flex items-center shadow-md active:scale-90 transition-all"
            >
              <AddIcon />
              Add Car
            </NavLink>
          </div>
          <hr className="border border-blue-400" />
          {cars?.map((car, index) => {
            return <CarCard key={index} car={car} />;
          })}
        </section>

        <HotCar />
      </div>
    </div>
  );
};

export default Dashboard;
