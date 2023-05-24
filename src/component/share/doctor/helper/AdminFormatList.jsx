import axios from "axios";
import { useEffect, useState } from "react";
 


export default function AdminFormatList({handleSetComment }){  
    const [formats, setformat] = useState([]);

    const getFormatList = () => {
      const token = JSON.parse(localStorage.getItem("token"));
  
      axios
        .get("https://api.desherkhobor24.com/doctor-formats/adminlist/", {
          headers: { authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setformat(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
  
    useEffect(() => {
      getFormatList();
    }, []);


 

    const handleSelectChange = (event) => {
        const token = JSON.parse(localStorage.getItem("token"));
      const { value } = event.target; 
      if(value !==''){  
      axios
      .get(`https://api.desherkhobor24.com/doctor-formats/ajax/${value}`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((response) => { 
        handleSetComment(response.data.data[0].description);

      })
      .catch((error) => {
        console.log(error);
      });
    }
      // Perform any other actions you want to take based on the selected option
    };
  

    return(
        <>
            <select className="form-control"  onChange={(event) => handleSelectChange(event)}>
                <option value="">Select</option>

                {formats &&
                formats.map((format, index) => {
                return ( 
                <option key={index} value={format._id}>{format.title} </option> 
                );
                })}
               
            </select>
        </>
    )
}

 