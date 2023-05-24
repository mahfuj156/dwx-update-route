import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ViewPatientReport() {
  const { id } = useParams();

  const [patient, setPatient] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchPatient = async () => {
      const token = JSON.parse(localStorage.getItem("token"));
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://api.desherkhobor24.com/admin/patients/${id}`,
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
        setIsLoading(false);
      }
    };

    fetchPatient();
  }, [id]);
  if (isLoading) {
    return null;
  }

  if (!patient) {
    return null;
  }
  
  console.log(patient);
  return (
    <>
      <table className="patientTable">
        <thead>
          <tr>
            <th>Patient ID</th>
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
            <td>{patient.patient_id}</td>
            <td>{patient.name}</td>
            <td>{patient.age}</td>
            <td>{patient.gender}</td>
            <td>{patient.ref_doctor}</td>
            <td>{patient.xray_name}</td>
            <td>{patient.history}</td>
          </tr>
        </tbody>
      </table>
      {patient.attachment &&
        patient.attachment.map((pImage, index) => {
          return (
            <img
              src={pImage}
              key={index}
              alt=""
              style={{ width: "250px", margin: "10px" }}
            ></img>
          );
        })}
    </>
  );
}
