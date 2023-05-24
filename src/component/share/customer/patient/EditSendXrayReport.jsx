import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import InputButton from "../../../ui/button/InputButton";
import ReferenceOptionList from "../reference/ReferenceOptionList";
import Select2MultiSelect from "./Select2MultiSelect";
import XrayHistoryList from "./XrayHistoryList";
import XrayTypeList from "./XrayTypeList";
/*
const DoctorSchema = Yup.object().shape({
  patient_id: Yup.string().required("Patient Id is required"),
  name: Yup.string().required("Name is required"),
  attachment: Yup.string().required("File is required"),
});*/

export default function EditSendXrayReport() {
  const { id } = useParams();
  const [files, setFiles] = useState([]);

  const [patient, setPatient] = useState({ xray_name: "" });
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchPatient = async () => {
      const token = JSON.parse(localStorage.getItem("token"));
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://api.desherkhobor24.com/customer/patients/${id}`,
          {
            method: "GET",
            headers: { authorization: `Bearer ${token}` },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch patient data.");
        }
        const data = await response.json();

        setPatient(data.data[0]);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    fetchPatient();
  }, [id]);

  const handleSubmit = async (values, { resetForm }) => {
    const formData = new FormData();

    if (values.selected_doctor !== "") {
      const selectedDoctor = values.selected_doctor.split("__");
      if (selectedDoctor.lenght > 0) {
        formData.append("selected_drs_id", [selectedDoctor[0]]);
        formData.append("selected_drs_name", [selectedDoctor[1]]);
      } else {
        formData.append("selected_drs_id", null);
        formData.append("selected_drs_name", null);
      }
    }
    if (values.ignored_doctor !== "") {
      const ignoredDoctor = values.ignored_doctor.split("__");
      if (ignoredDoctor.lenght > 0) {
        formData.append("ignore_drs_id", [ignoredDoctor[0]]);
        formData.append("ignore_drs_name", [ignoredDoctor[1]]);
      } else {
        formData.append("ignore_drs_id", null);
        formData.append("ignore_drs_name", null);
      }
    }

    //Multiple file upload
    if (files !== "") {
      files.forEach((file) => {
        formData.append("attachment[]", file);
      });
    }

    formData.append("patient_id", patient.patient_id);
    formData.append("name", patient.name);
    formData.append("age", patient.age);
    formData.append("gender", patient.gender);
    //formData.append("xray_name", values.xray_name);
    formData.append("xray_name", patient.xray_name || "");
    formData.append("history", patient.history || "");
    formData.append("ref_doctor", patient.ref_doctor);
    // formData.append("attachment[]", values.attachment);
    const token = JSON.parse(localStorage.getItem("token"));

    const response = await fetch(
      `https://api.desherkhobor24.com/customer/patients/${id}`,
      {
        method: "PUT",
        body: formData,
        headers: { authorization: `Bearer ${token}` },
      }
    );
    if (response.status === 200) {
      toast.success("User updated successfully!");
    } else {
      toast.error("Error updating user!");
    }

    resetForm();
  };

  if (isLoading) {
    return <p>Loading patient data...</p>;
  }

  if (!patient) {
    return null;
  }

  const initialValues = {
    patient_id: patient.patient_id,
    name: patient.name,
    age: patient.age,
    gender: patient.gender,
    history: patient.history,
    xray_name: patient.xray_name,
    ref_doctor: patient.ref_doctor,
    attachment: patient.attachment,
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ setFieldValue }) => (
        <Form
          className="form-horizontal yap-form"
          encType="multipart/form-data"
        >
          <div className="row form-group">
            <div className="col-md-3">
              <label htmlFor="role">Patient ID</label>
            </div>
            <div className="col-md-9">
              <Field
                name="patient_id"
                type="text"
                placeholder="Patient Id"
                className="form-control"
              />
            </div>
          </div>

          <div className="row form-group">
            <div className="col-md-3">
              <label htmlFor="name">Patient Name</label>
            </div>
            <div className="col-md-9">
              <Field
                name="name"
                type="text"
                placeholder="Patinet Name"
                className="form-control"
              />
            </div>
          </div>
          <div className="row form-group">
            <div className="col-md-3">
              <label htmlFor="email">Patient Age</label>
            </div>
            <div className="col-md-9">
              <Field
                name="age"
                type="text"
                placeholder="Age"
                className="form-control"
              />
            </div>
            <div className="col-md-9"></div>
          </div>
          <div className="row form-group">
            <div className="col-md-3">
              <label htmlFor="password">Gender</label>
            </div>
            <div className="col-md-9">
              <Field
                name="gender"
                type="text"
                placeholder="Gender"
                className="form-control"
              />
            </div>
          </div>
          <div className="row form-group">
            <div className="col-md-3">
              <label htmlFor="mobile">Xray name</label>
            </div>
            <div className="col-md-9">
              <div className="row">
                <div className="col-md-6">
                  <Field
                    name="xray_name"
                    type="text"
                    placeholder="Xray name"
                    className="form-control"
                  />
                </div>
                <div className="col-md-6">
                  <select
                    className="form-control"
                    onChange={(e) => setFieldValue("xray_name", e.target.value)}
                    style={{ height: "38px", marginLeft: "15px" }}
                  >
                    <option value="">--Select--</option>
                    <XrayTypeList />
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="row form-group">
            <div className="col-md-3">
              <label htmlFor="address">History</label>
            </div>
            <div className="col-md-9">
              <div className="row">
                <div className="col-md-6">
                  <Field name="history" id="history" className="form-control" />
                </div>
                <div className="col-md-6">
                  <select
                    className="form-control"
                    onChange={(e) => setFieldValue("history", e.target.value)}
                    style={{ height: "38px", marginLeft: "15px" }}
                  >
                    <option value="">--Select--</option>
                    <XrayHistoryList />
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="row form-group">
            <div className="col-md-3">
              <label htmlFor="address">Ref. Doctor</label>
            </div>
            <div className="col-md-9">
              <div className="row">
                <div className="col-md-6">
                  <Field
                    name="ref_doctor"
                    placeholder="Refer Doctor"
                    className="form-control"
                  />
                </div>
                <div className="col-md-6">
                  <select
                    className="form-control"
                    onChange={(e) =>
                      setFieldValue("ref_doctor", e.target.value)
                    }
                    style={{ height: "38px", marginLeft: "15px" }}
                  >
                    <option value="">--Select--</option>
                    <ReferenceOptionList />
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="row form-group">
            <div className="col-md-3">
              <label htmlFor="single">Images</label>
            </div>
            <div className="col-md-9">
              {
                <input
                  type="file"
                  id="attachment"
                  name="attachment[]"
                  multiple
                  onChange={(event) => {
                    const newFiles = Array.from(event.target.files);
                    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
                  }}
                />
              }
            </div>
          </div>

          <div className="row form-group">
            <div className="col-md-3">
              <label htmlFor="address">Selected Doctor</label>
            </div>
            <div className="col-md-9">
              <Field
                name="selected_doctor"
                role="xray_dr"
                ide="selected_doctor"
                component={Select2MultiSelect}
                onChange={(selectedValues) => {
                  setFieldValue("selected_doctor", selectedValues);
                }}
              />
            </div>
          </div>

          <div className="row form-group">
            <div className="col-md-3">
              <label htmlFor="address">Ignore Doctor</label>
            </div>
            <div className="col-md-9">
              <Field
                name="ignored_doctor"
                role="xray_dr"
                ide="ignored_doctor"
                component={Select2MultiSelect}
                onChange={(selectedValues) => {
                  setFieldValue("ignored_doctor", selectedValues);
                }}
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
