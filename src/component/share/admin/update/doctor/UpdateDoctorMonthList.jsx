import axios from "axios"; 
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
const UpdateDoctorMonthList = () => {
  const [monthList, setMonth] = useState([]);
  const {id} = useParams();

 
  useEffect(() => {
   
 
    const token = JSON.parse(localStorage.getItem("token"));
    axios
      .get(`https://api.desherkhobor24.com/admin/doctor-bill/${id}`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        setMonth(response.data.data);
      })
      .catch((error) => {});


  }, [id]);

 
  return (
    <TableWrapper>
      <table>
        <thead>
          <tr>
            <th>SL</th>
            <th>Month</th> 
            <th>Total Image</th> 
            <th>Total Bill</th> 
            <th width="">Action</th>
          </tr>
        </thead>

        <tbody>
         
          {monthList &&
            monthList.map((month, index) => {
              return (
                <tr key={index}>
                  <td>{++index}</td>
                  <td>{month._id}</td>
                  <td>{month.total} pics</td>
                  <td>{month.totalAmout} Tk</td>
                  
                  <td className="text-center">
                    <div className="btn-group"> 
                      <Link
                        to={`/admin/update-doctor-month/${id}/${month._id}`}
                        className="btn btn-success btn-sm"
                      >
                        View
                      </Link> 
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

export default UpdateDoctorMonthList;