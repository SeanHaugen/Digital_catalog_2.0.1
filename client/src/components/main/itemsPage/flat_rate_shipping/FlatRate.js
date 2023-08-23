import React, { useState } from "react";
import { useFlatRateInfo } from "../../../../api/api";

function FlatRateShipping({ productData }) {
  const [itemRates, setItemRates] = useState("");

  useFlatRateInfo(setItemRates, productData.Item_Number);
  console.log(itemRates);

  const handleFlatRate = () => {
    if (productPricing.length > 0) {
      return (
        <div className="box">
          <h1>Flat Rate Available</h1>
          <h4>Qty 1</h4>
          {productPricing.map((item) => {
            return (
              <div>
                <ul></ul>
              </div>
            );
          })}
        </div>
      );
    } else {
      return <></>;
    }
  };

  return <div>{handleFlatRate()}</div>;
}

export default FlatRateShipping;
