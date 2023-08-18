import React, { useEffect, useState } from "react";
import axios from "axios";

function FlatRateShipping({ productData }) {
  const [productPricing, setProductPricing] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `/item/flat_rate_shipping?item_no=${item}`
        );
        setProductPricing(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
  }, []);

  console.log(productPricing);

  const handleFlatRate = () => {
    if (productPricing.length > 0) {
      return (
        <div className="box">
          <h1>Flat Rate Available</h1>
          <h4>Qty 1</h4>
          {productPricing.map((item) => {
            return (
              <div>
                <ul>
                  <li key={item.rate}>
                    {item.service}: {item.rate}
                  </li>
                </ul>
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
