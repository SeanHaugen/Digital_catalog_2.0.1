import React from "react";
import { NavLink } from "react-router-dom";
import { styled } from "@mui/system";
import { Button } from "@mui/material";
import LoginModal from "../login/LoginModal";
import Navigation from "../../navigation/BackForward";
import BottomNav from "../../footer/BottomNav";

const CustomButton = styled(Button)(({ theme }) => ({
  color: "#fff",
  margin: "2px",
  borderRadius: "4px",
  backgroundColor: "#7B919C", // Update with your desired color
  "&:hover": {
    backgroundColor: "#4F6B77", // Update with a darker shade or a different color for hover
  },
  minHeight: "36px",
}));

const LowerBar = ({ username, setUsername, productData, setProduct }) => {
  return (
    <div
      style={{
        display: "block",
        justifyContent: "center",
        alignContent: "center",
        marginLeft: "12em",
      }}
    >
      <div
        className="lower-bar"
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        {/* <NavLink to="/addProduct">
          <CustomButton
            variant="contained"
            style={{
              // backgroundColor: "#7B919C",
              marginLeft: "50px",
              marginRight: "5px",
            }}
          >
            Add products
          </CustomButton>
        </NavLink> */}

        <NavLink to="/StockOutList">
          <CustomButton
            variant="contained"
            style={{
              // backgroundColor: "#7B919C",
              marginRight: "5px",
            }}
          >
            Stock Out List
          </CustomButton>
        </NavLink>
        <BottomNav productData={productData} setProduct={setProduct} />
        {/* <NavLink to={"/Promos"}>
          <CustomButton
            variant="contained"
            style={{
              // backgroundColor: "#7B919C",
              marginRight: "5px",
            }}
          >
            Promos
          </CustomButton>
        </NavLink> */}
        {/* <NavLink to={"/NewProducts"}>
          <CustomButton
            variant="contained"
            style={{
              // backgroundColor: "#7B919C",
              marginRight: "5px",
            }}
          >
            New Items
          </CustomButton>
        </NavLink> */}

        <LoginModal username={username} setUsername={setUsername} />
      </div>
      <Navigation className="nav_buttons" />
    </div>
  );
};

export default LowerBar;
