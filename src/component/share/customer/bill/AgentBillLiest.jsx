import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
export default function AgentBillLiest() {
  const [bills, setBill] = useState("");

  const getUserList = () => {
    const token = JSON.parse(localStorage.getItem("token"));
    axios
      .get("https://api.desherkhobor24.com/bill", {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setBill(response.data.data);
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
            <th>Month List</th>
            <th>Status</th>
            <th width="160">Action</th>
          </tr>
        </thead>

        <tbody>
          {bills &&
            bills.map((bill, index) => {
              const dateString = bill._id;
              const dateParts = dateString.split("-");
              const monthIndex = parseInt(dateParts[0]) - 1;
              const year = dateParts[1];
              const monthName = new Date(
                Date.UTC(2000, monthIndex)
              ).toLocaleString("en-us", { month: "long" });
              const yearName = new Date(Date.UTC(year, 0)).getFullYear();

              let status = "Pending";
              if (bill.payments.length > 0) {
                status = bill.payments[0].status;
              }
              return (
                <tr key={index}>
                  <td>{++index}</td>
                  <td>{monthName + "-" + yearName}</td>
                  <td>{status}</td>
                  <td>
                    <Link
                      to={`/agent/paybill/${bill._id}`}
                      className="btn btn-success btn-sm"
                    >
                      Pay Bill
                    </Link>
                    <Link
                      to={`/agent/bill/${bill._id}`}
                      className="btn btn-info btn-sm"
                    >
                      View Bill
                    </Link>
                  </td>
                </tr>
              );
            })}

          <tr>
            <th>Total</th>
            <th colSpan="6" className="text-left">
              {bills.length} Items
            </th>
          </tr>
        </tbody>
      </table>
    </TableWrapper>
  );
}
