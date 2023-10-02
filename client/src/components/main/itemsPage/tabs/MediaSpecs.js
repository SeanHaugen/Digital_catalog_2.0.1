import * as React from "react";
import { useState } from "react";
import { useHandleMediaInfo } from "../../../../api/api";

function MediaSpecs({ productData }) {
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

  return (
    <div>
      {mediaInfo.map((mediaSpecs, index) => {
        return <div key={index}>{renderMediaSpecs(mediaSpecs)};</div>;
      })}
    </div>
  );
}

export default MediaSpecs;
