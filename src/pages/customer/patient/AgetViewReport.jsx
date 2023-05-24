import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../../layout/Layout";
import Viewer from 'viewerjs';
import 'viewerjs/dist/viewer.min.css';


const AgetViewReport = () =>  {
  const { id } = useParams();
  const imagesRef = useRef(null);
  const [patient, setPatient] = useState(""); 


  useEffect(() => {
  const fetchPatient = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
  
    try {
      const response = await fetch(
        `https://api.desherkhobor24.com/customer/patients/${id}`,
        {
          method: "GET",
          headers: { authorization: `Bearer ${token}` },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch patient data.");
      }
      const data = await response.json();

      setPatient(data.data[0]);
    } catch (error) {
    } finally { 
    }
  };
  
    fetchPatient();
  }, [id]); 


  
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

  
  return (
    <Layout panel="View Patient">
      <table className="patientTable">
        <tr>
          <th>Patient ID</th>
          <th>Patient Name</th>
          <th>Patient Age</th>
          <th>Patient Gender</th>
          <th>Refer Doctor</th>
          <th>Xray For</th>
          <th>Hostory</th>
        </tr>
        <tr>
          <td>{patient.patient_id}</td>
          <td>{patient.name}</td>
          <td>{patient.age}</td>
          <td>{patient.gender}</td>
          <td>{patient.ref_doctor}</td>
          <td>{patient.xray_name}</td>
          <td>{patient.history}</td>
        </tr>
      </table>
     

     
  <div className='all-images' ref={imagesRef}>
      {patient.attachment && patient.attachment.map((image, index) => (
        <div key={index}>
          <img src={image} className="img-responsive" alt="" />
        </div>
      ))}
    </div>
 
    </Layout>
  );
}

export default AgetViewReport;