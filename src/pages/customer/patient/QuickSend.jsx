import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import XrayTypeList from "../../../component/share/customer/patient/XrayTypeList";
import ReferenceOptionList from "../../../component/share/customer/reference/ReferenceOptionList";
import InputButton from "../../../component/ui/button/InputButton";
import Layout from "../../../layout/Layout";
 
const QuickSend = () => {
  const [files, setFiles] = useState([]);

  const [history, setHistory] = useState("");
  const [ref_doctor, setRefDoctor] = useState("");

  function handleHistoryChange(e) {
    setHistory(e.target.value);
  }

  function handleRefDoctorChange(e) {
    setRefDoctor(e.target.value);
  }

  const handleSubmit = async (event) => {
    console.log(event);
    event.preventDefault();

    const formData = new FormData();

    const file = event.target.fileInput.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = async () => {
      const lines = reader.result.split("\n");
      let patientId, patientName, patientSex, xray;
      lines.forEach((line) => {
        const lineRead = line.split(":");
        switch (lineRead[0]) {
          case "Patient ID":
            patientId = lineRead[1];
            break;
          case "Patient's Name":
            patientName = lineRead[1];
            break;
          case "Sex":
            patientSex = lineRead[1];
            break;
          case "Menu Name":
          case "Body Part Examined":
            xray = lineRead[1];
            break;
          default:
            break;
        }
      });

      //Multiple file upload
      files.forEach((file) => {
        formData.append("attachment[]", file);
      });

      formData.append("patient_id", patientId);
      formData.append("name", patientName);
      formData.append("age", patientSex);
      formData.append("gender", "");
      formData.append("xray_name", xray);
      formData.append("history", history);
      formData.append("ref_doctor", ref_doctor);
      formData.append("study_for", "xray_dr");
      formData.append("rtype", "xry");
      formData.append("status", "pending");

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
    };
  };

  return (
    <Layout panel="Quick Send Report">
      <form
        onSubmit={handleSubmit}
        className="form-horizontal yap-form"
        encType="multipart/form-data"
      >
        <div className="row form-group">
          <div className="col-md-3">
            <label htmlFor="single">Choose Text file</label>
          </div>
          <div className="col-md-9">
            <input type="file" name="fileInput" accept=".txt" />
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
            <label htmlFor="address">History</label>
          </div>
          <div className="col-md-9">
            <div className="row">
              <div className="col-md-6">
                <input
                  type="text"
                  name="history"
                  id="history"
                  value={history}
                  onChange={(e) => setHistory(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="col-md-6">
                <select
                  className="form-control"
                  onChange={handleHistoryChange}
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
            <label htmlFor="address">Ref. Doctor</label>
          </div>
          <div className="col-md-9">
            <div className="row">
              <div className="col-md-6">
                <input
                  type="text"
                  name="ref_doctor"
                  placeholder="Refer Doctor"
                  className="form-control"
                  value={ref_doctor}
                  onChange={(e) => setRefDoctor(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <select
                  className="form-control"
                  onChange={handleRefDoctorChange}
                  style={{ height: "38px", marginLeft: "15px" }}
                >
                  <option value="">--Select--</option>
                  <ReferenceOptionList />
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="row form-group" style={{ clear: "both" }}>
          <InputButton type="submit" name="Submit" value="Submit" />
        </div>
        <ToastContainer />
      </form>
    </Layout>
  );
}

export default QuickSend;
