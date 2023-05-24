import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

import DoctorList from "./user/DoctorList";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  role: Yup.string().required("Required"),
  email: Yup.string().required("Required"),
  mobile: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
  selectDoctor: Yup.string().required("Required"),
  ignoreDoctor: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
  single: Yup.number().required("Required"),
  double: Yup.number().required("Required"),
  multiple: Yup.number().required("Required"),
  ecg: Yup.number().required("Required"),
  city: Yup.number().required("Required"),
});

export default function AddUserForm() {
  return (
    <Formik
      initialValues={{
        name: "",
        role: "user",
        email: "",
        mobile: "",
        password: "",
        address: "",
        selectDoctor: "",
        ignoreDoctor: "",
        single: 0,
        double: 0,
        multiple: 0,
        ecg: 0,
        city: 0,
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        const token = JSON.parse(localStorage.getItem("token"));
        // Here you can make your API call using the values object

        axios
          .post("https://api.desherkhobor24.com/users", values, {
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
                className="form-control"
                name="single"
                placeholder="Single Image Price"
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
                className="form-control"
                name="double"
                placeholder="Double Image Price"
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
                name="multiple"
                className="form-control"
                placeholder="Multiple Image Price"
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
                className="form-control"
                name="ecg"
                placeholder="ECG Image Price"
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
              <Field type="number" className="form-control" name="city" />
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
