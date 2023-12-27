import * as React from "react";
import { useState } from "react";
import { useInternalInfo } from "../../../../api/api";
import { Item } from "../../../../helper/Item";

function InternalInfo({ productData }) {
  const [internalInfo, setInternalInfo] = useState([]);
  useInternalInfo(setInternalInfo, productData.Item_Number);

  return (
    <div>
      <Item>
        {internalInfo.Internal_Info !== undefined ? (
          internalInfo.Internal_Info.map((info, index) => (
            <div key={index}>{info}</div>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </Item>
    </div>
  );
}

export default InternalInfo;
