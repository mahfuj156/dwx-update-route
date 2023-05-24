import WaitingPatientList from "../../../component/share/doctor/patiens/WaitingPatientList";
import Layout from "../../../layout/Layout";

const WaitingList = () =>   {
  return (
    <Layout panel="Waiting Work List">
      <WaitingPatientList />
    </Layout>
  );
}

export default WaitingList;