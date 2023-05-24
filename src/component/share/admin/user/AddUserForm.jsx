import axios from "axios";
import { Field, Form, Formik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputButton from "../../../ui/button/InputButton";
import Select2MultiDoctor from "./Select2MultiDoctor";

const initialValues = {
  name: "",
  email: "",
  password: "",
  mobile: "",
  address: "",
  single: "",
  double: "",
  multiple: "",
  ecg: "",
  city: "",
  ignored_doctor: "",
  selected_doctor: "",
};
const ignoredIdes = [];
const selectedIdes = [];
export default function AddUserForm() {
  const handleSubmit = async (values, { resetForm }) => {
    for (let i = 0; i < values.selected_doctor.length; i++) {
      const getRow = values.selected_doctor[i];

      const selectedDoctor = getRow.split("__");
      selectedIdes.push(selectedDoctor[0]);
    }

    for (let i = 0; i < values.ignored_doctor.length; i++) {
      const getRow = values.ignored_doctor[i];

      const selectedDoctor_ = getRow.split("__");
      ignoredIdes.push(selectedDoctor_[0]);
    }

    const formData = new FormData();

    formData.append("selected_dr", selectedIdes);

    formData.append("ignored_dr", ignoredIdes);

    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("mobile", values.mobile);
    formData.append("address", values.address);
    formData.append("single", values.single);
    formData.append("double", values.double);
    formData.append("multiple", values.multiple);
    formData.append("ecg", values.ecg);
    formData.append("city", values.city);

    const token = JSON.parse(localStorage.getItem("token"));

    axios
      .post("https://api.desherkhobor24.com/users", formData, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.status === 200) {
          toast.success("Doctor added successfully!");
        } else {
          toast.error("Error updating doctor!");
        }
      })
      .catch((error) => {
        console.log(error);
      });

    resetForm();
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ isSubmitting, setFieldValue }) => (
        <Form
          className="form-horizontal yap-form"
          encType="multipart/form-data"
        >
          <div className="row form-group">
            <div className="col-md-3">
              <label htmlFor="role">DC Name</label>
            </div>
            <div className="col-md-9">
              <Field
                type="text"
                placeholder="DC Name"
                name="name"
                className="form-control"
              />
            </div>
          </div>

          <div className="row form-group">
            <div className="col-md-3">
              <label htmlFor="name">Email / Username</label>
            </div>
            <div className="col-md-9">
              <Field
                type="text"
                placeholder="Email/Username"
                name="email"
                className="form-control"
              />
            </div>
          </div>

          <div className="row form-group">
            <div className="col-md-3">
              <label htmlFor="name">Password</label>
            </div>
            <div className="col-md-9">
              <Field
                type="password"
                placeholder="password"
                name="password"
                className="form-control"
              />
            </div>
          </div>

          <div className="row form-group">
            <div className="col-md-3">
              <label htmlFor="name">Mobile Number</label>
            </div>
            <div className="col-md-9">
              <Field
                type="text"
                placeholder="Mobile Number"
                name="mobile"
                className="form-control"
              />
            </div>
          </div>

          <div className="row form-group">
            <div className="col-md-3">
              <label htmlFor="name">Address</label>
            </div>
            <div className="col-md-9">
              <Field
                as="textarea"
                type="text"
                placeholder="Address"
                name="address"
                className="form-control"
              />
            </div>
          </div>

          <div className="row form-group">
            <div className="col-md-3">
              <label htmlFor="name">Single Price</label>
            </div>
            <div className="col-md-9">
              <Field
                type="number"
                placeholder="Single Price"
                name="single"
                className="form-control"
              />
            </div>
          </div>

          <div className="row form-group">
            <div className="col-md-3">
              <label htmlFor="name">Double Price</label>
            </div>
            <div className="col-md-9">
              <Field
                type="number"
                placeholder="Double Price"
                name="double"
                className="form-control"
              />
            </div>
          </div>

          <div className="row form-group">
            <div className="col-md-3">
              <label htmlFor="name">Multiple Price</label>
            </div>
            <div className="col-md-9">
              <Field
                type="number"
                placeholder="Multiple Price"
                name="multiple"
                className="form-control"
              />
            </div>
          </div>

          <div className="row form-group">
            <div className="col-md-3">
              <label htmlFor="name">ECG Price</label>
            </div>
            <div className="col-md-9">
              <Field
                type="number"
                placeholder="ECG Price"
                name="ecg"
                className="form-control"
              />
            </div>
          </div>

          <div className="row form-group">
            <div className="col-md-3">
              <label htmlFor="name">CT Scan Price</label>
            </div>
            <div className="col-md-9">
              <Field
                type="number"
                placeholder="CT Price"
                name="city"
                className="form-control"
              />
            </div>
          </div>

          <div className="row form-group">
            <div className="col-md-3">
              <label htmlFor="address">Selected Doctor</label>
            </div>
            <div className="col-md-9">
              <Field
                name="selected_doctor"
                ide="selected_doctor"
                component={Select2MultiDoctor}
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
                ide="ignored_doctor"
                component={Select2MultiDoctor}
                onChange={(selectedValues) => {
                  setFieldValue("ignored_doctor", selectedValues);
                }}
              />
            </div>
          </div>

          <div className="row form-group">
            <div className="col-md-3"></div>
            <div className="col-md-9">
              <InputButton
                type="submit"
                name="Submit"
                value="Submit"
                disabled={isSubmitting}
              />
            </div>
          </div>
          <ToastContainer />
        </Form>
      )}
    </Formik>
  );
}
