import { useState ,useEffect} from "react";
import SendXrayReport from "../../../component/share/customer/patient/SendXrayReport";
import Layout from "../../../layout/Layout";
import axios from "axios"; 
import { userInfo } from "../../../utils/auth";
import { toast } from "react-toastify"; 
import SendDefaultReport from "../../../component/share/customer/patient/SendDefaultReport";

const SendReport = () =>  {
   
  const { userId } = userInfo();
  const [user, setUser] = useState("");
  const id=userId;
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    axios
      .get(`https://api.desherkhobor24.com/users/${id}`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((response) => { 
        setUser(response.data.data[0]);
       
      })
      .catch((error) => {
        toast.error("Error updating!");
      });
  }, [id]);

  console.log(user);
  return (
    <Layout panel="Send Patient Report"> 
   {user.is_default === "Yes" ? <SendDefaultReport /> : <SendXrayReport />}

    </Layout>
  );
}

export default SendReport;
