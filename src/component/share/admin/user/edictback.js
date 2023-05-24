import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import DoctorList from "./DoctorList";

const validationSchema = Yup.object().shape({
  name: Yup.string(),
  role: Yup.string(),
  email: Yup.string(),
  mobile: Yup.string(),
  password: Yup.string(),
  selectDoctor: Yup.string(),
  ignoreDoctor: Yup.string(),
  address: Yup.string(),
  single: Yup.number(),
  double: Yup.number(),
  multiple: Yup.number(),
  ecg: Yup.number(),
  city: Yup.number(),
});

export default function EditUserForm() {
  const [userData, setUserData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    axios
      .get(`https://api.desherkhobor24.com/users/${id}`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUserData(response.data.data[0]);
      })
      .catch((error) => {});
  }, [id]);

  const initialValues = {
    name: userData.name || "",
    role: "user",
    email: userData.email || "",
    mobile: userData.mobile || "",
    password: "",
    address: userData.address || "",
    selectDoctor: userData.selected_dr || "",
    ignoreDoctor: userData.ignore_dr || "",
    single: userData.single || 0,
    double: userData.double || 0,
    multiple: userData.multiple || 0,
    ecg: userData.ecg || 0,
    city: userData.city || 0,
  };
  console.log(initialValues);
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        const token = JSON.parse(localStorage.getItem("token"));
        // Here you can make your API call using the values object

        axios
          .put(`https://api.desherkhobor24.com/users/${id}`, values, {
            headers: { authorization: `Bearer ${token}` },
          })
          .then((response) => {})
          .catch((error) => {});
        setSubmitting(false);
      }}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form>
          <div className="row form-group">
            <div className="col-md-3">
              <label className="form-control-label">DC / Doctor Name</label>
            </div>
            <div className=" col-md-9">
              <Field
                type="text"
                name="name"
                value={initialValues.name}
                className="form-control"
                placeholder="Diagnostic Name"
              />
              {errors.name && touched.name ? (
                <div className="required">{errors.name}</div>
              ) : null}
            </div>
          </div>

          <div className="row form-group">
            <div className="col-md-3">
              <label className="form-control-label">Role</label>
            </div>
            <div className=" col-md-9">
              <Field
                type="text"
                name="role"
                value={initialValues.role}
                className="form-control"
                placeholder="Role"
              />
              {errors.role && touched.role ? (
                <div className="required">{errors.role}</div>
              ) : null}
            </div>
          </div>

          <div className="row form-group">
            <div className="col-md-3">
              <label className="form-control-label">Email / Username</label>
            </div>
            <div className=" col-md-9">
              <Field
                type="text"
                name="email"
                value={initialValues.email}
                className="form-control"
                placeholder="Email / Username"
              />
              {errors.email && touched.email ? (
                <div className="required">{errors.email}</div>
              ) : null}
            </div>
          </div>

          <div className="row form-group">
            <div className="col-md-3">
              <label className="form-control-label">Mobile Number</label>
            </div>
            <div className=" col-md-9">
              <Field
                type="text"
                name="mobile"
                value={initialValues.mobile}
                className="form-control"
                placeholder="Mobile Number"
              />
              {errors.mobile && touched.mobile ? (
                <div className="required">{errors.mobile}</div>
              ) : null}
            </div>
          </div>

          <div className="row form-group">
            <div className="col-md-3">
              <label className="form-control-label">Password</label>
            </div>
            <div className=" col-md-9">
              <Field
                type="password"
                className="form-control"
                name="password"
                placeholder="Password"
              />
              {errors.password && touched.password ? (
                <div className="required">{errors.password}</div>
              ) : null}
            </div>
          </div>

          <div className="row form-group">
            <div className="col-md-3">
              <label htmlFor="address" className="form-control-label">
                Address / Designation
              </label>
            </div>
            <div className=" col-md-9">
              <Field name="address">
                {({ field }) => (
                  <div className="form-group">
                    <textarea
                      {...field}
                      id="address"
                      value={initialValues.address}
                      className="form-control"
                    />
                    <ErrorMessage
                      name="address"
                      component="div"
                      className="invalid-feedback required"
                    />
                  </div>
                )}
              </Field>
            </div>
          </div>

          <div className="row form-group">
            <div className="col-md-3">
              <label className="form-control-label">Select Doctor</label>
            </div>
            <div className=" col-md-9">
              <Field
                as="select"
                value={initialValues.selectDoctor}
                className="form-control"
                name="selectDoctor"
                placeholder="Select Doctor"
              >
                <DoctorList />
              </Field>
              {errors.selectDoctor && touched.selectDoctor ? (
                <div className="required">{errors.selectDoctor}</div>
              ) : null}
            </div>
          </div>

          <div className="row form-group">
            <div className="col-md-3">
              <label className="form-control-label">Ignore Doctor</label>
            </div>
            <div className=" col-md-9">
              <Field
                as="select"
                className="form-control"
                name="ignoreDoctor"
                value={initialValues.ignoreDoctor}
                placeholder="Ignore Doctor"
              >
                <DoctorList />
              </Field>
              {errors.ignoreDoctor && touched.ignoreDoctor ? (
                <div className="required">{errors.ignoreDoctor}</div>
              ) : null}
            </div>
          </div>

          <div className="row form-group">
            <div className="col-md-3">
              <label className="form-control-label">Single Image Price</label>
            </div>
            <div className=" col-md-9">
              <Field
                type="number"
                value={initialValues.single}
                className="form-control"
                name="single"
                placeholder="30"
              />
              {errors.single && touched.single ? (
                <div className="required">{errors.single}</div>
              ) : null}
            </div>
          </div>

          <div className="row form-group">
            <div className="col-md-3">
              <label className="form-control-label">Double Image Price</label>
            </div>
            <div className=" col-md-9">
              <Field
                type="number"
                value={initialValues.double}
                className="form-control"
                name="double"
                placeholder="80"
              />
              {errors.double && touched.double ? (
                <div className="required">{errors.double}</div>
              ) : null}
            </div>
          </div>

          <div className="row form-group">
            <div className="col-md-3">
              <label className="form-control-label">Multiple Image Price</label>
            </div>
            <div className=" col-md-9">
              <Field
                type="number"
                value={initialValues.multiple}
                name="multiple"
                className="form-control"
                placeholder="120"
              />
              {errors.multiple && touched.multiple ? (
                <div className="required">{errors.multiple}</div>
              ) : null}
            </div>
          </div>
          <div className="row form-group">
            <div className="col-md-3">
              <label className="form-control-label">ECG Image Price</label>
            </div>
            <div className=" col-md-9">
              <Field
                type="number"
                value={initialValues.ecg}
                className="form-control"
                name="ecg"
                placeholder="40"
              />
              {errors.ecg && touched.ecg ? (
                <div className="required">{errors.ecg}</div>
              ) : null}
            </div>
          </div>

          <div className="row form-group">
            <div className="col-md-3">
              <label className="form-control-label">CT Price</label>
            </div>
            <div className=" col-md-9">
              <Field
                type="number"
                value={initialValues.city}
                className="form-control"
                placeholder="300"
                name="city"
              />
              {errors.city && touched.city ? (
                <div className="required">{errors.city}</div>
              ) : null}
            </div>
          </div>

          <div className="row form-group">
            <div className="col-md-3"></div>
            <div className=" col-md-9">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                Submit
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
