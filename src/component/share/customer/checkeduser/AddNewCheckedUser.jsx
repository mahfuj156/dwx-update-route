import axios from "axios";
import { Field, Form, Formik } from "formik";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import * as Yup from "yup";
import InputButton from "../../../ui/button/InputButton";
const DoctorSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
});

const initialValues = {
  name: "",
};

export default function AddNewCheckedUser() {
  const handleSubmit = async (values, { resetForm }) => {
    const token = JSON.parse(localStorage.getItem("token"));
    axios
      .post("https://api.desherkhobor24.com/agent/checkusers", values, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.status === 200) {
          toast.success("Checked user added successfully!");
        } else {
          toast.error("Error adding User!");
        }
      })
      .catch((error) => {});

    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={DoctorSchema}
    >
      {({ values, setFieldValue }) => (
        <Form
          className="form-horizontal yap-form"
          encType="multipart/form-data"
        >
          <div className="row form-group">
            <div className="col-md-3">
              <label htmlFor="role">User name</label>
            </div>
            <div className="col-md-9">
              <Field
                name="name"
                type="text"
                placeholder="Checked User Name"
                className="form-control"
              />
            </div>
          </div>

          <div className="row form-group" style={{ clear: "both" }}>
            <InputButton type="submit" name="Submit" value="Submit" />
          </div>
          <ToastContainer />
        </Form>
      )}
    </Formik>
  );
}
