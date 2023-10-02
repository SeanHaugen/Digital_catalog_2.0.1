import React, { useState } from "react";
import { useFlatRateInfo } from "../../../../api/api";
import { Item } from "../../../../helper/Item";

function FlatRateShipping({ productData }) {
  const [itemRates, setItemRates] = useState([]);

  useFlatRateInfo(setItemRates, productData.Item_Number);

  const renderFlatRate = () => {
    if (itemRates !== undefined && itemRates.length > 0) {
      return (
        <div className="box">
          <h1>Flat Rate</h1>
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
        <Item>Package Size: {productData.Package_Size}</Item>
        <Item>Shipping Weight: {productData.Package_Weight}</Item>
        <Item>Dimensional Weight: NA</Item>
      </div>
    </div>
  );
}

export default FlatRateShipping;
