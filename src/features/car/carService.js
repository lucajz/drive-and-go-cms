import axios from "axios";

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// Create New Product
const createCar = async (formData) => {
  const response = await axios.post(`${BACKEND_URL}/api/cars`, formData);
  return response.data;
};

// Get cars
const getCars = async () => {
  const response = await axios.get(`${BACKEND_URL}/api/cars`);
  return response.data;
};

// Get car
const getCar = async (slug) => {
  const response = await axios.get(`${BACKEND_URL}/api/cars/${slug}`);
  return response.data;
};

// Delete Car
const deleteCar = async (slug) => {
  const response = await axios.delete(`${BACKEND_URL}/api/cars/${slug}`);
  return response.data;
};

// Update Car
const updateCar = async (slug, formData) => {
  const response = await axios.patch(
    `${BACKEND_URL}/api/cars/${slug}`,
    formData
  );
  return response.data;
};

// Patch Hot Car
const patchHotCar = async (slug) => {
  const response = await axios.patch(`${BACKEND_URL}/api/hotcar/${slug}`);
  return response.data;
};

// Get Hot Car
const getHotCar = async () => {
  const response = await axios.get(`${BACKEND_URL}/api/hotcar`);
  return response.data;
};

const carService = {
  createCar,
  getCars,
  deleteCar,
  getCar,
  patchHotCar,
  getHotCar,
  updateCar,
};

export default carService;
