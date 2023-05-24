import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InputButton from "../../../ui/button/InputButton";
import TextArea from "../../input/TextArea";
import TextBox from "../../input/TextBox";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

const initialValues = {
  name: "", 
  mobile: "",
  address: "",
  single: "",
  double: "",
  multiple: "",
  ecg: "",
  city: "",
  selected_dr: "",
  is_default: "",
  hide_bill: "",
};
export default function EditUserForm() {
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
    form.append("name", user.name); 
    form.append("mobile", user.mobile);
    form.append("address", user.address);
    form.append("single", user.single);
    form.append("double", user.double);
    form.append("multiple", user.multiple);
    form.append("ecg", user.ecg);
    form.append("city", user.city);
    form.append("selected_dr", user.selected_dr);
    form.append("is_default", user.is_default);
    form.append("hide_bill", user.hide_bill);

    const token = JSON.parse(localStorage.getItem("token"));
    // Here you can make your API call using the values object

    const response = await fetch(`https://api.desherkhobor24.com/users/${id}`, {
      method: "PUT",
      body: form,
      headers: { authorization: `Bearer ${token}` },
    });

    if (response.status === 200) { 
      toast.success("Data update successfully");
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
        type="text"
        placeholder="Name"
        labelText="Name"
        name="name"
        value={user.name}
        onChange={handleOnchange}
      />

      

      <TextBox
        type="text"
        placeholder="Mobile Number"
        labelText="Mobile Number"
        name="mobile"
        value={user.mobile}
        onChange={handleOnchange}
      />

      <TextArea
        type="text"
        placeholder="Designation"
        labelText="Designation"
        name="address"
        value={user.address}
        onChange={handleOnchange}
      />

      <TextBox
        type="number"
        placeholder="Single Price"
        labelText="Single Image Price"
        name="single"
        value={user.single}
        onChange={handleOnchange}
      />
      <TextBox
        type="number"
        placeholder="Double Price"
        labelText="Double Image Price"
        name="double"
        value={user.double}
        onChange={handleOnchange}
      />
      <TextBox
        type="number"
        placeholder="Multiple Price"
        labelText="Multiple Image Price"
        name="multiple"
        value={user.multiple}
        onChange={handleOnchange}
      />
      <TextBox
        type="number"
        placeholder="ECG Price"
        labelText="ECG Image Price"
        name="ecg"
        value={user.ecg}
        onChange={handleOnchange}
      />
      <TextBox
        type="number"
        placeholder="CT Price"
        labelText="CT Image Price"
        name="city"
        value={user.city}
        onChange={handleOnchange}
      /> 
       <div>
       <div className="row form-group">
        <div className="col-md-3">
          
            <label className="form-control-label">Default Upload</label>
          
        </div>
        <div className=" col-md-9">
        <select name="is_default" className="form-control"  onChange={handleOnchange} value={user.is_default}>
        <option value="">Select</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
       </select>
        </div>
      </div>
      </div>
     <br/>

     <div>
       <div className="row form-group">
        <div className="col-md-3">
          
            <label className="form-control-label">Bill Hide</label>
          
        </div>
        <div className=" col-md-9">
        <select name="hide_bill" className="form-control"  onChange={handleOnchange} value={user.hide_bill}>
        <option value="">Select</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
       </select>
        </div>
      </div>
      </div>
     <br/>


     

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
