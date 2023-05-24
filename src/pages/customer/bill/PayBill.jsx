import { useParams } from "react-router-dom";
import AgentBillPay from "../../../component/share/customer/bill/AgentBillPay";
import Layout from "../../../layout/Layout";


const PayBill = () => {
  const { monthYear } = useParams();

  const dateParts = monthYear.split("-");
  const monthIndex = parseInt(dateParts[0]) - 1;
  const year = dateParts[1];
  const monthName = new Date(Date.UTC(2000, monthIndex)).toLocaleString(
    "en-us",
    { month: "long" }
  );
  const yearName = new Date(Date.UTC(year, 0)).getFullYear();
  return (
    <Layout panel="Pay Bill">
      <div className="panel-body card-block" style={{ margin: "30px 0" }}>
        <h2 className="text-center text-success">
          Month : {monthName}-{yearName}
        </h2>
      </div>

      <div className="col-md-6">
        <AgentBillPay />
      </div>
      <div className="col-md-6 ">
        <div style={{ paddingLeft: "30px" }}>
          <h3 className="h4">Payment Methods: Rocket, Bkash, DBBL</h3>
          <strong>Money Received Account Number List</strong>

          <div className="table-responsive">
            <table className="table">
              <tbody>
                <tr>
                  <td> 01759-49-7773 Office (Personal) (Bkash)</td>
                </tr>

                <tr>
                  <td> 017-55-22-63-20-9 Sakib (Personal) (Rocket)</td>
                </tr>

                <tr>
                  <td> 017-55-22-63-20 Sakib (Personal) (Nagad)</td>
                </tr>

                <tr>
                  <td> 017-55-22-63-20 Sakib (Personal) (Bkash)</td>
                </tr>

                <tr>
                  <td> 01740-009049 Sakhawat (Personal) (Bkash)</td>
                </tr>

                <tr>
                  <td> 01740-009049 Sakhawat (Personal) (Nagad)</td>
                </tr>

                <tr>
                  <td> DBBL: 164-151-273917 (Bank)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default PayBill;