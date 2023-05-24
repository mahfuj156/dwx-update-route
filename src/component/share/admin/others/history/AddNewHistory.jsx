import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import InputButton from "../../../../ui/button/InputButton";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"), // Corrected the field name 
});

export default function AddNewHistory() {
  return (
    <Formik
      initialValues={{
        name: "", // Added a value for name field 
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting ,resetForm }) => {
        const token = JSON.parse(localStorage.getItem("token"));
   
        axios
          .post("https://api.desherkhobor24.com/admin/histories", values, {
            headers: { authorization: `Bearer ${token}` },
          })
          .then((response) => {
            if (response.status === 200) {
              toast.success("Data added successfully!");
            } else {
              toast.error("Error adding data!");
            }

          })
          .catch((error) => {});
          resetForm();
        setSubmitting(false);
      }}
    >
      {({ errors, touched, isSubmitting, setFieldValue }) => (
        <Form>
          <div className="row form-group">
            <div className="col-md-3">
              <label className="form-control-label">History Name </label>
            </div>
            <div className=" col-md-9">
              <Field
                type="text"
                name="name"
                className="form-control"
                placeholder="History Name"
              />
              {errors.name && touched.name ? ( // Corrected the error message field name
                <div className="required">{errors.name}</div>
              ) : null}
            </div>
          </div>
          

          <div className="row form-group">
            <div className="col-md-3"></div>
            <div className=" col-md-9">
              <InputButton type="submit" name="Submit" value="Submit" />
            </div>
          </div>
          <ToastContainer />
        </Form>
      )}
    </Formik>
  );
}
