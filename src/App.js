import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Sidebar from "./components/Sidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddCar from "./pages/AddCar";
import EditCar from "./pages/EditCar";
import axios from "axios";
import Car from "./pages/Car";

axios.defaults.withCredentials = true;

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <Sidebar>
              <Layout>
                <Dashboard />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/add-car"
          element={
            <Sidebar>
              <Layout>
                <AddCar />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/edit-car/:slug"
          element={
            <Sidebar>
              <Layout>
                <EditCar />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/car/:slug"
          element={
            <Sidebar>
              <Layout>
                <Car />
              </Layout>
            </Sidebar>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
