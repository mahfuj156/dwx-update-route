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
export default function PaymentLists() {
  const [payemntMethods, setPayemntMethod] = useState([]);

  const getMethodList = () => {
    const token = JSON.parse(localStorage.getItem("token"));
    axios
      .get("https://api.desherkhobor24.com/admin/payment-method", {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((response) => { 
        setPayemntMethod(response.data.data); 
      })
      .catch((error) => { 
      });
  }; 

  useEffect(() => {
    getMethodList();
  }, []);

 
  if (!payemntMethods) {
    return null;
  }

  return (
    <TableWrapper>
      <table>
        <thead>
          <tr>
            <th>SL</th>
            <th>Account Type</th>
            <th width="">Account Number</th>  
            <th width="">Action</th>
          </tr>
        </thead>

        <tbody>
         
          {payemntMethods &&
            payemntMethods.map((method, index) => {
              return (
                <tr key={index}>
                  <td>{++index}</td>
                  <td>{method.number}</td> 
                  <td>{HTMLReactParser(method.payment_type)}</td> 
                  
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
              {payemntMethods.length} Items
            </th>
          </tr>
        </tbody>
      </table>
    </TableWrapper>
  );
}
