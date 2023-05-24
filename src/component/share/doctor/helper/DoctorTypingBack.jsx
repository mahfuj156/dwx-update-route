import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
export default function DoctorTypingBack() {
  const { id } = useParams();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleTypeingBack = async () => {
    setError(null);
    const token = JSON.parse(localStorage.getItem("token"));

    const response = await fetch(
      `https://api.desherkhobor24.com/doctor-patient/view-other/${id}`,
      {
        method: "PUT", 
        headers: { authorization: `Bearer ${token}` },
      }
    ); 
    navigate("/doctor/patient");
    if (response.status === 200) {
      toast.success("Typing Back successfully!");
    }
  };

  return (
    <div className="" >
      <button onClick={handleTypeingBack} className="btn btn-success btn-md" style={{marginBottom: "15px",    padding: "10px !important"}}>
        {"<< Back to Other Report"}
        <i className="fa fa-trash"></i>
        {error && <span className="text-danger ml-2">{error}</span>}
      </button>
      <ToastContainer />
    </div>
  );
}
