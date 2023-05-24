import axios from "axios";
import { Field, Form, Formik } from "formik";
import React from "react";
import { ToastContainer, toast } from "react-toastify"; 
import InputButton from "../../../ui/button/InputButton";
import AddressTextEditor from "../../input/AddressTextEditor";
import DoctorType from "./DoctorType";
 

const initialValues = {
  name: "",
  role: "user",
  email: "",
  password: "",
  mobile: "",
  address: "",
  single: "",
  double: "",
  multiple: "",
  ecg: "",
  city: "", 
  avatar: null,
};
export default function AddDoctorForm() {
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const formData = new FormData();

      formData.append("name", values.name);
      formData.append("role", values.role);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("mobile", values.mobile);
      formData.append("address", values.address);
      formData.append("single", values.single);
      formData.append("double", values.double);
      formData.append("multiple", values.multiple);
      formData.append("ecg", values.ecg);
      formData.append("city", values.city); 
      formData.append("avatar", values.avatar);

      const response = await axios.post("https://api.desherkhobor24.com/users", formData, {
        headers: { authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        toast.success("Doctor added successfully!");
        resetForm();
      } else {
        toast.error("Error updating doctor!");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred. Please try again.");
    }
  };

 const config = {
    buttons: ["bold", "italic", "underline", "link", "unlink", "source"],
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit} 
    >
      {({ handleChange, values, setFieldValue }) => (
        <Form
          className="form-horizontal yap-form"
          encType="multipart/form-data"
        >
          <div className="row form-group">
            <div className="col-md-3">
              <label htmlFor="role">Doctor Type</label>
            </div>
            <div className="col-md-9">
              <Field name="role" as="select" className="form-control">
                <DoctorType handleChange={handleChange} value={values.role} />
              </Field>
            </div>
          </div>
          <div className="row form-group">
            <div className="col-md-3">
              <label htmlFor="name">Doctor Name</label>
            </div>
            <div className="col-md-9">
              <Field
                name="name"
                type="text"
                placeholder="Doctor Name"
                className="form-control"
              />
            </div>
          </div>
          <div className="row form-group">
            <div className="col-md-3">
              <label htmlFor="email">Email / Username</label>
            </div>
            <div className="col-md-9">
              <Field
                name="email"
                type="text"
                placeholder="Email / Username"
                className="form-control"
              />
            </div>
            <div className="col-md-9"></div>
          </div>
          <div className="row form-group">
            <div className="col-md-3">
              <label htmlFor="password">Password</label>
            </div>
            <div className="col-md-9">
              <Field
                name="password"
                type="password"
                placeholder="Password"
                className="form-control"
              />
            </div>
          </div>
          <div className="row form-group">
            <div className="col-md-3">
              <label htmlFor="mobile">Mobile Number</label>
            </div>
            <div className="col-md-9">
              <Field
                name="mobile"
                type="tel"
                placeholder="Mobile Number"
                className="form-control"
              />
            </div>
          </div>
          <div className="row form-group">
            <div className="col-md-3">
              <label htmlFor="address">Designation</label>
            </div>
            <div className="col-md-9">
            <Field
                name="address"
                value=""
                className="form-control"
                setFieldValue={setFieldValue}
                config={config}
                component={AddressTextEditor}
              />
          
            </div>
          </div>

          <div className="row form-group">
            <div className="col-md-3">
              <label htmlFor="single">E-Signature</label>
            </div>
            <div className="col-md-9">
              <input
                type="file"
                id="avatar"
                name="avatar"
                onChange={(event) => {
                  setFieldValue("avatar", event.currentTarget.files[0]);
                }}
              />
            </div>
          </div>
          <div className="row form-group">
            <div className="col-md-3">
              <label htmlFor="single">Single Image Price</label>
            </div>
            <div className="col-md-9">
              <Field
                name="single"
                type="number"
                className="form-control"
                placeholder="Single Image Price"
              />
            </div>
          </div>
          <div className="row form-group">
            <div className="col-md-3">
              <label htmlFor="double">Double Image Price</label>
            </div>
            <div className="col-md-9">
              <Field
                name="double"
                type="number"
                className="form-control"
                placeholder="Double Image Price"
              />
            </div>
          </div>
          <div className="row form-group">
            <div className="col-md-3">
              <label htmlFor="multiple">Multiple Image Price</label>
            </div>
            <div className="col-md-9">
              <Field
                name="multiple"
                type="number"
                className="form-control"
                placeholder="Multiple Image Price"
              />
            </div>
          </div>
          <div className="row form-group">
            <div className="col-md-3">
              <label htmlFor="ecg">ECG Image Price</label>
            </div>
            <div className="col-md-9">
              <Field
                name="ecg"
                type="number"
                className="form-control"
                placeholder="ECG Image Price"
              />
            </div>
          </div>
          <div className="row form-group">
            <div className="col-md-3">
              <label htmlFor="city">CT Image Price</label>
            </div>
            <div className="col-md-9">
              <Field
                name="city"
                type="number"
                className="form-control"
                placeholder="CT Image Price"
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
