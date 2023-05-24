import axios from "axios"; 
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import styled from "styled-components";
import ActionActiveUser from "./ActionActiveUser";
import ActionDeActiveUser from "./ActionDeActiveUser";
import ActionDeleteUser from "./ActionDeleteUser";

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
export default function XrayDctorList() {
  const [users, setUsers] = useState([]);

  const getUserList = () => {
    const token = JSON.parse(localStorage.getItem("token"));
    axios
      .get("https://api.desherkhobor24.com/users/xray-dr", {
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
            <th width="">Email/Username</th>
            <th width="">Type</th>
            <th width="">Designation</th>
            <th width="">Status</th>
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
                  <td>{user.mobile}</td>
                  <td>{user.email}</td>
                  <td>Radiology</td>
                  <td>
                    <img src={user.avatar} alt="" style={{ width: "100px" }} /> 
                  </td>
                  <td>{user.status}</td>
                  <td className="text-center">
                    <div className="btn-group">

                      <Link
                        to={`/admin/change-password/${user._id}`}
                        className="btn btn-success btn-sm"
                      >
                        Chanage Pass
                      </Link>
                      <Link
                        to={`/admin/edit-doctor/${user._id}`}
                        className="btn btn-success btn-sm"
                      >
                        Edit
                      </Link>




                      {user.status === "active" ? (
                        <ActionDeActiveUser
                          itemId={user._id}
                          setUsers={setUsers}
                          users={users}
                          onDeleteSuccess={() => handleDeleteUser(user._id)}
                        />
                      ) : (
                        <ActionActiveUser
                          itemId={user._id}
                          setUsers={setUsers}
                          users={users}
                          onDeleteSuccess={() => handleDeleteUser(user._id)}
                        />
                      )}

                      <ActionDeleteUser
                        itemId={user._id}
                        setUsers={setUsers}
                        users={users}
                        onDeleteSuccess={() => handleDeleteUser(user._id)}
                      />

                      <Link
                        to={`/admin/view-formate/${user._id}`}
                        className="btn btn-primary btn-sm"
                      >
                        Formate
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
