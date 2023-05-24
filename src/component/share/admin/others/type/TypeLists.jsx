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
export default function TypeLists() {
  const [types, setType] = useState([]);

  const getTypeList = () => {
    const token = JSON.parse(localStorage.getItem("token"));
    axios
      .get("https://api.desherkhobor24.com/admin/types", {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((response) => { 
        setType(response.data.data); 
      })
      .catch((error) => { 
      });
  }; 

  useEffect(() => {
    getTypeList();
  }, []);

 
  if (!types) {
    return null;
  }

  return (
    <TableWrapper>
      <table>
        <thead>
          <tr>
            <th>SL</th>
            <th>Xray Type Name</th> 
            <th width="">Action</th>
          </tr>
        </thead>

        <tbody>
         
          {types &&
            types.map((method, index) => {
              return (
                <tr key={index}>
                  <td>{++index}</td>
                  <td>{method.name}</td>  
                  
                  <td className="text-center">
                    <div className="btn-group">
                      

                  
                    </div>
                  </td>
                </tr>
              );
            })}
          <tr>
            <th>Total</th>
            <th colSpan="6" className="text-left">
              {types.length} Items
            </th>
          </tr>
        </tbody>
      </table>
    </TableWrapper>
  );
}
