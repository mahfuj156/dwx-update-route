import axios from "axios";
import * as Yup from 'yup';
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import InputButton from "../../../ui/button/InputButton";
import CommentTextEditor from "../../input/CommentTextEditor";
import PersonalFormat from "../helper/PersonalFormat";
import AdminFormatList from "../helper/AdminFormatList";
import ImageGallery from "../helper/ImageGallery";
import DoctorTypingBack from "../helper/DoctorTypingBack";
 
const CommentSchema = Yup.object().shape({
  comments: Yup.string().required("Comments is required"), 
});

const handleBeforePaste = (event) => {
  const items = (event.clipboardData || event.originalEvent.clipboardData)
    .items;
  let hasImage = false;
  console.log("items", items[0].type);
  for (let i = 0; i < items.length; i++) {
    if (items[i].type.indexOf("image") === 0) {
      hasImage = true;
      break;
    }
  }
  if (hasImage) {
    alert("some message");
    return false;
  }
  const data = (
    event.clipboardData || event.originalEvent.clipboardData
  ).getData("text/html");
  if (!data) return;
  const doc = new DOMParser().parseFromString(data, "text/html");
  const images = doc.querySelectorAll("img");
  if (!images.length) return;

  alert("some message");
  return false;
};

const config = {
  events: { beforePaste: handleBeforePaste },
  buttons: ["bold", "italic", "underline", "link", "unlink", "source"],
};

export default function ViewPatientDr() {
 
  const navigate = useNavigate();
  const [comments, setComment] = useState(null);
  const { id } = useParams();
  //Get Patient Data


  const initialValues = {
    comments: comments,
    passault: "",
  };

  
  const handleFormSubmit = async (values, { resetForm }) => {
    const token = JSON.parse(localStorage.getItem("token"));
    
    if(values.comments.length >= 20){ 

    if (values.passault.length === 1) {
      values["passault"] = values.passault[0];
    }

    axios
      .put(`https://api.desherkhobor24.com/doctor-patient/${id}`, values, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.status === 200) {
          toast.success("Report comments successfully!");
          navigate("/doctor/patient");
        } else {
          toast.error("Error adding report!");
        }
      })
      .catch((error) => {});

    }
    //  resetForm();
  };


  const handleSetComment = (comment) => {
    setComment(comment);
  };
   
  return (
    <>
    <DoctorTypingBack />
      <div className="container">
<ImageGallery /> 

        <Formik initialValues={initialValues}  validationSchema={CommentSchema} onSubmit={handleFormSubmit}>
          {({ values, setFieldValue,setComment }) => (
            <Form>
              <div className="row">
                <div className="col-md-6">
                <label
                        htmlFor="personalFormat"
                        className="form-control-label"
                      >
                        Personal Format
                      </label>

                      <PersonalFormat handleSetComment={handleSetComment} />

 

                </div>
                <div className="col-md-6" style={{paddingLeft: "25px"}}>
                <label
                        htmlFor="adminFormat"
                        className="form-control-label"
                      >
                        
                        Admin Format
                      </label>
                      <AdminFormatList handleSetComment={handleSetComment} />
                      

                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="row form-group">
                    <div className="col-md-12">
                      <label
                        htmlFor="patient_ids"
                        className="form-control-label" style={{display: "block",
                          clear: "both",
                          paddingTop:" 32px"}}
                      >
                        Patient Comments
                      </label>
<br/>
                      <Field
                        name="comments"
                        value={comments}
                        className="form-control"
                        setFieldValue={setFieldValue}
                        config={config}
                        component={CommentTextEditor}
                      />
                    </div>
                    <br/>
                    <div className="col-md-12">
                      <label
                        htmlFor="patient_ids"
                        className="form-control-label"
                      >
                        <Field type="checkbox" name="passault" value="1" />
                        This report is for medical diagnosis only, not for legal
                        use
                      </label>
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
