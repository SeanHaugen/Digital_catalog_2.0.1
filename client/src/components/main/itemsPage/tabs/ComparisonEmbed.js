import React from "react";
import Banner_material from "../../../../Resources/ComparisonCharts/BannerComp.png";
import popup from "../../../../Resources/ComparisonCharts/popupComp.png";
import Retractor from "../../../../Resources/ComparisonCharts/RetractorComp.png";
import sail_sign from "../../../../Resources/ComparisonCharts/SailSignComp.png";
import Signage from "../../../../Resources/ComparisonCharts/SignageComp.png";
import Tablecovers from "../../../../Resources/ComparisonCharts/TablethrowComp.png";
import Tents from "../../../../Resources/ComparisonCharts/TentComp.png";

function ComparisonEmbed({ compChart, productData, category }) {
  const handleComparisonCharts = () => {
    if (compChart === "Retractable Banners") {
      return (
        <>
          <img src={Retractor} alt="retractor comparison chart" />
        </>
      );
    } else if (compChart === "Tents") {
      return (
        <>
          <img src={Tents} alt="tent comparison chart" />
        </>
      );
    } else if (compChart === "Signage") {
      return (
        <>
          <img src={Signage} alt="Signage comparison chart" />
        </>
      );
    } else if (compChart === "Table Covers") {
      return (
        <>
          <img src={Tablecovers} alt="Table covers comparison chart" />
        </>
      );
    } else if (compChart === "Banners & Flags") {
      return (
        <>
          <img src={Banner_material} alt="Banners & Flags comparison chart" />
        </>
      );
    }
  };

  return (
    <>
      <div>
        <iframe
          src="https://main--sd-comparison-guide.netlify.app"
          width="1500"
          height="800"
        ></iframe>
        {handleComparisonCharts()}
      </div>
    </>
  );
}
export default ComparisonEmbed;
