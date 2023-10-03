import * as React from "react";
import { useState } from "react";
import { useHandleEurofitInfo } from "../../../../api/api";

function AdditionalInfo({ productData }) {
  const [eurofitInfo, setEurofitInfo] = useState([]);
  useHandleEurofitInfo(setEurofitInfo, productData.Item_Number);
  let eurofitObj = eurofitInfo;
  console.log(eurofitObj);
  let eurofitArray = Object.entries(eurofitObj).map(([key, value], index) => (
    <ul key={index}>
      <li>{value}</li>
    </ul>
  ));
  let eurofitSlice = eurofitArray.splice(1, 2);
  console.log(eurofitSlice);

  return <div>{eurofitSlice}</div>;
}

export default AdditionalInfo;
