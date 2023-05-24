import { Select } from "@material-ui/core";
import React from "react";
const options = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "orange", label: "Orange" },
  { value: "grape", label: "Grape" },
];
const MultiSelectField = ({ field, form }) => {
  const handleChange = (event) => {
    const { value } = event.target;
    form.setFieldValue(field.name, value);
  };

  return (
    <Select
      multiple
      value={Array.isArray(field.value) ? field.value : [field.value]}
      onChange={handleChange}
      renderValue={(selected) => selected.join(", ")}
    >
      <option value="">--Select--</option>
      <option value="Dr. Mahfuj">Dr. Mahfuj</option>
      <option value="Dr. Mahfuj">Dr. Mahfuj</option>
      <option value="Dr. Mahfuj">Dr. Mahfuj</option>
      <option value="Dr. Mahfuj">Dr. Mahfuj</option>
      <option value="Dr. Mahfuj">Dr. Mahfuj</option>
    </Select>
  );
};

export default MultiSelectField;
