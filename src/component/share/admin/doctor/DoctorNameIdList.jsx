import axios from "axios";
import { useEffect, useState } from "react";

export default function DoctorNameIdList() {
  const [doctors, setDoctors] = useState([]);

  const getDoctorList = () => {
    const token = JSON.parse(localStorage.getItem("token"));
    axios
      .get("https://api.desherkhobor24.com/users/doctorlist", {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setDoctors(response.data.data);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    getDoctorList();
  }, []);

  return (
    <>
      {doctors &&
        doctors.map((doctor, index) => {
          return (
            <option key={index} value={`${doctor._id}`}>
              {doctor.email}
            </option>
          );
        })}
    </>
  );
}
