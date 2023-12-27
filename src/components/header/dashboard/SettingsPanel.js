// import React, { useState } from "react";

// import { useCategoryData } from "../../../api/api";

// const SettingsPanel = () => {
//   const [categoryConfig, setCategoryConfig] = useState([]);

//   useCategoryData(setCategoryData);

//   useCategoryData((data) => {
//     const initialConfig = data.map((cat) => ({
//       name: cat,
//       visible: true,
//       order: data.indexOf(cat) + 1,
//     }));
//     setCategoryConfig(initialConfig);
//   });

//   const handleVisibilityChange = (index, isVisible) => {
//     setCategoryConfig((prevConfig) => {
//       const updatedConfig = [...prevConfig];
//       updatedConfig[index].visible = isVisible;
//       return updatedConfig;
//     });
//   };

//   const handleOrderChange = (index, newOrder) => {
//     setCategoryConfig((prevConfig) => {
//       const updatedConfig = [...prevConfig];
//       updatedConfig[index].order = newOrder;
//       return updatedConfig;
//     });
//   };
//   return (
//     <div>
//       {categoryConfig.map((config, index) => (
//         <div key={index}>
//           <label>
//             <input
//               type="checkbox"
//               checked={config.visible}
//               onChange={(e) => handleVisibilityChange(index, e.target.checked)}
//             />
//             {config.name}
//           </label>
//           <input
//             type="number"
//             value={config.order}
//             onChange={(e) => handleOrderChange(index, parseInt(e.target.value))}
//           />
//         </div>
//       ))}
//     </div>
//   );
// };
