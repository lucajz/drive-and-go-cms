import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import { delCar, getCar, getCars, selectCar } from "../features/car/carSlice";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import Description from "../components/Description";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Car = () => {
  const [modal, setModal] = useState(false);
  const { slug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCar(slug));
  }, [dispatch, slug]);
  const car = useSelector(selectCar);

  let pret = new Intl.NumberFormat("en-RO", {
    style: "currency",
    currency: "EUR",
    maximumSignificantDigits: 3,
  }).format(car.pret);

  const delProduct = async () => {
    await dispatch(delCar(car.slug));
    await dispatch(getCars());
    setModal(false);

    navigate("/");
  };

  return (
    <>
      {modal && (
        <div className="fixed left-0 z-20  bg-[rgba(0,0,0,0.7)] w-screen h-screen flex justify-center items-center">
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
      <Header title={car.marca + " " + car.model} />
      <div className="h-full lg:w-11/12 my-4 mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 shadow-lg md:rounded-lg row-span-2 ">
          <Slide>
            {car.imgs?.map((slideImage, index) => (
              <div className="each-slide" key={index}>
                <img src={slideImage.filePath} alt="Car" />
              </div>
            ))}
          </Slide>
        </div>
        <div className="bg-white p-4 shadow-lg md:rounded-lg flex justify-between items-center ">
          <div>
            <h1 className="font-bold text-2xl">
              {car.marca} {car.model}
            </h1>
            <div className="font-light text-xs md:text-sm flex space-x-1">
              <span>{car.an}</span>
              <span>•</span>
              <span>{car.combustibil}</span>
              <span>•</span>
              <span>{car.km} km</span>
              <span>•</span>
              <span>{car.capacitate_cilindrica} cm3</span>
            </div>
          </div>
          <h2 className="text-blue-500 font-semibold text-xl">{pret}</h2>
        </div>
        <div className="bg-white p-4 shadow-lg md:rounded-lg ">
          <h2 className="font-semibold text-xl">Detalii:</h2>
          <hr className="border-t border-blue-500" />
          <table className="border-spacing-4 w-full pt-2">
            <tr>
              <td className="">Marca:</td>
              <td className="text-gray-800 font-light">{car.marca}</td>
            </tr>
            <tr>
              <td className="">Model:</td>
              <td className="text-gray-800 font-light">{car.model}</td>
            </tr>
            <tr>
              <td className="">Caroserie:</td>
              <td className="text-gray-800 font-light">{car.caroserie}</td>
            </tr>
            <tr>
              <td className="">An:</td>
              <td className="text-gray-800 font-light">{car.an}</td>
            </tr>
            <tr>
              <td className="">Capacitate cilindrica:</td>
              <td className="text-gray-800 font-light">
                {car.capacitate_cilindrica} cm3
              </td>
            </tr>
            <tr>
              <td className="">Km:</td>
              <td className="text-gray-800 font-light">{car.km} km</td>
            </tr>
            <tr>
              <td className="">Culoare:</td>
              <td className="text-gray-800 font-light">{car.culoare}</td>
            </tr>
            <tr>
              <td className="">Putere:</td>
              <td className="text-gray-800 font-light">{car.putere}</td>
            </tr>
            <tr>
              <td className="">Cutie:</td>
              <td className="text-gray-800 font-light">{car.cutie}</td>
            </tr>
            <tr>
              <td className="">Tractiune:</td>
              <td className="text-gray-800 font-light">{car.tractiune}</td>
            </tr>
            <tr>
              <td className="">Serie sasiu:</td>
              <td className="text-gray-800 font-light">{car.vin}</td>
            </tr>
          </table>
        </div>
        <div className="bg-white p-4 shadow-lg md:rounded-lg ">
          <h2 className="font-semibold text-xl">Descriere:</h2>
          <hr className="border-t border-blue-500" />
          <Description description={car.descriere} />
        </div>
        <div className="bg-white p-4 shadow-lg md:rounded-lg h-20">
          <div className="flex flex-col md:flex-row space-x-2 justify-evenly space-y-2 items-center">
            <div className="flex space-x-2 text-xl justify-between items-center">
              <h5>Edit car:</h5>
              <div className="shadow-sm border h-10 w-10 p-1 bg-gray-50 rounded-lg">
                <NavLink to={`/edit-car/${car.slug}`}>
                  <EditIcon
                    sx={{ fontSize: 30 }}
                    className="text-yellow-400 rounded-md cursor-pointer active:scale-95"
                  />
                </NavLink>
              </div>
            </div>
            <div className="flex space-x-2 text-xl justify-between items-center">
              <h5>Delete car:</h5>
              <div className="shadow-sm border h-10 w-10 p-1 bg-gray-50 rounded-lg">
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

export default Car;
