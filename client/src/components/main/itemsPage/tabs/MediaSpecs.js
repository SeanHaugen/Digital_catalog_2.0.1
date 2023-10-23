import * as React from "react";
import { useState } from "react";
import { useHandleMediaInfo } from "../../../../api/api";
import { Item } from "../../../../helper/Item";

function MediaSpecs({ productData, materialsArray, showMaterials }) {
  const [mediaInfo, setMediaInfo] = useState([]);

  useHandleMediaInfo(setMediaInfo, productData.Materials);
  let renderMediaSpecs = (mediaObject) => {
    return Object.entries(mediaObject).map(([key, value], index) => (
      <ul key={index}>
        <li>
          <b>{key}</b>
          {value}
        </li>
      </ul>
    ));
  };

  console.log(mediaInfo);

  console.log(materialsArray);

  const isTypeInShowMaterials = (type) => {
    return materialsArray.some((material) => material.includes(type));
  };

  return (
    <div>
      <Item>
        {mediaInfo.map((mediaSpecs, index) => {
          const type = mediaSpecs.Type;
          const isTypeMatching = isTypeInShowMaterials(type);
          return (
            <div key={index}>
              {renderMediaSpecs(mediaSpecs)}
              {isTypeMatching && <p>Match found in media Array</p>}
            </div>
          );
        })}
      </Item>
    </div>
  );
}

export default MediaSpecs;
