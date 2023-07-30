import React, { useState } from "react";
import { Button, Typography, TextField, Snackbar, LinearProgress } from "@mui/material";
import { Email, Facebook } from "@mui/icons-material";
import { LOGIN_URL } from "../../api";
import GlobalLoader from "../GlobalLoader/GlobalLoader";

const Login = ({ onClose }) => {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);

  const handleEmailButtonClick = () => {
    setShowEmailForm(true);
  };

  const handleLogin = async () => {
    try {
      setLoading(true);

      const response = await fetch(LOGIN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      setLoading(false);

      if (!response.ok) {
        setErrorSnackbarOpen(true);
        console.error("Login failed:", response.statusText);
        return;
      }

      const data = await response.json();
      console.log("API response data:", data);

      onClose();
    } catch (error) {
      setLoading(false);
      setErrorSnackbarOpen(true);
      console.error("API error:", error);
    }
  };

  const handleMoreOptionsClick = () => {
    setShowEmailForm(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  const handleSnackbarClose = () => {
    setErrorSnackbarOpen(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h5" component="h2" style={{ margin: "20px 0" }}>
        Login
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
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            variant="outlined"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginBottom: "10px" }}
          >
            Login
          </Button>
          <Button
            variant="outlined"
            color="primary"
            style={{
              marginTop: "10px",
              width: "100%",
              justifyContent: "center",
            }}
            onClick={handleMoreOptionsClick}
          >
            More Login Options
          </Button>
        </form>
      )}

      {loading && <GlobalLoader />}

      {/* Snackbar with Linear Progress Loader */}
      <Snackbar
        open={errorSnackbarOpen}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        message="Login failed. Please try again."
      >
        <LinearProgress color="secondary" />
      </Snackbar>
    </div>
  );
};

export default Login;
