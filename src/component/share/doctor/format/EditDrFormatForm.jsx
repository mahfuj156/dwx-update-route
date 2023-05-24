import axios from "axios";
import { Field, Form, Formik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputButton from "../../../ui/button/InputButton";
import TextEditor from "../../input/TextEditor";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";



const EditDrFormatForm = () => {

  const {id} = useParams();


  const [format, setFormat] = useState("");
  useEffect(() => {
    async function fetchFormat() {
      try {
        const token = JSON.parse(localStorage.getItem("token"));
        const response = await axios.get(
          `https://api.desherkhobor24.com/doctor-formats/${id}`,
          {
            headers: { authorization: `Bearer ${token}` },
          }
        );
        console.log(response);
        setFormat(response.data.data[0]);
      } catch (error) {}
    }

    fetchFormat();
  }, [id]);

  if(!format){
    return null;
  } 

  const initialValues = {
    title: format.title,
    description: format.description,
  };

  const config = {
    buttons: ["bold", "italic", "underline", "link", "unlink", "source"],
  };

  const handleSubmit = async (values) => {  
    const token = JSON.parse(localStorage.getItem("token"));
    
    axios
      .put(`https://api.desherkhobor24.com/doctor-formats/${id}`, values, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.status === 200) {
          toast.success("Update successfully!");
        } else {
          toast.error("Error updating!");
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
             value={format.description}
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

export default EditDrFormatForm;
