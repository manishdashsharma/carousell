import React, { useState } from "react";
import { Button, Modal, Stack } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import "./Header.css";
import Login from "../Login/Login";
import Register from "../Register/Register";
import logo from "../../../src/logo.jpeg";

const Header = () => {
  const [openModal, setOpenModal] = useState(false);
  const [showRegister, setShowRegister] = useState(false); // State for showing Register component

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setShowRegister(false); // Close the Register component when the modal is closed
  };

  const handleRegisterClick = () => {
    setOpenModal(true);
    setShowRegister(true); // Show the Register component
  };

  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="Your Logo" />
      </div>
      <nav className="navigation">
        <ul>
          <li>
            <a href="#electronics">Electronics</a>
            <div className="dropdown">
              <a href="#mobiles">Mobiles</a>
              <a href="#laptops">Laptops</a>
              <a href="#cameras">Cameras</a>
            </div>
          </li>
          <li>
            <a href="#fashion">Fashion</a>
            <div className="dropdown">
              <a href="#clothing">Clothing</a>
              <a href="#footwear">Footwear</a>
              <a href="#accessories">Accessories</a>
            </div>
          </li>
          <li>
            <a href="#luxury">Luxury</a>
            <div className="dropdown">
              <a href="#watches">Watches</a>
              <a href="#jewelry">Jewelry</a>
              <a href="#handbags">Handbags</a>
            </div>
          </li>
          <li>
            <a href="#services">Services</a>
            <div className="dropdown">
              <a href="#plumbing">Plumbing</a>
              <a href="#gardening">Gardening</a>
              <a href="#cleaning">Cleaning</a>
            </div>
          </li>
          <li>
            <a href="#cars">Cars</a>
            <div className="dropdown">
              <a href="#sedans">Sedans</a>
              <a href="#suv">SUVs</a>
              <a href="#hatchback">Hatchbacks</a>
            </div>
          </li>
          <li>
            <a href="#property">Property</a>
            <div className="dropdown">
              <a href="#apartments">Apartments</a>
              <a href="#villas">Villas</a>
              <a href="#land">Land</a>
            </div>
          </li>
        </ul>
      </nav>
      <Stack direction="row" spacing={1}>
        <Button
          variant="contained"
          color="primary"
          style={{
            color: "black",
            border: "none",
            textTransform: "none",
            backgroundColor: "transparent",
            boxShadow: "none",
          }}
          onClick={handleRegisterClick} // Open the Register component on button click
        >
          Register
        </Button>
        <Button
          variant="contained"
          color="primary"
          style={{
            color: "black",
            border: "none",
            textTransform: "none",
            backgroundColor: "transparent",
            boxShadow: "none",
          }}
          onClick={handleOpenModal} // Open the modal on button click
        >
          Login
        </Button>
        <Button
          variant="outlined"
          style={{
            border: "none",
            color: "black",
            borderColor: "white",
            backgroundColor: "red",
            marginRight: "35px",
          }}
        >
          Sell
        </Button>
      </Stack>
      {/* The modal */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
            width: "400px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <div className="logo">
              <img src={logo} alt="Your Logo" style={{ height: "40px" }} />
            </div>
            <Button onClick={handleCloseModal}>
              <CloseIcon />
            </Button>
          </div>
          <hr style={{ border: "1px solid #ccc", margin: "10px 0" }} />{" "}
          {showRegister ? <Register /> : <Login />}
        </div>
      </Modal>
    </header>
  );
};

export default Header;
