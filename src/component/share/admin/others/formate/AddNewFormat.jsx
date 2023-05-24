import axios from "axios";
import { Field, Form, Formik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import InputButton from "../../../../ui/button/InputButton";
import TextEditor from "../../../input/TextEditor";

const initialValues = {
  title: "",
};

const AddNewFormat = () => {
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
      .post("https://api.desherkhobor24.com/admin/formats", values, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.status === 200) {
          toast.success("Data added successfully!");
        } else {
          toast.error("Error updating data!");
        }
      })
      .catch((error) => {});
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ values, setFieldValue }) => (
        <Form className="form-horizontal" encType="multipart/form-data">
          <label>Format Title</label>
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
      )}
    </Formik>
  );
};

export default AddNewFormat;
