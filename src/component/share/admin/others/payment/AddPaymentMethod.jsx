import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import InputButton from "../../../../ui/button/InputButton";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const validationSchema = Yup.object().shape({
  number: Yup.string().required("Required"), // Corrected the field name
  payment_type: Yup.string().required("Required"),
});

export default function AddPaymentMethod() {
  return (
    <Formik
      initialValues={{
        number: "", // Added a value for number field
        payment_type: "Rocket", // Added a default value for payment_type field
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting,resetForm }) => {
        const token = JSON.parse(localStorage.getItem("token"));
   
        axios
          .post("https://api.desherkhobor24.com/admin/payment-method", values, {
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
              <label className="form-control-label">Payment Number</label>
            </div>
            <div className=" col-md-9">
              <Field
                type="text"
                name="number"
                className="form-control"
                placeholder="Payment Number"
              />
              {errors.number && touched.number ? ( // Corrected the error message field name
                <div className="required">{errors.number}</div>
              ) : null}
            </div>
          </div>
          <div className="row form-group">
            <div className="col-md-3">
              <label className="form-control-label">Payment Type</label>
            </div>
            <div className=" col-md-9">
              <Field as="select" name="payment_type" className="form-control">
                <option value="Rocket">Rocket</option>
                <option value="Bkash">Bkash</option>
                <option value="Nagad">Nagad</option>
                <option value="Bank">Bank</option>
              </Field>
              {errors.payment_type && touched.payment_type ? (
                <div className="required">{errors.payment_type}</div>
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
