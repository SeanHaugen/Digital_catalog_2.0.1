import React, { useState } from "react";
import { useFlatRateInfo } from "../../../../api/api";
import freightMap from "../../../../Resources/misc/freight_maps.png";

function FlatRateShipping({ productData }) {
  const [itemRates, setItemRates] = useState([]);

  useFlatRateInfo(setItemRates, productData.Item_Number);

  const renderFlatRate = () => {
    if (itemRates !== undefined && itemRates.length > 0) {
      return (
        <div className="box">
          <h1>
            <b>Flat Rate</b>
          </h1>
          <h4>Qty 1</h4>
          {itemRates.map((items, index) => (
            <div key={index}>
              <p>
                {items.Service}: {items.Rate}
              </p>
            </div>
          ))}
        </div>
      );
    } else {
      return <p>No flat Rates</p>;
    }
  };

  return (
    <div>
      <div>
        {renderFlatRate()}

        <b>Packaging Information</b>
        <ul>
          <li>
            <b>Package Size:</b> {productData.Package_Size}
          </li>
          <li>
            <b>Shipping Weight:</b> {productData.Package_Weight}
          </li>
          <li>
            <b>Dimensional Weight:</b> NA
          </li>
        </ul>
      </div>
      <img
        className="freight-map"
        src={freightMap}
        alt="freight-map"
        style={{
          width: "50%",
          objectFit: "contain",
        }}
      />
    </div>
  );
}

export default FlatRateShipping;
