import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PrintButton from "../../../ui/button/PrintButton";
import CheckeduserOptionList from "../checkeduser/CheckeduserOptionList";
import HTMLReactParser from "html-react-parser";
export default function AgentPrintPatient() {
  const { id } = useParams();
  const [fieldValue, setFieldValue] = useState("");
  const [patient, setPatient] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  
  const [marginTop, setMarginTop] = useState(2);

  const handleMarginTopChange = (e) => {
    setMarginTop(e.target.value);
  };

  const printStyle = `@media print {
    body {
      margin-top: ${marginTop}in;
    }
  }`;

  const fetchPatient = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.desherkhobor24.com/customer/patients/print/${id}`,
        {
          method: "GET",
          headers: { authorization: `Bearer ${token}` },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch patient data.");
      }
      const data = await response.json();

      setPatient(data.data[0]);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchPatient();
  }, []);

  if (isLoading) {
    return null;
  }

  
  

  if (!patient) {
    return null;
  }



 
  const createdAt = new Date(patient.createdAt);

  const createdAtDate = new Date(createdAt.toJSON());
  const formattedTime = createdAtDate.toLocaleTimeString("en-US");
  const formattedDate = createdAtDate.toLocaleDateString("en-US");
  const currentDate = new Date();

  const currentDateTime = currentDate.toLocaleString("en-US");

  return (
    <>

<style type="text/css" id="print-style">
        {printStyle} 
      </style>
      <div className="page-header print-none">
        <div className="row">
          <div className="col-md-2">
            <h1>Print </h1>
          </div>
          <form action="">
            <div className="col-md-4">
              
      <div className="form-group">
        <div className="input-group">
        <div
            className="input-group-addon btn-primary"
            style={{ backgroundColor: '#337ab7', color: '#FFF', borderColor: '#2e6da4' }}
          >
            Margin Top
          </div>
          <div className="row">
            <div className="col-md-6">
            <input
            id="margin-top"
            required
            value={marginTop}
            type="text"
            name="margin-top" 
            style={{marginTop: "5px",marginBottom: "10px"}}
            className="form-control"
            onChange={handleMarginTopChange}
          />
            </div>
            <div className="col-md-6">
            <PrintButton   />
            </div>
          </div>
      
       
        </div>
      </div>
            
            </div>
          </form>
        </div>
      </div>

      <table className="patientTable">
        <tbody>
          <tr>
            <td width="28%">
              <strong> Patient ID:</strong> {patient.patient_id}
            </td>

            <td>
              <strong> Patient Name: </strong> {patient.name}
            </td>

            <td width="">
              <strong> Age: </strong> {patient.age}
            </td>
          </tr>
          <tr>
            <td>
              <strong>Date:</strong> {formattedDate} {formattedTime}
            </td>

            <td>
              <strong>Print Date Time:</strong> {currentDateTime}
            </td>
            <td colSpan="">
              <strong>Sex:</strong> {patient.gender}
            </td>
          </tr>

          <tr>
            <td colSpan="4">
              <strong>Reference By: </strong> {patient.ref_doctor}
            </td>
          </tr>
        </tbody>
      </table>

      <h3 className="text-center mt-5 mb-4 xray-of-title">
        <u> X-Ray Report of {patient.xray_name} </u>
      </h3>

     <div>
      
      {HTMLReactParser(patient.comment[0].comments)}
      </div>

      <div className="row signatureSection">
        <div className="col-md-9">
          <p>
            <u >Signature</u> 
          
          </p>
          <img src={patient.userInfo[0].avatar} alt="" style={{width: "100px"}} />
             {HTMLReactParser(patient.userInfo[0].address)}
        </div>
        <div className="col-md-3">
          <h4
            className="checkbytitle"
            style={{ borderBottom: "1px solid #111", display: "inline-block" }}
          >
            Prepared by
          </h4>

          <p>{fieldValue}</p>

          <select
            className="  print-none"
            onChange={(e) => setFieldValue(e.target.value)}
            style={{ height: "38px", marginLeft: "15px" }}
          >
            <option value="">--Select--</option>
            <CheckeduserOptionList />
          </select>
        </div>
      </div>
    </>
  );
}
