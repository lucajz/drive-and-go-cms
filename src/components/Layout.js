import React from "react";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <>
      <div className="">{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
