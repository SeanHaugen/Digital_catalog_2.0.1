import React from "react";
import "./colorBox.css";
import TableThrowColors from "../../../../../Resources/misc/colors.png";

function ColorBox({ productData, compChart }) {
  // console.log(productData.Colors.split(","));

  const colorsArray = Array.isArray(productData.Colors)
    ? productData.Colors
    : productData.Colors.split(",");

  const handleColorChart = () => {
    if (colorsArray.length > 10 && compChart === "Table Covers") {
      return (
        <>
          <img src={TableThrowColors} alt="TableThrowColors color chart" />
        </>
      );
    }
  };

  const colorMap = {
    Aquamarine: "#00FFFF",
    Black: "black",
    Blueberry: "#4169E1",
    Brown: "#A52A2A",
    Burgundy: "#800020",
    Charcoal: "#36454F",
    Cherry: "#DE3163",
    Cobalt: "#0047AB",
    Emerald: "#50C878",
    Flamingo: "#FC8EAC",
    Gray: "#808080",
    Grape: "#6F2DA8",
    "Hot Pink": "#FF69B4",
    "Hunter Green": "#355E3B",
    Hazelnut: "#907860",
    Lemon: "#FFF700",
    "Lime Green": "#32CD32",
    Mango: "#FF8243",
    MulBerry: "#C54B8C",
    Navy: "#000080",
    Orange: "#FFA500",
    Peach: "#FFDAB9",
    Purple: "#A020F0",
    Red: "#FF0000",
    "Royal Blue": "#4169E1",
    Shamrock: "#45CEA2",
    White: "white",
    Yellow: "#FFFF00",
    "Blaze Orange": "#FF6600",
    Silver: "#D4D4D4",
    Lava: "black",
    "Pacific Blue": "blue",
    steel: "#A2AAAD",
  };

  const colors = [
    { name: "Aquamarine", code: "2231" },
    { name: "Black", code: "Black" },
    { name: "Blueberry", code: "647" },
    { name: "Brown", code: "476" },
    { name: "Burgundy", code: "504" },
    { name: "Charcoal", code: "425" },
    { name: "Cherry", code: "1795" },
    { name: "Cobalt", code: "7683" },
    { name: "Emerald", code: "347" },
    { name: "Flamingo", code: "1767" },
    { name: "Gray", code: "422" },
    { name: "Grape", code: "268" },
    { name: "Hot Pink", code: "219" },
    { name: "Hunter Green", code: "350" },
    { name: "Hazelnut", code: "7575" },
    { name: "Lemon", code: "109" },
    { name: "Lime Green", code: "375" },
    { name: "Mango", code: "1375" },
    { name: "MulBerry", code: "683" },
    { name: "Navy", code: "2767" },
    { name: "Orange", code: "1505" },
    { name: "Peach", code: "162" },
    { name: "Purple", code: "violet" },
    { name: "Red", code: "201" },
    { name: "Royal Blue", code: "661" },
    { name: "Shamrock", code: "361" },
    { name: "White", code: "white" },
    { name: "Yellow", code: "1235" },
    { name: "Blaze Orange", code: "804" },
    { name: "Silver", code: "Silver" },
    { name: "Steel", code: "429" },
    { name: "Lava", code: "Black 6" },
  ];

  const getColorCode = (colorName) => {
    const color = colors.find((c) => c.name === colorName);
    return color ? color.code : "";
  };

  const handleColors = (colors) => {
    let arrayOfColors = colors.split(",").map((color) => color.trim());

    return arrayOfColors.map((color, index) => {
      return (
        <div
          key={index}
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              marginRight: "8px",
              borderRadius: "50px",
              background: colorMap[color] || "white",
            }}
          ></div>
          <div>{color}</div>
          <div style={{ marginLeft: "8px" }}>{getColorCode(color)}</div>
        </div>
      );
    });
  };

  return (
    <>
      <h2>Colors for item {productData.Item_Number}</h2>
      <div className="box color parent">
        <div className="child">{handleColors(productData.Colors)}</div>
      </div>
      <h2></h2>
      {handleColorChart()}
    </>
  );
}

export default ColorBox;
