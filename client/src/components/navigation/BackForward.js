import React from "react";
import { useNavigate } from "react-router";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

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
      <ul>
        <li>
          <div>
            <button onClick={goBack}>
              <ArrowBackIosIcon />
            </button>
            <button onClick={goForward}>
              <ArrowForwardIosIcon />
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
