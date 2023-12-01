import * as React from "react";
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
  const [open, setOpen] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "https://dull-pink-termite-slip.cyclic.app/login",
        {
          username,
          password,
        }
      );

      if (response.status === 200) {
        const data = response.data;
        const authToken = data.token;
        localStorage.setItem("authToken", authToken);
        // Store the JWT token in a secure manner (e.g., context or local storage)
        // You can implement this part according to your app's architecture
        console.log("login successful");
        setSuccessMessage("Login successful!");
        setErrorMessage(""); // Clear any previous error messages
        setOpen(false); // Close the modal
      } else {
        // Handle authentication error
        setSuccessMessage("");
        setErrorMessage("Authentication failed");
      }
    } catch (error) {
      console.error("Login request failed", error);
      setSuccessMessage("");
      setErrorMessage("Login request failed");
    }
  };

  const authToken = localStorage.getItem("authToken");
  console.log(authToken);

  return (
    <>
      <React.Fragment>
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
              Login
            </Typography>
            <Typography id="modal-desc" textColor="text.tertiary">
              <div className="login">
                {successMessage && (
                  <div className="success-message">{successMessage}</div>
                )}
                {errorMessage && (
                  <div className="error-message">{errorMessage}</div>
                )}
                <form onSubmit={handleLogin}>
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
                  <button type="submit">Submit</button>
                </form>
              </div>
            </Typography>
          </Sheet>
        </Modal>
      </React.Fragment>
    </>
  );
}

export default LoginModal;
