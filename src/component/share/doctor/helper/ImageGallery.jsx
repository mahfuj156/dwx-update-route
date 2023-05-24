import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Viewer from 'viewerjs';
import 'viewerjs/dist/viewer.min.css';

function ImageGallery() {
  const { id } = useParams();
  const [patient, setPatient] = useState("");
  const imagesRef = useRef(null);

  useEffect(() => {
    async function fetchPatient() {
      try {
        const token = JSON.parse(localStorage.getItem("token"));
        const response = await axios.get(
          `https://api.desherkhobor24.com/doctor-patient/${id}`,
          {
            headers: { authorization: `Bearer ${token}` },
          }
        );
        setPatient(response.data.data[0]);
      } catch (error) {}
    }

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
    <>
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
    </>
  );
}

export default ImageGallery;
