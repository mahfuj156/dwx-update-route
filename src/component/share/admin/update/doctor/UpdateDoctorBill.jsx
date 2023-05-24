import axios from "axios"; 
import { useEffect, useState } from "react";
import {   Link, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
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
const UpdateDoctorBill = () => {
  const [monthList, setMonth] = useState([]);
  const {id,month} = useParams();

 
  useEffect(() => {
   
 
    const token = JSON.parse(localStorage.getItem("token"));
    axios
      .get(`https://api.desherkhobor24.com/admin/doctor-bill/${id}/${month}`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        setMonth(response.data.data);
      })
      .catch((error) => {});


  }, [id,month]);

 
  return (
    <TableWrapper>
      <table>
        <thead>
          <tr>
            <th>SL</th> 
            <th>Xray Name</th> 
            <th>View Image</th> 
            <th width="">Action</th>
          </tr>
        </thead>

        <tbody> 
         
          {monthList &&
            monthList.map((month, index) => {
              return (
                <tr key={index}>
                  <td>{++index}</td> 
                  <td>{month.patientData[0].xray_name}</td> 
                  <td> 
                  <Link
                        to={`/admin/view-patient/${month.patient_id}`}
                        className="btn btn-warning btn-sm"
                      >
                        <i className="fa fa-eye"></i> View
                      </Link>

                  </td>
                  
                  <td className="text-center">
                    <div className="btn-group"> 
                      <select>
                        <option value="">Select</option>
                        <option value="single">Single</option>
                        <option value="double">Double</option>
                        <option value="multiple">Multiple</option>
                        <option value="ecg">ECG</option>
                      </select>
                    </div>
                  </td>
                </tr>
              );
            })}
          <tr>
            <th>Total</th>
            <th colSpan="6" className="text-left">
              {monthList.length} Items
            </th>
          </tr>
        </tbody>
      </table>
      <ToastContainer />
    </TableWrapper>
  );
}

export default UpdateDoctorBill;