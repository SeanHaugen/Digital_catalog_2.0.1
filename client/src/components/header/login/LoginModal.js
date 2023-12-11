import * as React from "react";
import { useState } from "react";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import { styled } from "@mui/system";
import { Button } from "@mui/material";
import Sheet from "@mui/joy/Sheet";
import axios from "axios";

const CustomButton = styled(Button)(({ theme }) => ({
  color: "#fff",
  margin: "2px",
  borderRadius: "4px",
  backgroundColor: "#7B919C", // Update with your desired color
  "&:hover": {
    backgroundColor: "#4F6B77", // Update with a darker shade or a different color for hover
  },
  // position: "relative",
  // bottom: -1,
  minHeight: "initial",
}));

function LoginModal({ onLogin, username, setUsername }) {
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isLogin) {
      handleLogin();
    } else {
      handleNewUser();
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://dull-pink-termite-slip.cyclic.app/login",
        {
          username,
          password,
        }
      );

      handleResponse(response);
    } catch (error) {
      console.error("Login request failed", error);
      setSuccessMessage("");
      setErrorMessage("Login request failed");
    }
  };

  const handleNewUser = async () => {
    if (!username || !password) {
      setErrorMessage("Username and password are required");
      return;
    }

    try {
      const response = await axios.post(
        "https://dull-pink-termite-slip.cyclic.app/register",
        {
          username,
          password,
        }
      );

      handleResponse(response);
    } catch (error) {
      console.error("Registration request failed", error);

      if (error.response) {
        setErrorMessage(
          `Authentication failed: ${error.response.data.message}`
        );
      } else {
        setErrorMessage("Registration request failed");
      }

      setSuccessMessage("");
    }
  };

  const handleResponse = (response) => {
    if (response.status >= 200 && response.status < 300) {
      const data = response.data;
      const authToken = data.token;
      localStorage.setItem("authToken", authToken);
      console.log("Authentication successful");
      setSuccessMessage("Authentication successful!");
      setErrorMessage("");
      setOpen(false);
    } else {
      setSuccessMessage("");
      setErrorMessage("Authentication failed");
    }
  };

  return (
    <>
      <CustomButton variant="contained" onClick={() => setOpen(true)}>
        Login
      </CustomButton>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 500,
            borderRadius: "md",
            p: 3,
            boxShadow: "lg",
          }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            mb={1}
          >
            {isLogin ? "Login" : "Register"}
          </Typography>
          <Typography id="modal-desc" textColor="text.tertiary">
            <div className="login">
              {successMessage && (
                <div className="success-message">{successMessage}</div>
              )}
              {errorMessage && (
                <div className="error-message">{errorMessage}</div>
              )}
              <form onSubmit={handleSubmit}>
                <div>
                  <label>User Name</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div>
                  <label>Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button type="submit">{isLogin ? "Login" : "Register"}</button>
              </form>
              <p onClick={() => setIsLogin(!isLogin)}>
                {isLogin
                  ? "New user? Register here"
                  : "Already have an account? Login"}
              </p>
            </div>
          </Typography>
        </Sheet>
      </Modal>
    </>
  );
}

export default LoginModal;
