import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import "./AddCar.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getCar,
  getCars,
  selectCar,
  updateCar,
} from "../features/car/carSlice";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";

const AddCar = () => {
  const { slug: slugs } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [carImage, setCarImage] = useState(null);
  const [carDescription, setCarDescription] = useState("");
  const editCar = useSelector(selectCar);
  const { isLoading } = useSelector((state) => state.car);
  const [car, setCar] = useState(editCar);

  useEffect(() => {
    dispatch(getCar(slugs));
  }, [dispatch, slugs]);

  useEffect(() => {
    setCar(editCar);

    setCarDescription(editCar.descriere || "");
  }, [editCar]);

  let svin = car?.vin?.slice(-4) ?? "slug";

  let stext =
    car.marca +
    "-" +
    car.model +
    "-" +
    car.an +
    "-" +
    car.putere +
    "-" +
    car.caroserie +
    "-" +
    car.cutie +
    "-" +
    svin;

  const slug = stext
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCar({
      ...car,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setCarImage(e.target.files);
  };

  const saveCar = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("marca", car?.marca);
    formData.append("model", car?.model);
    formData.append("pret", car?.pret);
    formData.append("combustibil", car?.combustibil);
    formData.append("an", car?.an);
    formData.append("capacitate_cilindrica", car?.capacitate_cilindrica);
    formData.append("km", car?.km);
    formData.append("culoare", car?.culoare);
    formData.append("putere", car?.putere);
    formData.append("caroserie", car?.caroserie);
    formData.append("cutie", car?.cutie);
    formData.append("tractiune", car?.tractiune);
    formData.append("vin", car?.vin);
    formData.append("slug", slug);
    formData.append("descriere", carDescription);
    for (let i = 0; i < carImage?.length; i++) {
      formData.append("imgs", carImage[i]);
    }

    await dispatch(updateCar({ slugs, formData }));
    await dispatch(getCars());
    navigate("/");
  };

  return (
    <>
      {isLoading && <Loader />}
      <Header title="Edit Car" />
      <div className="bg-white md:w-5/12 mx-auto py-4 px-3 shadow-xl my-4 rounded-lg h-full">
        <h3 className="text-3xl font-bold pl-2">Car Form</h3>
        <hr className="border border-blue-400 mt-2 mb-4" />
        <form
          id="wrapper"
          className="grid grid-cols-1 md:grid-cols-2 px-2 gap-6"
          onSubmit={saveCar}
        >
          <label className="flex flex-col">
            <p className="text-sm font-light">Marca:</p>
            <input
              className="border rounded-md px-2 py-1 focus:outline-blue-500 placeholder:text-gray-300"
              name="marca"
              type="text"
              placeholder="Mercedes-Benz"
              value={car?.marca}
              onChange={handleInputChange}
            />
          </label>
          <label className="flex flex-col">
            <p className="text-sm font-light">Model:</p>
            <input
              className="border rounded-md px-2 py-1 focus:outline-blue-500 placeholder:text-gray-300"
              name="model"
              type="text"
              placeholder="C300"
              value={car?.model}
              onChange={handleInputChange}
            />
          </label>
          <label className="flex flex-col">
            <p className="text-sm font-light">Pret:</p>
            <input
              className="border rounded-md px-2 py-1 focus:outline-blue-500 placeholder:text-gray-300"
              name="pret"
              type="number"
              placeholder="&euro; 32.000"
              value={car?.pret}
              onChange={handleInputChange}
            />
          </label>
          <label className="flex flex-col">
            <p className="text-sm font-light">Combustibil:</p>
            <select
              className="border rounded-md px-2 py-1"
              name="combustibil"
              value={car?.combustibil}
              onChange={handleInputChange}
            >
              <option value="Benzina">Benzina</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="Hibrid">Hibrid</option>
              <option value="Mild-Hibrid">Mild-Hibrid</option>
            </select>
          </label>
          <label className="flex flex-col">
            <p className="text-sm font-light">An:</p>
            <input
              className="border rounded-md px-2 py-1 focus:outline-blue-500 placeholder:text-gray-300"
              name="an"
              type="number"
              placeholder="2017"
              value={car?.an}
              onChange={handleInputChange}
            />
          </label>
          <label className="flex flex-col">
            <p className="text-sm font-light">Capacitate cilindrica:</p>
            <input
              className="border rounded-md px-2 py-1 focus:outline-blue-500 placeholder:text-gray-300"
              name="capacitate_cilindrica"
              type="number"
              placeholder="2999 cm3"
              value={car?.capacitate_cilindrica}
              onChange={handleInputChange}
            />
          </label>
          <label className="flex flex-col">
            <p className="text-sm font-light">Km:</p>
            <input
              className="border rounded-md px-2 py-1 focus:outline-blue-500 placeholder:text-gray-300"
              name="km"
              type="number"
              placeholder="80.000"
              value={car?.km}
              onChange={handleInputChange}
            />
          </label>
          <label className="flex flex-col">
            <p className="text-sm font-light">Culoare:</p>
            <input
              className="border rounded-md px-2 py-1 focus:outline-blue-500 placeholder:text-gray-300"
              name="culoare"
              type="text"
              placeholder="Alb"
              value={car?.culoare}
              onChange={handleInputChange}
            />
          </label>
          <label className="flex flex-col">
            <p className="text-sm font-light">Putere:</p>
            <input
              className="border rounded-md px-2 py-1 focus:outline-blue-500 placeholder:text-gray-300"
              name="putere"
              type="number"
              placeholder="258 CP"
              value={car?.putere}
              onChange={handleInputChange}
            />
          </label>
          <label className="flex flex-col">
            <p className="text-sm font-light">Cutie</p>
            <select
              className="border rounded-md px-2 py-1 outline-none"
              name="cutie"
              value={car?.cutie}
              onChange={handleInputChange}
            >
              <option value="Manuala">Manuala</option>
              <option value="Automata">Automata</option>
            </select>
          </label>
          <label className="flex flex-col">
            <p className="text-sm font-light">Caroserie</p>
            <select
              className="border rounded-md px-2 py-1 outline-none"
              name="caroserie"
              value={car?.caroserie}
              onChange={handleInputChange}
            >
              <option value="Sedam">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Cabrio">Cabrio</option>
              <option value="Coupe">Coupe</option>
              <option value="Compacta">Compacta</option>
              <option value="Monovolum">Monovolum</option>
              <option value="Masina Mica">Masina Mica</option>
              <option value="Masina De Oras">Masina de oras</option>
              <option value="Combi">Combi</option>
            </select>
          </label>
          <label className="flex flex-col">
            <p className="text-sm font-light">Tractiune:</p>
            <input
              className="border rounded-md px-2 py-1 focus:outline-blue-500 placeholder:text-gray-300"
              name="tractiune"
              type="text"
              placeholder="xDrive"
              value={car?.tractiune}
              onChange={handleInputChange}
            />
          </label>
          <label className="flex flex-col">
            <p className="text-sm font-light">Serie sasiu:</p>
            <input
              className="border rounded-md px-2 py-1 focus:outline-blue-500 placeholder:text-gray-300"
              name="vin"
              type="text"
              placeholder="WBAJC51060R929585"
              value={car?.vin}
              onChange={handleInputChange}
            />
          </label>
          <label className="flex flex-col">
            <p className="text-sm font-light">Slug:</p>
            <input
              className="border rounded-md px-2 py-1 focus:outline-blue-500 placeholder:text-gray-300"
              name="slug"
              type="text"
              placeholder="mercedes-benz-c300-2017-3000cm"
              value={slug}
              onChange={handleInputChange}
            />
          </label>
          <div id="container" className=" md:col-span-2 overflow-auto">
            <label className="flex flex-col ">
              <p className="text-sm font-light">Descriere:</p>
              <ReactQuill
                theme="snow"
                value={carDescription}
                modules={AddCar.modules}
                formats={AddCar.formats}
                placeholder="Descrie masina, dotarile, etc"
                style={{ minHeight: 216 }}
                onChange={setCarDescription}
              />
            </label>
          </div>
          <label className="flex flex-col">
            <p className="text-sm font-light">Incarca imagini:</p>
            <input
              type="file"
              multiple
              className="border rounded-md px-2 py-1"
              onChange={(e) => handleImageChange(e)}
            />
          </label>
          <button
            type="submit"
            className="bg-blue-500 w-fit h-10 self-center justify-self-end space-x-2 text-gray-50 px-5 py-1 rounded-lg flex items-center shadow-md active:scale-90 transition-all"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

AddCar.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
};
AddCar.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "video",
  "image",
  "code-block",
  "align",
];

export default AddCar;
