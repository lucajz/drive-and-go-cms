import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { delCar, getCars } from "../features/car/carSlice";
import { NavLink } from "react-router-dom";

const CarCard = ({ car }) => {
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();

  let num = new Intl.NumberFormat("en-RO", {
    style: "currency",
    currency: "EUR",
    maximumSignificantDigits: 3,
  }).format(car.pret);

  const delProduct = async () => {
    await dispatch(delCar(car.slug));
    await dispatch(getCars());
    setModal(false);
  };

  const showTraction = ["FWD", "RWD", "Spate", "Fata"].includes(car.tractiune);

  return (
    <>
      {modal && (
        <div className="fixed left-0 -top-2 bg-[rgba(0,0,0,0.7)] w-screen h-screen flex justify-center items-center">
          <div className="bg-gray-100 lg:w-5/12 w-9/12 h-2/5 p-8 flex flex-col justify-between rounded-lg shadow-2xl">
            <h6 className="font-semibold text-xl ">
              Are you sure you want to delete {car.marca} {car.model}
            </h6>
            <div className="flex justify-between">
              <button
                className="bg-red-500 w-fit h-10 self-center justify-self-end space-x-2 text-gray-50 px-5 py-1 rounded-lg flex items-center shadow-md active:scale-90 transition-all "
                onClick={delProduct}
              >
                Delete
              </button>
              <button
                className="bg-white border-red-500 border w-fit h-10 self-center text-black justify-self-end space-x-2 px-5 py-1 rounded-lg flex items-center shadow-md active:scale-90 transition-all "
                onClick={() => setModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="w-full h-[240px] bg-white rounded-lg shadow-lg py-4 px-4 flex flex-col md:flex-row ">
        <div className="h-10/12 w-full md:w-4/12 border rounded-lg overflow-hidden object-contain shadow-sm">
          {car.imgs.length !== 0 ? (
            <img
              src={car.imgs[0].filePath}
              alt="Car Img"
              className="object-cover h-full w-full"
            />
          ) : (
            <div>
              <h3>No image set for this car</h3>
            </div>
          )}
        </div>
        <div className="pl-4 flex flex-col md:flex-row justify-between pt-2 w-full md:w-8/12 h-full">
          <div className="flex-col space-x-2 ">
            <h2 className="font-semibold md:text-xl text-base">
              {car.marca +
                " " +
                car.model +
                " " +
                (showTraction === false ? car.tractiune : "")}
            </h2>
            <div className="font-light text-xs md:text-sm flex space-x-1">
              <span>{car.an}</span>
              <span>•</span>
              <span>{car.combustibil}</span>
              <span>•</span>
              <span>{car.km} km</span>
              <span>•</span>
              <span>{car.capacitate_cilindrica} cm3</span>
            </div>
            <p className="font-thin text-xs">
              {car.updatedAt === car.createdAt
                ? `Adaugat la ${car.updatedAt.toLocaleString("en-GB")}`
                : `Actualizat la ${car.updatedAt.toLocaleString("en-GB")}`}
            </p>
          </div>
          <div className="flex md:flex-col justify-between pt-4 md:pt-0">
            <h3 className="md:text-2xl  text-lg text-blue-600 font-bold">
              {num}
            </h3>
            <div className="flex space-x-2">
              <NavLink
                to={`/car/${car.slug}`}
                className="shadow-sm border p-1 bg-gray-50 rounded-lg"
              >
                <VisibilityIcon
                  sx={{ fontSize: 30 }}
                  className="text-gray-600  rounded-md cursor-pointer active:scale-95"
                />
              </NavLink>
              <NavLink
                to={`/edit-car/${car.slug}`}
                className="shadow-sm border  p-1 bg-gray-50 rounded-lg"
              >
                <EditIcon
                  sx={{ fontSize: 30 }}
                  className="text-yellow-400 rounded-md cursor-pointer active:scale-95"
                />
              </NavLink>
              <div className="shadow-sm border  p-1 bg-gray-50 rounded-lg">
                <DeleteIcon
                  sx={{ fontSize: 30 }}
                  className="text-red-600 rounded-md cursor-pointer active:scale-95"
                  onClick={() => setModal(true)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CarCard;
