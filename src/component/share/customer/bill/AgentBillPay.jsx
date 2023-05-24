import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import * as Yup from "yup";
import InputButton from "../../../ui/button/InputButton";

const BillSchema = Yup.object().shape({
  amount: Yup.number().required("Amount is required"),
  month_year: Yup.string().required("Month is required"),
  trans_id: Yup.string().required("Transaction ID is required"),
  received_number: Yup.string().required("Received Number is required"),
});

export default function AgentBillPay() {
  const { monthYear } = useParams();

  const [totalAmount, setTotal] = useState(0);
  useEffect(() => {
    const fetchBill = async () => {
      const token = JSON.parse(localStorage.getItem("token"));

      try {
        const response = await fetch(
          `https://api.desherkhobor24.com/bill/${monthYear}`,
          {
            method: "GET",
            headers: { authorization: `Bearer ${token}` },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch patient data.");
        }
        const data = await response.json();

        let _total = 0;
        data &&
          data.data.map((d, index) => {
            _total = _total + d.totalAmout;
            return null;
          });

        setTotal(_total);
      } catch (error) {
      } finally {
      }
    };

    fetchBill();
  }, [monthYear]);

  if (!totalAmount) {
    return null;
  }

  let gTotal = totalAmount + totalAmount * 0.018;

  const initialValues = {
    amount: Math.round(gTotal),
    month_year: monthYear,
    trans_id: "",
    received_number: "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const formData = new FormData();

      formData.append("trans_id", values.trans_id);
      formData.append("month_year", values.month_year);
      formData.append("received_number", values.received_number);
      formData.append("amount", values.amount);
      axios
        .post("https://api.desherkhobor24.com/bill", values, {
          headers: { authorization: `Bearer ${token}` },
        })
        .then((response) => {
          if (response.status === 200) {
            toast.success("Payment send successfully!");
          } else {
            toast.error("Error sending payment!");
          }
        })
        .catch((error) => {});
    } catch (error) {}
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={BillSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form
          className="form-horizontal yap-form"
          encType="multipart/form-data"
        >
          {/* Display the total bill amount */}
          <div className="row form-group">
            <div className="col-md-3">
              <label htmlFor="role">Total Bill</label>
            </div>
            <div className="col-md-9">
              <Field
                name="amount"
                type="number"
                placeholder="Total Bill"
                className="form-control"
                disabled
              />
              <ErrorMessage
                name="amount"
                component="div"
                className="error-message"
              />
            </div>
          </div>

          {/* Display the month and year */}
          <div className="row form-group">
            <div className="col-md-3">
              <label htmlFor="name">Bill For</label>
            </div>
            <div className="col-md-9">
              <Field
                name="month_year"
                type="text"
                placeholder="Month"
                className="form-control"
                disabled
              />
              <ErrorMessage
                name="month_year"
                component="div"
                className="error-message"
              />
            </div>
          </div>

          {/* Allow the user to input the transaction ID */}
          <div className="row form-group">
            <div className="col-md-3">
              <label htmlFor="email">Transaction ID</label>
            </div>
            <div className="col-md-9">
              <Field
                name="trans_id"
                type="text"
                placeholder="Transaction ID"
                className="form-control"
              />
              <ErrorMessage
                name="trans_id"
                component="div"
                className="error-message"
              />
            </div>
          </div>

          {/* Allow the user to input the received number */}
          <div className="row form-group">
            <div className="col-md-3">
              <label htmlFor="password">Received Number</label>
            </div>
            <div className="col-md-9">
              <Field
                name="received_number"
                as="select"
                required
                className="form-control"
              >
                <option value="">Select Number</option>
                <option value="01759-49-7773 Office (Personal) (Bkash)">
                  01759-49-7773 Office (Personal) (Bkash)
                </option>
                <option value="017-55-22-63-20-9 Sakib (Personal) (Rocket)">
                  017-55-22-63-20-9 Sakib (Personal) (Rocket)
                </option>
                <option value="017-55-22-63-20 Sakib (Personal) (Nagad)">
                  017-55-22-63-20 Sakib (Personal) (Nagad)
                </option>
                <option value="017-55-22-63-20 Sakib (Personal) (Bkash)">
                  017-55-22-63-20 Sakib (Personal) (Bkash)
                </option>
                <option value="01740-009049 Sakhawat (Personal) (Bkash)">
                  01740-009049 Sakhawat (Personal) (Bkash)
                </option>
                <option value="01740-009049 Sakhawat (Personal) (Nagad)">
                  01740-009049 Sakhawat (Personal) (Nagad)
                </option>
                <option value="DBBL: 164-151-273917 (Bank)">
                  DBBL: 164-151-273917 (Bank)
                </option>
              </Field>

              <ErrorMessage
                name="received_number"
                component="div"
                className="error-message"
              />
            </div>
          </div>

          {/* Display a submit button */}
          <div className="row form-group" style={{ clear: "both" }}>
            <InputButton
              type="submit"
              name="Submit"
              value="Submit"
              disabled={isSubmitting}
            />
          </div>
          <ToastContainer />
        </Form>
      )}
    </Formik>
  );
}
