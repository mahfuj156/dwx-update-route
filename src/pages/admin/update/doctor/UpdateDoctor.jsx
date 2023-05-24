 import "../../../../assets/styles/Form.css"; 
import Layout from "../../../../layout/Layout"; 
import UpdateDoctorBill from "../../../../component/share/admin/update/doctor/UpdateDoctorBill";


const UpdateDoctor = () => {
  return (
    <Layout panel="Update Doctor">
      <UpdateDoctorBill />
    </Layout>
  );
}
export default UpdateDoctor;