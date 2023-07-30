import React, { useState } from "react";
import { Button, Modal, Stack } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import "./Header.css";
import Login from "../Login/Login";
import Register from "../Register/Register"; // Import the Register component
import logo from "../../../src/logo.jpeg";
import { useLanguage } from "../Language/LanguageContext";

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
        <ul>{/* ... navigation links ... */}</ul>
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
            width: "400px", // Set the fixed width here
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
          {/* Thin line below logo and cross icon */}
          {showRegister ? <Register /> : <Login />}
        </div>
      </Modal>
    </header>
  );
};

export default Header;
