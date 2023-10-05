import AddNew from "./AddNew";
import AddPricingForm from "./AddPricing";
import "./formpage.css";

function FormPage() {
  return (
    <div className="forms">
      <AddNew />
      <AddPricingForm />
    </div>
  );
}

export default FormPage;
