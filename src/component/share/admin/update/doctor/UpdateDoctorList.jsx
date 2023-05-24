import axios from "axios"; 
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
const UpdateDoctorList = () => {
  const [users, setUsers] = useState([]);

  const getUserList = () => {
    const token = JSON.parse(localStorage.getItem("token"));
    axios
      .get("https://api.desherkhobor24.com/users/alldoctors", {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUsers(response.data.data);
      })
      .catch((error) => {});
  };
 
  useEffect(() => {
    getUserList();
  }, []);
 
  return (
    <TableWrapper>
      <table>
        <thead>
          <tr>
            <th>SL</th>
            <th>Name</th> 
            <th width="">Action</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <th>Total</th>
            <th colSpan="6" className="text-left">
              {users.length} Items
            </th>
          </tr>
          {users &&
            users.map((user, index) => {
              return (
                <tr key={index}>
                  <td>{++index}</td>
                  <td>{user.name}</td>
                  
                  <td className="text-center">
                    <div className="btn-group">

                
                      <Link
                        to={`/admin/update-doctor-month/${user._id}`}
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
              {users.length} Items
            </th>
          </tr>
        </tbody>
      </table>
      <ToastContainer />
    </TableWrapper>
  );
}

export default UpdateDoctorList;