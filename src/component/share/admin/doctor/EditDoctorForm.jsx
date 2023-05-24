import axios from "axios";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import InputButton from "../../../ui/button/InputButton";
import AddressTextEditor from "../../input/AddressTextEditor";

const initialValues = {};
export default function EditDoctorForm() {
  const [user, setUser] = useState("");
  const { id } = useParams();

  const handleSubmit = async (values) => {
    const token = JSON.parse(localStorage.getItem("token"));
    console.log(user);

    const formData = new FormData();

    formData.append("name", user.name);
    formData.append("email", user.email);
    formData.append("mobile", user.mobile);
    formData.append("address", user.address);
    formData.append("single", user.single);
    formData.append("double", user.double);
    formData.append("multiple", user.multiple);
    formData.append("ecg", user.ecg);
    formData.append("city", user.city);
    formData.append("avatar", values.avatar);

    const response = await fetch(`https://api.desherkhobor24.com/users/${id}`, {
      method: "PUT",
      body: formData,
      headers: { authorization: `Bearer ${token}` },
    });
    console.log(response);

    if (response.status === 200) {
      toast.success("User updated successfully!");
    } else {
      toast.error("Error updating user!");
    }

    //resetForm();
  };

  const config = {
    buttons: ["bold", "italic", "underline", "link", "unlink", "source"],
  };

  const handleOnchange = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.type === "file" ? e.target.files[0] : e.target.value,
    }));
  };

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));

    axios
      .get(`https://api.desherkhobor24.com/users/${id}`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUser(response.data.data[0]);
      })
      .catch((error) => {});
  }, [id]);

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ handleChange, values, setFieldValue }) => (
        <Form
          className="form-horizontal yap-form"
          encType="multipart/form-data"
        >
          <div className="row form-group">
            <div className="col-md-3">
              <label htmlFor="name">Doctor Name</label>
            </div>
            <div className="col-md-9">
              <Field
                name="name"
                type="text"
                value={user.name}
                placeholder="Doctor Name"
                className="form-control"
                onChange={handleOnchange}
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
                value={user.email}
                placeholder="Email / Username"
                className="form-control"
                onChange={handleOnchange}
              />
            </div>
            <div className="col-md-9"></div>
          </div>
          <div className="row form-group">
            <div className="col-md-3">
              <label htmlFor="mobile">Mobile Number</label>
            </div>
            <div className="col-md-9">
              <Field
                name="mobile"
                type="tel"
                value={user.mobile}
                placeholder="Mobile Number"
                className="form-control"
                onChange={handleOnchange}
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
                className="form-control"
                value={user.address}
                setFieldValue={setFieldValue}
                config={config}
                component={AddressTextEditor}
              />
            </div>
          </div>

          <div className="row form-group">
            <div className="col-md-3">
              <label htmlFor="single">E-signature</label>
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
                value={user.single}
                className="form-control"
                placeholder="Single Image Price"
                onChange={handleOnchange}
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
                value={user.double}
                type="number"
                className="form-control"
                placeholder="Double Image Price"
                onChange={handleOnchange}
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
                value={user.multiple}
                type="number"
                className="form-control"
                placeholder="Multiple Image Price"
                onChange={handleOnchange}
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
                value={user.ecg}
                type="number"
                className="form-control"
                placeholder="ECG Image Price"
                onChange={handleOnchange}
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
                value={user.city}
                type="number"
                className="form-control"
                placeholder="CT Image Price"
                onChange={handleOnchange}
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
