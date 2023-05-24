import axios from "axios";
import { Field, Form, Formik } from "formik";
import $ from "jquery";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "select2";
import "select2/dist/css/select2.css";
import InputButton from "../../../ui/button/InputButton";
import ReferenceOptionList from "../reference/ReferenceOptionList";
import Select2MultiSelect from "./Select2MultiSelect";
import XrayHistoryList from "./XrayHistoryList";
import XrayTypeList from "./XrayTypeList";
window.$ = window.jQuery = $;

/*
const DoctorSchema = Yup.object().shape({
  patient_id: Yup.string().required("Patient Id is required"),
  name: Yup.string().required("Name is required"),
  attachment: Yup.string().required("File is required"),
});*/

const initialValues = {
  patient_id: "",
  name: "",
  age: "",
  gender: "",
  xray_name: "",
  history: "",
  ref_doctor: "",
  study_for: "xray_dr",
  rtype: "xray",
  status: "pending",
  completed_time: null,
  is_checked: null,
  is_trush: null,
  is_typing: null,
  selected_drs_id: "",
  selected_drs_name: "",
  ignore_drs_id: "",
  ignore_drs_name: "",
  attachment: "",
  selected_doctor: [],
  ignored_doctor: [],
};

export default function SendXrayReport() {
  const [files, setFiles] = useState([]);

  const handleSubmit = async (values, { resetForm }) => {
    const selectedIdes = [];
    const selectedNames = [];
    for (let i = 0; i < values.selected_doctor.length; i++) {
      const getRow = values.selected_doctor[i];

      const selectedDoctor = getRow.split("__");
      selectedIdes.push(selectedDoctor[0]);
      selectedNames.push(selectedDoctor[1]);
    }
    const ignoredIdes = [];
    const ignoredNames = [];
    for (let i = 0; i < values.ignored_doctor.length; i++) {
      const getRow = values.ignored_doctor[i];

      const selectedDoctor_ = getRow.split("__");
      ignoredIdes.push(selectedDoctor_[0]);
      ignoredNames.push(selectedDoctor_[1]);
    }

    const formData = new FormData();

    formData.append("selected_drs_id", selectedIdes);
    formData.append("selected_drs_name", selectedNames);

    formData.append("ignore_drs_id", ignoredIdes);
    formData.append("ignore_drs_name", ignoredNames);

    //Multiple file upload
    files.forEach((file) => {
      formData.append("attachment[]", file);
    });

    formData.append("patient_id", values.patient_id);
    formData.append("name", values.name);
    formData.append("age", values.age);
    formData.append("gender", values.gender);
    formData.append("xray_name", values.xray_name);
    formData.append("history", values.history);
    formData.append("ref_doctor", values.ref_doctor);
    formData.append("study_for", values.study_for);
    formData.append("rtype", values.rtype);
    // formData.append("attachment[]", values.attachment);
    const token = JSON.parse(localStorage.getItem("token"));
    axios
      .post("https://api.desherkhobor24.com/customer/patients", formData, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.status === 200) {
          toast.success("Report added successfully!");
        } else {
          toast.error("Error adding report!");
        }
      })
      .catch((error) => {});

    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      //  validationSchema={DoctorSchema}
    >
      {({ values, setFieldValue }) => (
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
              {/*} <input
                type="file"
                id="attachment"
                name="attachment"
                multiple
                onChange={(event) => {
                  setFieldValue("attachment", event.currentTarget.files[0]);
                }}
              />*/}

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
