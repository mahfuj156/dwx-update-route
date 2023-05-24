import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";
import DeletePatient from "./action/DeletePatient";
import TypingBack from "./action/TypingBack"; 

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
export default function WaitingPatientList() {
  const [patients, setPatients] = useState([]);

  const getPatientList = () => { 
    const token = JSON.parse(localStorage.getItem("token"));
    axios
      .get("https://api.desherkhobor24.com/admin/patients", {
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

  const handleDeleteUser = (itemId) => {
    const updatedPatient = patients.filter((patient) => patient._id !== itemId);
    setPatients(updatedPatient);
  };

  return (
    <TableWrapper>
      <table>
        <thead>
          <tr>
            <th width="2%">Sl</th>
            <th>D.C Name</th>
            <th>S.Time</th>
            <th>P.Id</th>
            <th>Name</th>
            <th>Sex</th>
            <th>Age</th>
            <th>Img Type</th>
            <th>Type</th>
            <th>Selected</th>
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
              let selected = patient.selected_drs_name;
              if (selected.length === 0) {
                selected = "All";
              }
              return (
                <tr key={index}>
                  <td>{++index}</td>

                  <td>{patient.customer.name}</td>
                  <td>{patient.createdAt.toLocaleString("en-US")} </td>
                  <td>{patient.patient_id} </td>
                  <td>{patient.name} </td>
                  <td>{patient.gender} </td>
                  <td>{patient.age} </td>
                  <td>{patient.xray_name} </td>
                  <td>{patient.rtype} </td>

                  <td>
                    {selected}
                    <br />({patient.ignore_drs_name})
                  </td>
                  <td>{patient.status}</td>
                  <td>
                    <div className="btn-group">
                      <TypingBack
                        itemId={patient._id}
                        setPatients={setPatients}
                        patients={patients}
                        onClick="return confirm('are You sure to Active')"
                      />

                      <Link
                        to={`/admin/select-dr/${patient._id}`}
                        className="btn btn-primary btn-xs"
                      >
                        <i className="fa fa-user"></i> S.D
                      </Link>

                      <Link
                        to={`/admin/view-patient/${patient._id}`}
                        className="btn btn-warning btn-sm"
                      >
                        <i className="fa fa-eye"></i> View
                      </Link>
                      <DeletePatient
                        itemId={patient._id}
                        setPatients={setPatients}
                        patients={patients}
                        onDeleteSuccess={() => handleDeleteUser(patient._id)}
                      />
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
