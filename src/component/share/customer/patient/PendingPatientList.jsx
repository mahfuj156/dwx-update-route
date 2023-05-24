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
export default function PendingPatientList() {
  const [patients, setPatients] = useState([]);

  const getPatientList = () => {
    const token = JSON.parse(localStorage.getItem("token"));
    axios
      .get("https://api.desherkhobor24.com/customer/patients", {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((response) => {
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
            <th>S.Time</th>
            <th>P.Id</th>
            <th>Name</th>
            <th>Sex</th>
            <th>Age</th>
            <th>Img Type</th>
            <th>Type</th>
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
              const createdAt = new Date(patient.createdAt);

              const createdAtDate = new Date(createdAt.toJSON());
              const formattedTime = createdAtDate.toLocaleTimeString("en-US");
              const formattedDate = createdAtDate.toLocaleDateString("en-US");

              return (
                <tr key={index}>
                  <td>{++index}</td>

                  <td>
                    {formattedDate} <br />
                    {formattedTime}
                  </td>
                  <td>{patient.patient_id} </td>
                  <td>{patient.name} </td>
                  <td>{patient.gender} </td>
                  <td>{patient.age} </td>
                  <td>{patient.xray_name} </td>
                  <td>{patient.rtype} </td>

                  <td>{patient.status}</td>
                  <td>
                    <div className="btn-group">
                      <Link
                        to={`/agent/patient/edit/${patient._id}`}
                        className="btn btn-primary btn-xs"
                      >
                        <i className="fa fa-user"></i> Edit
                      </Link>

                      <Link
                        to={`/agent/patient/view/${patient._id}`}
                        className="btn btn-warning btn-sm"
                      >
                        <i className="fa fa-eye"></i> View
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
