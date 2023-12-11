import AddNew from "./AddNew";
import AddPricingForm from "./AddPricing";
import "./formpage.css";
import ToggleNewItems from "./admin/ToggleNewItems";

function FormPage({ productData }) {
  return (
    <div className="forms">
      <AddNew productData={productData} />
      <ToggleNewItems productData={productData} />
      <AddPricingForm />
    </div>
  );
}

export default FormPage;
