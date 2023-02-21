import React, { useEffect, useState } from "react";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import { useDispatch, useSelector } from "react-redux";
import { getHotCar, patchHotCar } from "../features/car/carSlice";

const HotCar = () => {
  const dispatch = useDispatch();
  const [pHotCar, setPHotCar] = useState();
  const hotCar = useSelector((state) => state.car.hotCar);
  const { cars } = useSelector((state) => state.car);
  useEffect(() => {
    dispatch(getHotCar());
  }, [dispatch]);

  const uploadHotCar = async () => {
    await dispatch(patchHotCar(pHotCar));
  };
  return (
    <section className="bg-white h-fit rounded-lg shadow-lg row-start-4 lg:row-start-auto">
      <div className="p-4">
        <div className="text-orange-500 flex items-center">
          <WhatshotIcon sx={{ fontSize: 40 }} />
          <h3 className="font-bold text-2xl">Hot Car</h3>
        </div>
        <div className="rounded-lg border mx-5 mt-4">
          {hotCar && hotCar.imgs ? (
            <img
              src={hotCar?.imgs[0].filePath}
              alt="Hot Car"
              className="rounded-lg"
            />
          ) : (
            <p>Please select a hotcar</p>
          )}
        </div>
        <div className="flex flex-col lg:flex-row space-x-3 md:space-y-0 space-y-3 justify-between px-5 py-2">
          <select
            className="border rounded-md px-2 py-1 flex-1 text-sm outline-none"
            onClick={(e) => setPHotCar(e.target.value)}
          >
            {cars?.map((car, index) => {
              return (
                <option key={index} value={car.slug}>
                  {car.marca} {car.model} {car.motorizare} {car.an}
                </option>
              );
            })}
          </select>
          <button
            type="submit"
            className="bg-blue-500 w-fit h-10 self-center justify-self-end space-x-2 text-gray-50 px-5 py-1 rounded-lg flex items-center shadow-md active:scale-90 transition-all "
            onClick={uploadHotCar}
          >
            Save
          </button>
        </div>
      </div>
    </section>
  );
};

export default HotCar;
