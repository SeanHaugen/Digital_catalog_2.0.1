import React from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

function BackForward({ productData }) {
  const navigate = useNavigate();

  const navigateBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div>
      <ul>
        <li>
          <div>
            <button onClick={navigateBack}>
              <ArrowBackIosIcon /> Go Back
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default BackForward;
