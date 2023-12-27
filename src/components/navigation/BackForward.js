import React from "react";
import { useNavigate } from "react-router";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "./navigation.css";

function Navigation({ productData }) {
  let navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const goForward = () => {
    navigate(1);
  };

  return (
    <div>
      <div className="navigation-container">
        <button
          className="nav-button"
          onClick={goBack}
          style={{ marginRight: "10px" }}
        >
          <ArrowBackIosIcon />
        </button>
        <button className="nav-button" onClick={goForward}>
          <ArrowForwardIosIcon />
        </button>
      </div>
    </div>
  );
}

export default Navigation;
