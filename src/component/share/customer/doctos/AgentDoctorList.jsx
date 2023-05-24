import axios from "axios";
import HTMLReactParser from "html-react-parser";
import { useEffect, useState } from "react";
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
export default function AgentDoctorList() {
  const [users, setUsers] = useState([]);

  const getUserList = () => {
    const token = JSON.parse(localStorage.getItem("token"));
    axios
      .get("https://api.desherkhobor24.com/doctorlist", {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUsers(response.data.data);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log(users);
  useEffect(() => {
    getUserList();
  }, []);

  const handleDeleteUser = (userId) => {
    const updatedUsers = users.filter((user) => user._id !== userId);
    setUsers(updatedUsers);
  };

  return (
    <TableWrapper>
      <table>
        <thead>
          <tr>
            <th>SL</th>
            <th>Name</th>
            <th width="">Phone</th>
            <th width="">Group</th>
            <th width="">Designation</th>
          </tr>
        </thead>

        <tbody>
          {users &&
            users.map((user, index) => {
              return (
                <tr key={index}>
                  <td>{++index}</td>
                  <td>{user.name}</td>
                  <td>{user.mobile}</td>
                  <td>{user.role === "xray_dr" ? "Imaging" : "ECG"}</td>
                  <td>{HTMLReactParser(user.address)}</td>
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
    </TableWrapper>
  );
}
