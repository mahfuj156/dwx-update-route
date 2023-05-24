import axios from "axios";
import { Field, Formik } from "formik";
import { Form } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import InputButton from "../../../ui/button/InputButton";
import TextBox from "../../input/TextBox";
import TextEditor from "../../input/TextEditor";

export default function AddPatientComplete() {
  const initialValues = {
    title: "",
  };

  const config = {
    buttons: ["bold", "italic", "underline", "link", "unlink", "source"],
  };

  const handleSubmit = async (values) => {
    const form = new FormData();
    form.append("title", values.title);
    form.append("description", values.description);
    console.log(values);
    const token = JSON.parse(localStorage.getItem("token"));
    axios
      .post("https://api.desherkhobor24.com/doctor/format", values, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.status === 200) {
          toast.success("Doctor added successfully!");
        } else {
          toast.error("Error updating doctor!");
        }
      })
      .catch((error) => {});
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ values, setFieldValue }) => (
        <div className="row">
          <div className="col-md-12  mt-10">
            <Form className="form-horizontal" encType="multipart/form-data">
              <div className="col-md-8  mt-10">
                <div className="row">
                  <TextBox
                    type="text"
                    placeholder="Doctor Name"
                    labelText="Doctor Name"
                    name="name"
                  />

                  <TextBox
                    type="text"
                    placeholder="Doctor Name"
                    labelText="Doctor Name"
                    name="name"
                  />
                </div>
              </div>
              <label>Format Title</label>

              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="patientID" className="control-label">
                    Digital X-ray formate
                  </label>
                  <select className="form-control admin-formate">
                    <option value="">select</option>
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="patientID" className="control-label">
                    My personal formate
                  </label>
                  <select className="form-control mypersonal-formate">
                    <option value="">select</option>
                  </select>
                </div>
              </div>

              <Field
                type="text"
                placeholder="Title"
                name="title"
                className="form-control"
                value={values.title}
              />
              <label
                style={{
                  marginTop: "15px",
                  marginBottom: "10px",
                  display: "block",
                }}
              >
                Format Description
              </label>
              <Field
                style={{ marginTop: "15px", display: "block" }}
                name="description"
                setFieldValue={setFieldValue}
                config={config}
                component={TextEditor}
              />

              <InputButton type="submit" name="Submit" value="Submit" />

              <ToastContainer />
            </Form>
          </div>
        </div>
      )}
    </Formik>
  );
}
