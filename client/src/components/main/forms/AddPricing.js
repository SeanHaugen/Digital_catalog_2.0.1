import React, { useState } from "react";
import axios from "axios";

const AddPricingForm = () => {
  const [formData, setFormData] = useState({
    Item_Number: "",
    Name: "",
    Pricing: [
      {
        label: "Retail",
        prices: ["", "", "", ""],
      },
      {
        label: "Net",
        prices: ["", "", "", ""],
      },
      {
        label: "CPP1CS",
        prices: ["", "", "", ""],
      },
      {
        label: "KEY2CS",
        prices: ["", "", "", ""],
      },
      {
        label: "INP3CS",
        prices: ["", "", "", ""],
      },
    ],
  });

  const handlePricingChange = (e, rowIndex, columnIndex) => {
    const { value } = e.target;
    const newPricing = [...formData.Pricing];
    newPricing[rowIndex].prices[columnIndex] = value;
    setFormData({ ...formData, Pricing: newPricing });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "https://dull-pink-termite-slip.cyclic.app/pricingAdd",
        formData
      );

      // Clear the form or show a success message
      setFormData({
        Item_Number: "",
        Name: "",
        Pricing: [
          {
            label: "",
            prices: ["", "", "", ""],
          },
          {
            label: "",
            prices: ["", "", "", ""],
          },
          {
            label: "",
            prices: ["", "", "", ""],
          },
          {
            label: "",
            prices: ["", "", "", ""],
          },
          {
            label: "",
            prices: ["", "", "", ""],
          },
        ],
      });

      console.log("Item pricing added successfully");
    } catch (error) {
      console.error("Error adding item pricing:", error);
    }
  };

  return (
    <div>
      <h2>Add Pricing</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="Item_Number"
          placeholder="Item Number"
          value={formData.Item_Number}
          onChange={(e) =>
            setFormData({ ...formData, Item_Number: e.target.value })
          }
        />
        <input
          type="text"
          name="Name"
          placeholder="Name"
          value={formData.Name}
          onChange={(e) => setFormData({ ...formData, Name: e.target.value })}
        />
        <div>
          <h3>Pricing</h3>
          <table>
            <thead>
              <tr>
                <th>Label</th>
                <th>Column 1</th>
                <th>Column 2</th>
                <th>Column 3</th>
                <th>Column 4</th>
              </tr>
            </thead>
            <tbody>
              {formData.Pricing.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <td>
                    <input
                      type="text"
                      name={`Pricing[${rowIndex}].label`}
                      value={row.label}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          Pricing: formData.Pricing.map((r, i) =>
                            i === rowIndex ? { ...r, label: e.target.value } : r
                          ),
                        })
                      }
                    />
                  </td>
                  {row.prices.map((cell, columnIndex) => (
                    <td key={columnIndex}>
                      <input
                        type="text"
                        name={`Pricing[${rowIndex}].prices[${columnIndex}]`}
                        value={cell}
                        onChange={(e) =>
                          handlePricingChange(e, rowIndex, columnIndex)
                        }
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button type="submit">Add Pricing</button>
      </form>
    </div>
  );
};

export default AddPricingForm;
