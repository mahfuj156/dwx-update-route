import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

const TableWrapper = styled.div`
  table {
    width: 100%;
    border: 1px solid rgb(203 203 203);
    border-collapse: collapse;
    & th,
    & td {
      border: 1px solid rgb(203 203 203);
      padding: 5px;
      border-collapse: collapse;

      & .btn-group,
      & .btn-group-vertical {
        position: relative;
        display: inline-block;
        vertical-align: middle;
        & a {
          float: left;
          padding: 3px 4px;
          border: none;
        }
      }
    }
  }
`;
export default function DrCompletedPatientListArchive() {
  const [patients, setPatients] = useState([]);

  const getPatientList = () => {
    const token = JSON.parse(localStorage.getItem("token"));
    axios
      .get("https://api.desherkhobor24.com/doctor-patient/archive-completed", {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        setPatients(response.data.data);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    getPatientList();
  }, []);

  
  return (
    <TableWrapper>
      <table>
        <thead>
          <tr>
            <th width="2%">Sl</th>
            <th>D.C Name</th>
            <th>Complete Date</th>
            <th>P.Id</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Img Type</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <th>Total</th>
            <th colSpan="11" className="text-left">
              {patients.length} Items
            </th>
          </tr>
          {patients &&
            patients.map((patient, index) => {
              const createdAt = new Date(patient.completed_time);

              const createdAtDate = new Date(createdAt.toJSON());
              const formattedTime = createdAtDate.toLocaleTimeString("en-US");
              const formattedDate = createdAtDate.toLocaleDateString("en-US");

              return (
                <tr key={index}>
                  <td>{++index}</td>

                  <td>{patient.customer.name}</td>
                  <td>{formattedDate + "," + formattedTime} </td>
                  <td>{patient.patient_id} </td>
                  <td>{patient.name} </td>
                  <td>{patient.gender} </td>
                  <td>{patient.age} </td>
                  <td>{patient.xray_name} </td>

                  <td>{patient.status}</td>
                  <td>
                    <div className="btn-group">
                      <Link
                        to={`/doctor/edit-report/${patient._id}`}
                        className="btn btn-warning btn-sm"
                      >
                        <i className="fa fa-eye"></i> Edit
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
          <tr>
            <th>Total</th>
            <th colSpan="11" className="text-left">
              {patients.length} Items
            </th>
          </tr>
        </tbody>
      </table>
    </TableWrapper>
  );
}
