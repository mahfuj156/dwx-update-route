import "../../../assets/styles/Form.css";
import UserList from "../../../component/share/admin/user/UserList";
import Layout from "../../../layout/Layout";


const Users = () => {
  return (
    <Layout panel="Customer List">
      <UserList />
    </Layout>
  );
}
export default Users;