import React from "react";
import DOMPurify from "dompurify";
import "./Description.css";

const Description = ({ description }) => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(description),
      }}
      className="pt-2"
    ></div>
  );
};

export default Description;
