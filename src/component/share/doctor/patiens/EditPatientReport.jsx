import axios from "axios";
import { Field, Form, Formik } from "formik";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import InputButton from "../../../ui/button/InputButton";
import CommentTextEditor from "../../input/CommentTextEditor";
import AdminFormatList from "../helper/AdminFormatList";
import PersonalFormat from "../helper/PersonalFormat"; 
import Viewer from 'viewerjs';
import 'viewerjs/dist/viewer.min.css';
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

export default function EditPatientReport() {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const imagesRef = useRef(null);
  //Get Patient Data
  const [patient, setPatient] = useState("");
  useEffect(() => {
    async function fetchPatient() {
      try {
        const token = JSON.parse(localStorage.getItem("token"));
        const response = await axios.get(
          `https://api.desherkhobor24.com/doctor-patient/view-completed/${id}`,
          {
            headers: { authorization: `Bearer ${token}` },
          }
        );
        setPatient(response.data.data[0]);
      } catch (error) {}
    }

    fetchPatient();
  }, [id]);


  



  

 
 let doctorReply="";
  patient.comment &&
    patient.comment.map((reply) => {
      doctorReply = reply.comments;
    });
 

  
  useEffect(() => {
    const viewer = new Viewer(imagesRef.current, {
      inline: false,
      toolbar: {
        zoomIn: true,
        zoomOut: true,
        oneToOne: true,
        reset: true,
        prev: true,
        play: true,
        next: true,
        rotateLeft: true,
        rotateRight: true,
        flipHorizontal: true,
        flipVertical: true, 
      },
    });

    return () => {
      viewer.destroy();
    };
  }, [patient]);

  
  const initialValues = {
    comments: "",
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
    }else{
     
    }
    //  resetForm();
  };
 

  return (
    <>

    
      <div className="container"> 

      <table className="patientTable">
    <thead>
      <tr> 
        <th>Patient Name</th>
        <th>Patient Age</th>
        <th>Patient Gender</th>
        <th>Refer Doctor</th>
        <th>Xray For</th>
        <th>Hostory</th>
      </tr>
    </thead>
    <tbody>
      <tr> 
        <td>{patient.name}</td>
        <td>{patient.age}</td>
        <td>{patient.gender}</td>
        <td>{patient.ref_doctor}</td>
        <td>{patient.xray_name}</td>
        <td>{patient.history}</td>
      </tr>
    </tbody>
  </table>
   

  <div className='all-images' ref={imagesRef}>
      {patient.attachment && patient.attachment.map((image, index) => (
        <div key={index}>
          <img src={image} className="img-responsive" alt="" />
        </div>
      ))}
    </div>
    
        <Formik initialValues={initialValues} onSubmit={handleFormSubmit}>
          {({ values, setFieldValue }) => (
            <Form>
 

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
                        value={doctorReply}
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
