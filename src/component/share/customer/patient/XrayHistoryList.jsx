import axios from "axios";
import { useEffect, useState } from "react";

export default function XrayHistoryList() {


  const [histories, setHistory] = useState([]);
  useEffect(() => {
    async function fetchHistories() {
      try {
        const token = JSON.parse(localStorage.getItem("token"));
        const response = await axios.get(
          "https://api.desherkhobor24.com/agent/histories",
          {
            headers: { authorization: `Bearer ${token}` },
          }
        );
        setHistory(response.data.data);
      } catch (error) {}
    }

    fetchHistories();
  }, []);



  return (
    <> 
    {histories &&
    histories.map((history,index) => {
      return(
        <option key={index} value={history.name}>{history.name}</option>
      )
    })}
     
  </>
  );
}
