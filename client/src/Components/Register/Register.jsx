import React, { useState } from "react";
import {
  Button,
  Typography,
  TextField,
  MenuItem,
  Snackbar,
  LinearProgress,
} from "@mui/material";
import { Email, Facebook } from "@mui/icons-material";
import { SIGNUP_URL } from "../../api";
import GlobalLoader from "../GlobalLoader/GlobalLoader";

const Register = ({ onClose }) => {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [city, setCity] = useState("EGYPT");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [progressLoaderOpen, setProgressLoaderOpen] = useState(false);

  const handleEmailButtonClick = () => {
    setShowEmailForm(true);
  };

  const handleRegister = async () => {
    try {
      setProgressLoaderOpen(true);

      const response = await fetch(SIGNUP_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          city,
          email,
          password,
          phoneNumber,
          name,
        }),
      });

      setProgressLoaderOpen(false);

      if (!response.ok) {
        const data = await response.json();
        setErrorMessage(data.message);
        setErrorSnackbarOpen(true);
        return;
      }

      const data = await response.json();
      console.log("API response data:", data);

      onClose();
    } catch (error) {
      setProgressLoaderOpen(false);
      console.error("API error:", error);
      console.error("Ok", error);
    }
  };

  const handleMoreOptionsClick = () => {
    setShowEmailForm(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister();
  };

  const handleSnackbarClose = () => {
    setErrorSnackbarOpen(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h5" component="h2" style={{ margin: "20px 0" }}>
        Create Account
      </Typography>
      {!showEmailForm ? (
        <>
          <Button
            variant="outlined"
            color="primary"
            style={{
              marginTop: "10px",
              width: "100%",
              justifyContent: "flex-start",
              display: "flex",
              alignItems: "center",
            }}
            startIcon={<Email />}
            onClick={handleEmailButtonClick}
          >
            <span style={{ flex: 1, textAlign: "center" }}>Email</span>
          </Button>
          <Button
            variant="outlined"
            color="primary"
            style={{
              marginTop: "10px",
              width: "100%",
              borderColor: "#1877F2",
              color: "#1877F2",
              justifyContent: "flex-start",
              display: "flex",
              alignItems: "center",
            }}
            startIcon={<Facebook />}
          >
            <span style={{ flex: 1, textAlign: "center" }}>Facebook</span>
          </Button>
          <div style={{ overflow: "hidden" }}>
            <Typography
              variant="body2"
              style={{
                margin: "10px 0",
                textAlign: "center",
                whiteSpace: "nowrap",
              }}
            >
              By signing up, you agree to Carousell’s Terms of Service & Privacy
              Policy
            </Typography>
          </div>
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <TextField
            select
            label="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            variant="outlined"
            fullWidth
            style={{ marginBottom: "10px" }}
          >
            <MenuItem value="EGYPT">Egypt</MenuItem>
            {/* Add more countries as needed */}
          </TextField>
          <TextField
            label="name"
            variant="outlined"
            type="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            style={{ marginBottom: "10px" }}
          />
          <TextField
            label="Email"
            variant="outlined"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            style={{ marginBottom: "10px" }}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            style={{ marginBottom: "10px" }}
          />
          <TextField
            label="Phone Number"
            variant="outlined"
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            fullWidth
            style={{ marginBottom: "10px" }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginBottom: "10px" }}
          >
            Register
          </Button>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={handleMoreOptionsClick}
          >
            More Login Options
          </Button>
        </form>
      )}

      {/* Linear Progress Loader */}
      {progressLoaderOpen && (
        <LinearProgress color="primary" style={{ marginBottom: "10px" }} />
      )}

      {loading && <GlobalLoader />}

      {/* Snackbar for displaying error message */}
      <Snackbar
        open={errorSnackbarOpen}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        message={errorMessage}
      />
    </div>
  );
};

export default Register;
