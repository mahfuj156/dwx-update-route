import { Field, Formik } from "formik";
import React from "react";
import "select2";
import "select2/dist/css/select2.css";
import Select2MultiSelect from "./Select2MultiSelect";

const MyForm = () => {
  return (
    <Formik
      initialValues={{ selected_doctor: [] }}
      onSubmit={(values) => {
        console.log("Selected colors:", values.selected_doctor);
        /*    fetch('https://example.com/api/colors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ colors: values.selectedColors })
      })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));*/
      }}
    >
      {({ values, handleSubmit, setFieldValue }) => (
        <form onSubmit={handleSubmit}>
          <Field
            name="selected_doctor"
            role="xray_dr"
            ide="selected_doctor"
            component={Select2MultiSelect}
            onChange={(selectedValues) => {
              setFieldValue("selected_doctor", selectedValues);
            }}
          />
          <button type="submit">Submit</button>
        </form>
      )}
    </Formik>
  );
};

export default MyForm;
