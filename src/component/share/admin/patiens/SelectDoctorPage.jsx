import axios from "axios";
import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import InputButton from "../../../ui/button/InputButton";

export default function SelectDoctorPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  //Select doctors
  const [doctors, setDoctors] = useState([]);
  async function fetchDoctors() {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await axios.get(
        "https://api.desherkhobor24.com/users/alldoctors",
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      setDoctors(response.data.data);
    } catch (error) {}
  }

  useEffect(() => {
    fetchDoctors();
  }, []);

  //Get Patient Data
  const [patient, setPatient] = useState("");
  useEffect(() => {
    async function fetchPatient() {
      try {
        const token = JSON.parse(localStorage.getItem("token"));
        const response = await axios.get(
          `https://api.desherkhobor24.com/admin/patients/${id}`,
          {
            headers: { authorization: `Bearer ${token}` },
          }
        );
        setPatient(response.data.data[0]);
      } catch (error) {}
    }

    fetchPatient();
  }, [id]);

  if (!patient) {
    return null;
  }

  const initialValues = {
    name: patient.name,
    age: patient.age,
    patient_id: patient.patient_id,
    history: patient.history,
    xray_name: patient.xray_name,
    doctor: [],
    ignore_dr: [],
    selected_drs_id: [],
    selected_drs_name: [],
    ignore_drs_id: [],
    ignore_drs_name: [],
  };

  const handleFormSubmit = async (values, { resetForm }) => {
    const selectedIdes = [];
    const selectedNames = [];
    for (let i = 0; i < values.doctor.length; i++) {
      const getRow = values.doctor[i];

      const selectedDoctor = getRow.split("___");
      selectedIdes.push(selectedDoctor[0]);
      selectedNames.push(selectedDoctor[1]);
    }
    const ignoredIdes = [];
    const ignoredNames = [];
    for (let i = 0; i < values.ignore_dr.length; i++) {
      const getRow = values.ignore_dr[i];

      const selectedDoctor_ = getRow.split("___");
      ignoredIdes.push(selectedDoctor_[0]);
      ignoredNames.push(selectedDoctor_[1]);
    }

    values["selected_drs_id"] = selectedIdes;
    values["selected_drs_name"] = selectedNames;
    values["ignore_drs_id"] = ignoredIdes;
    values["ignore_drs_name"] = ignoredNames;

    const token = JSON.parse(localStorage.getItem("token"));

    axios
      .put(
        `https://api.desherkhobor24.com/admin/operation/selectdoctor/${id}`,
        values,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          toast.success("Report added successfully!");
          navigate("/admin/patient-list");
        } else {
          toast.error("Error adding report!");
        }
      })
      .catch((error) => {});

    //  resetForm();
  };

  return (
    <>
      <div className="container">
        <Formik initialValues={initialValues} onSubmit={handleFormSubmit}>
          {({ values, setFieldValue }) => (
            <Form>
              <div className="row">
                <div className="col-md-4">
                  <h3>Select Doctor</h3>
                  <label>
                    <input
                      type="checkbox"
                      id="uncheckselectdc"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFieldValue("doctor", []);
                        } else {
                          setFieldValue("doctor", []);
                        }
                      }}
                    />
                    Uncheck all
                  </label>

                  <ul className="doctor_list_ul select-dc-list">
                    {doctors.map((doc) => (
                      <li key={doc._id}>
                        <Field
                          type="checkbox"
                          name="doctor"
                          checked={values.doctor.includes(
                            doc._id + "___" + doc.email
                          )}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFieldValue("doctor", [
                                ...values.doctor,
                                doc._id + "___" + doc.email,
                              ]);
                            } else {
                              setFieldValue(
                                "doctor",
                                values.doctor.filter(
                                  (d) => d !== doc._id + "___" + doc.email
                                )
                              );
                            }
                          }}
                          className="inp-select-dc"
                          id={`did_${doc._id}`}
                        />
                        <label htmlFor={`did_${doc._id}`}> {doc.name}</label>
                        <br />
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="col-md-4" style={{ background: "#efefef" }}>
                  <h3>Select Ignore Doctor</h3>
                  <label>
                    <input
                      type="checkbox"
                      id="uncheckignoredc"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFieldValue("ignore_dr", []);
                        } else {
                          setFieldValue("ignore_dr", []);
                        }
                      }}
                    />
                    Uncheck all
                  </label>
                  <div className="row form-group">
                    <ul className="doctor_list_ul select-dc-list">
                      {doctors.map((doc) => (
                        <li key={doc._id}>
                          <Field
                            type="checkbox"
                            name="ignore_dr"
                            checked={values.ignore_dr.includes(
                              doc._id + "___" + doc.email
                            )}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFieldValue("ignore_dr", [
                                  ...values.ignore_dr,
                                  doc._id + "___" + doc.email,
                                ]);
                              } else {
                                setFieldValue(
                                  "ignore_dr",
                                  values.ignore_dr.filter(
                                    (d) => d !== doc._id + "___" + doc.email
                                  )
                                );
                              }
                            }}
                            className="inp-select-dc"
                            id={`igid_${doc._id}`}
                          />
                          <label htmlFor={`igid_${doc._id}`}> {doc.name}</label>
                          <br />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="row form-group">
                    <div className="col-md-12">
                      <label
                        htmlFor="patient_ids"
                        className="form-control-label"
                      >
                        Patient ID
                      </label>

                      <Field
                        type="text"
                        name="patient_id"
                        className="form-control"
                      />
                    </div>

                    <div className="col-md-12">
                      <label
                        htmlFor="patient_ids"
                        className="form-control-label"
                      >
                        Patient Name
                      </label>

                      <Field type="text" name="name" className="form-control" />
                    </div>

                    <div className="col-md-12">
                      <label
                        htmlFor="patient_ids"
                        className="form-control-label"
                      >
                        Patient Age
                      </label>

                      <Field type="text" name="age" className="form-control" />
                    </div>

                    <div className="col-md-12">
                      <label
                        htmlFor="patient_ids"
                        className="form-control-label"
                      >
                        Patient History
                      </label>

                      <Field
                        type="text"
                        name="history"
                        className="form-control"
                      />
                    </div>

                    <div className="col-md-12">
                      <label
                        htmlFor="patient_ids"
                        className="form-control-label"
                      >
                        Study Type
                      </label>

                      <Field
                        type="text"
                        name="xray_name"
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row form-group" style={{ clear: "both" }}>
                <InputButton type="submit" name="Submit" value="Submit" />
              </div>
              <ToastContainer />
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}
