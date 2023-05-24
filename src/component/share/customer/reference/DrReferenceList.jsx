import axios from "axios";
import { useEffect, useState } from "react";

import styled from "styled-components";
import ActionDeleteReference from "./ActionDeleteReference";

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
export default function DrReferenceList() {
  const [references, setReference] = useState([]);

  const getReferenceList = () => {
    const token = JSON.parse(localStorage.getItem("token"));
    axios
      .get("https://api.desherkhobor24.com/agent/references", {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setReference(response.data.data);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    getReferenceList();
  }, []);

  //Delete action
  const handleDeleteUser = (IDE) => {
    const updatedReference = references.filter(
      (reference) => reference._id !== IDE
    );
    setReference(updatedReference);
  };

  return (
    <TableWrapper>
      <table>
        <thead>
          <tr>
            <th width="2%">Sl</th>
            <th>Name</th>
            <th width="6%">Action</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <th>Total</th>
            <th colSpan="2" className="text-left">
              {references.length} Items
            </th>
          </tr>
          {references &&
            references.map((reference, index) => {
              return (
                <tr key={index}>
                  <td>{++index}</td>
                  <td>{reference.name} </td>
                  <td>
                    <div className="btn-group">
                      <ActionDeleteReference
                        itemId={reference._id}
                        setReference={setReference}
                        references={references}
                        onDeleteSuccess={() => handleDeleteUser(reference._id)}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          <tr>
            <th>Total</th>
            <th colSpan="2" className="text-left">
              {references.length} Items
            </th>
          </tr>
        </tbody>
      </table>
    </TableWrapper>
  );
}
