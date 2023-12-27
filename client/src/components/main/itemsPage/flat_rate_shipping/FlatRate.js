import React, { useState } from "react";
import { useFlatRateInfo } from "../../../../api/api";
import freightMap from "../../../../Resources/misc/freight_maps.png";

let TableThrowFlatRates = [
  {
    Quantity: 1,
    Ground: 17.95,
    "2nd Day Air": 68.34,
    "Standard Overnight": 129.09,
  },
  {
    Quantity: 2,
    Ground: 18.13,
    "2nd Day Air": 75.86,
    "Standard Overnight": 138.13,
  },
  {
    Quantity: 3,
    Ground: 18.31,
    "2nd Day Air": 83.37,
    "Standard Overnight": 147.16,
  },
  {
    Quantity: 4,
    Ground: 18.49,
    "2nd Day Air": 90.89,
    "Standard Overnight": 156.2,
  },
  {
    Quantity: 5,
    Ground: 18.67,
    "2nd Day Air": 98.41,
    "Standard Overnight": 165.24,
  },
  {
    Quantity: 6,
    Ground: 18.85,
    "2nd Day Air": 105.92,
    "Standard Overnight": 174.27,
  },
  {
    Quantity: 7,
    Ground: 19.03,
    "2nd Day Air": 113.44,
    "Standard Overnight": 183.31,
  },
  {
    Quantity: 8,
    Ground: 19.21,
    "2nd Day Air": 120.96,
    "Standard Overnight": 192.34,
  },
  {
    Quantity: 9,
    Ground: 19.39,
    "2nd Day Air": 128.48,
    "Standard Overnight": 201.38,
  },
  {
    Quantity: 10,
    Ground: 19.57,
    "2nd Day Air": 136,
    "Standard Overnight": 210.42,
  },
  {
    Quantity: 11,
    Ground: 19.75,
    "2nd Day Air": 143.51,
    "Standard Overnight": 219.45,
  },
  {
    Quantity: 12,
    Ground: 19.92,
    "2nd Day Air": 151.03,
    "Standard Overnight": 228.49,
  },
  {
    Quantity: 13,
    Ground: 20.1,
    "2nd Day Air": 158.55,
    "Standard Overnight": 237.53,
  },
  {
    Quantity: 14,
    Ground: 20.28,
    "2nd Day Air": 166.07,
    "Standard Overnight": 246.56,
  },
  {
    Quantity: 15,
    Ground: 20.46,
    "2nd Day Air": 173.58,
    "Standard Overnight": 255.6,
  },
  {
    Quantity: 16,
    Ground: 20.64,
    "2nd Day Air": 181.1,
    "Standard Overnight": 264.63,
  },
  {
    Quantity: 17,
    Ground: 20.82,
    "2nd Day Air": 188.62,
    "Standard Overnight": 273.67,
  },
  {
    Quantity: 18,
    Ground: 21,
    "2nd Day Air": 196.14,
    "Standard Overnight": 282.71,
  },
  {
    Quantity: 19,
    Ground: 21.18,
    "2nd Day Air": 203.65,
    "Standard Overnight": 291.74,
  },
  {
    Quantity: 20,
    Ground: 21.36,
    "2nd Day Air": 211.17,
    "Standard Overnight": 300.78,
  },
  {
    Quantity: 21,
    Ground: 21.54,
    "2nd Day Air": 218.69,
    "Standard Overnight": 309.82,
  },
  {
    Quantity: 22,
    Ground: 21.72,
    "2nd Day Air": 226.21,
    "Standard Overnight": 318.85,
  },
  {
    Quantity: 23,
    Ground: 21.9,
    "2nd Day Air": 233.72,
    "Standard Overnight": 327.89,
  },
  {
    Quantity: 24,
    Ground: 22.08,
    "2nd Day Air": 241.24,
    "Standard Overnight": 336.92,
  },
];

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

  const renderTableThrowFlatRates = () => {
    if (productData.Category === "Table Covers" && renderFlatRate()) {
      return (
        <div>
          <h1>
            <b>Table Throw Flat Rates</b>
          </h1>
          <table>
            <thead>
              <tr>
                <th>Quantity</th>
                <th>Ground</th>
                <th>2nd Day Air</th>
                <th>Standard Overnight</th>
              </tr>
            </thead>
            <tbody>
              {TableThrowFlatRates.map((item, index) => (
                <tr key={index}>
                  <td>{item.Quantity}</td>
                  <td>{item.Ground}</td>
                  <td>{item["2nd Day Air"]}</td>
                  <td>{item["Standard Overnight"]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else {
      return null; // or return a message if needed
    }
  };

  const renderRates = () => {
    if (renderTableThrowFlatRates() && renderFlatRate()) {
      return <div>{renderTableThrowFlatRates()}</div>;
    }
  };

  return (
    <div>
      <div>
        {renderRates()}

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
