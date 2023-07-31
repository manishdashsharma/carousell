// GlobalLoader.js
import React from "react";
import { CircularProgress } from "@mui/material";

const GlobalLoader = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "rgba(0, 0, 0, 0.5)", // Optional: Adds a semi-transparent background
        zIndex: 9999, // Optional: Adjust the z-index value to position the loader appropriately
      }}
    >
      <CircularProgress />
    </div>
  );
};

export default GlobalLoader;
