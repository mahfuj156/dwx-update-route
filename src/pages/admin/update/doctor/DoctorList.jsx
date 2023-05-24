import UpdateDoctorList from "../../../../component/share/admin/update/doctor/UpdateDoctorList";
import "../../../../assets/styles/Form.css"; 
import Layout from "../../../../layout/Layout";


const DoctorList = () => {
  return (
    <Layout panel="Doctor List">
      <UpdateDoctorList />
    </Layout>
  );
}
export default DoctorList;