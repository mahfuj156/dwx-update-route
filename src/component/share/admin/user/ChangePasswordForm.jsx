import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InputButton from "../../../ui/button/InputButton"; 
import TextBox from "../../input/TextBox";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

const initialValues = {
  password: "",  
};
export default function ChangePasswordForm() {
  const [user, setUser] = useState(initialValues);
  const { id } = useParams(); 
  const handleOnchange = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.type === "file" ? e.target.files[0] : e.target.value,
    }));
  };

  const handleSubmit = async (e) => {

    e.preventDefault(); 
    const form = new FormData();
    form.append("password", user.password);  

    const token = JSON.parse(localStorage.getItem("token"));
    // Here you can make your API call using the values object

    const response = await fetch(`https://api.desherkhobor24.com/users/update-password/${id}`, {
      method: "PUT",
      body: form,
      headers: { authorization: `Bearer ${token}` },
    });

    if (response.status === 200) { 
      toast.success("Passworod change successfully");
    } else {
      toast.error("Error updating user!");
    }
  };
 
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

  

  return (
    <form
      className="form-horizontal"
      encType="multipart/form-data"
      onSubmit={handleSubmit}
    >
      <TextBox
        type="password"
        placeholder="Password"
        labelText="Password"
        name="password" 
        onChange={handleOnchange}
      />

      
 
   

      <InputButton
        type="submit"
        name="Submit"
        value="Submit"
        onChange={handleOnchange}
      />

      <ToastContainer />
    </form>
  );
}
