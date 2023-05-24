import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PrintButton from "../../../ui/button/PrintButton";

export default function AgentBillDetail() {
  const { monthYear } = useParams();

  const [bill, setBill] = useState("");
  useEffect(() => {
    const fetchBill = async () => {
      const token = JSON.parse(localStorage.getItem("token"));

      try {
        const response = await fetch(
          `https://api.desherkhobor24.com/bill/${monthYear}`,
          {
            method: "GET",
            headers: { authorization: `Bearer ${token}` },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch patient data.");
        }
        const data = await response.json();

        setBill(data);
      } catch (error) {
      } finally {
      }
    };

    fetchBill();
  }, [monthYear]);

  let totalAmout = 0;
  let tatalPics = 0;

  const dateParts = monthYear.split("-");
  const monthIndex = parseInt(dateParts[0]) - 1;
  const year = dateParts[1];
  const monthName = new Date(Date.UTC(2000, monthIndex)).toLocaleString(
    "en-us",
    { month: "long" }
  );
  const yearName = new Date(Date.UTC(year, 0)).getFullYear();

  let status = "Pending";
  if (
    typeof bill.payment === "object" &&
    Array.isArray(bill.payment) &&
    bill.payment !== null &&
    bill.payment.length > 0 &&
    bill.payment[0].status !== undefined
  ) {
    status = bill.payment[0].status;
  }
  return (
    <>
      <h3 style={{ margin: "15px 0" }}>Month: {monthName + "-" + yearName}</h3>
      <h4>Status : {status}</h4>
      <PrintButton />
      <table className="patientTable">
        <thead>
          <tr>
            <th style={{ width: "70px" }}>SL</th>
            <th>Item</th>
            <th>Total Image</th>
            <th>Sub Total Amout</th>
          </tr>
        </thead>
        <tbody>
          {bill &&
            bill.data.map((bill, index) => {
              totalAmout = totalAmout + bill.totalAmout;
              tatalPics += bill.totalItem;
              return (
                <tr key={index}>
                  <td>{++index}</td>
                  <td>{bill._id}</td>
                  <td>{bill.totalItem} Pics</td>
                  <td>{bill.totalAmout} Taka</td>
                </tr>
              );
            })}

          <tr>
            <th colSpan="2">Total</th>
            <th colSpan="">{tatalPics} Pics</th>
            <th colSpan="">{totalAmout} Taka</th>
          </tr>
        </tbody>
      </table>
    </>
  );
}
