import * as React from "react";
import { useState, useEffect } from "react";
import { useHandleMediaInfo } from "../../../../api/api";
import axios from "axios";
import { Item } from "../../../../helper/Item";

function MediaSpecs({ productData, materialsArray, showMaterials }) {
  const [mediaInfo, setMediaInfo] = useState([]);
  const [matchingMedia, setMatchingMedia] = useState(null);
  const [selectedType, setSelectedType] = useState("");
  // useHandleMediaInfo(setMediaInfo, productData.Materials);
  // let renderMediaSpecs = (mediaObject) => {
  //   return Object.entries(mediaObject).map(([key, value], index) => (
  //     <ul key={index}>
  //       <li>
  //         <b>{key}</b>
  //         {value}
  //       </li>
  //     </ul>
  //   ));
  // };
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://dull-pink-termite-slip.cyclic.app/specsForMedia"
        );

        setMediaInfo(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const matchingTypes = mediaInfo
    .filter((mediaSpecs) =>
      materialsArray.some((material) => material.includes(mediaSpecs.Type))
    )
    .map((mediaSpecs) => mediaSpecs.Type);

  useEffect(() => {
    if (matchingTypes.length > 0) {
      setSelectedType(matchingTypes[0]);
    }
  }, [matchingTypes]);

  return (
    <div>
      <Item>
        {matchingTypes.length > 0 ? (
          matchingTypes.map((type, index) => (
            <div key={index}>
              <h3>{type}</h3>
              {mediaInfo
                .filter((mediaSpecs) => mediaSpecs.Type === type)
                .map((mediaSpecs, subIndex) => (
                  <ul key={subIndex}>
                    {Object.entries(mediaSpecs).map(([key, value]) => (
                      <li>
                        <b>{key}</b>: {value}
                      </li>
                    ))}
                  </ul>
                ))}
            </div>
          ))
        ) : (
          <p>No matching media found.</p>
        )}
      </Item>
    </div>
  );
}

export default MediaSpecs;
