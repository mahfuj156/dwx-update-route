import axios from "axios";
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
export default function AdminFormatLists() {
  const [formats, setformat] = useState([]);

  const getFormatList = () => {
    const token = JSON.parse(localStorage.getItem("token"));

    axios
      .get("https://api.desherkhobor24.com/admin/formats", {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setformat(response.data.data);
      })
      .catch((error) => { 
      });
  };

  useEffect(() => {
    getFormatList();
  }, []);

  return (
    <TableWrapper>
      <table>
        <thead>
          <tr>
            <th width="2%">Sl</th>
            <th>Title</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {formats &&
            formats.map((format, index) => {
              return (
                <tr key={index}>
                  <td>{++index}</td>
                  <td>{format.title} </td>
                  <td>
                    <div className="btn-group">
                      
                    </div>
                  </td>
                </tr>
              );
            })}
          <tr>
            <th>Total</th>
            <th colSpan="11" className="text-left">
              {formats.length} Items
            </th>
          </tr>
        </tbody>
      </table>
    </TableWrapper>
  );
}
