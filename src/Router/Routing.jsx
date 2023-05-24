import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import AddDoctor from "../pages/admin/doctors/AddDoctor";
import DeletedDoctors from "../pages/admin/doctors/DeletedDoctors";
import EcgDoctors from "../pages/admin/doctors/EcgDoctors";
import EditDoctor from "../pages/admin/doctors/EditDoctor";
import XrayDoctors from "../pages/admin/doctors/XrayDoctors";
import AddFormat from "../pages/admin/others/formate/AddFormat";
import AdminFormatList from "../pages/admin/others/formate/AdminFormatList";
import AddHistory from "../pages/admin/others/history/AddHistory";
import HistoryList from "../pages/admin/others/history/HistoryList";
import AddMessage from "../pages/admin/others/message/AddMessage";
import AddPayment from "../pages/admin/others/payment/AddPayment";
import PaymentList from "../pages/admin/others/payment/PaymentList";
import AddSoftware from "../pages/admin/others/software/AddSoftware";
import AddType from "../pages/admin/others/type/AddType";
import TypeList from "../pages/admin/others/type/TypeList";
import   AdminCompletedList from "../pages/admin/patients/AdminCompletedList";
import SelectDoctors from "../pages/admin/patients/SelectDoctors";
import ViewReport from "../pages/admin/patients/ViewReport";
import WaitingList from "../pages/admin/patients/WaitingList";
import AddUser from "../pages/admin/users/AddUser";
import EditUser from "../pages/admin/users/EditUser";
import Users from "../pages/admin/users/Users";
import AgetBill from "../pages/customer/bill/AgetBill";
import AgetBillDetails from "../pages/customer/bill/AgetBillDetails";
import PayBill from "../pages/customer/bill/PayBill";
import AddCheckUser from "../pages/customer/checkusers/AddCheckUser";
import CheckedList from "../pages/customer/checkusers/CheckedList";
import AgetDoctor from "../pages/customer/doctors/AgetDoctor";
import AgentAllPreviousMonthPTList from "../pages/customer/patient/AgentAllPreviousMonthPTList";
import AgentCompletePTList from "../pages/customer/patient/AgentCompletePTList";
import AgentPreviousMonthPTList from "../pages/customer/patient/AgentPreviousMonthPTList";
import AgentRunningMonthPTList from "../pages/customer/patient/AgentRunningMonthPTList";
import AgetPrintReport from "../pages/customer/patient/AgetPrintReport";
import AgetViewReport from "../pages/customer/patient/AgetViewReport";
import EditSendReport from "../pages/customer/patient/EditSendReport";
import PendingPTList from "../pages/customer/patient/PendingPTList";
import QuickSend from "../pages/customer/patient/QuickSend";
import SendECGReport from "../pages/customer/patient/SendECGReport";
import SendReport from "../pages/customer/patient/SendReport";
import UploadDCM from "../pages/customer/patient/UploadDCM";
import AddReference from "../pages/customer/reference/AddReference";
import ReferenceList from "../pages/customer/reference/ReferenceList";
import SoftwareList from "../pages/customer/software/SoftwareList";
import CreateFormat from "../pages/doctor/format/CreateFormat";
import Format from "../pages/doctor/format/Format";
import PatientEditReport from "../pages/doctor/patients/PatientEditReport"; 
import DoctorWaitingList from "../pages/doctor/patients/WaitingList";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import DrCompletedList from "../pages/doctor/patients/DrCompletedList";
import DrCompletedListArchive from "../pages/doctor/patients/DrCompletedListArchive";
import DrEditCreateFormat from "../pages/doctor/format/DrEditCreateFormat"; 
import DrViewPatientInfo from "../pages/doctor/patients/DrViewPatientInfo";
import UserPrivateRoute from "./UserPrivateRoute";
import DoctorPrivateRoute from "./DoctorPrivateRoute";
import WelcomePage from "../pages/admin/patients/WelcomePage";
import ChangePassword from "../pages/admin/users/ChangePassword";
import DoctorList from "../pages/admin/update/doctor/DoctorList";
import UpdateDoctorMonth from "../pages/admin/update/doctor/UpdateDoctorMonth";
import UpdateDoctor from "../pages/admin/update/doctor/UpdateDoctor";

const Routing = () => {
  return (
    <Routes> 
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
      </Route>

        <Route element={<PrivateRoute />}>

        <Route path="/" element={<WelcomePage />} />
        <Route path="/admin/patient-list" element={<WaitingList />} />
        <Route path="/admin/completed" element={<AdminCompletedList />} />
        <Route path="/admin/view-patient/:id" element={<ViewReport />} />
        <Route path="/admin/add-doctor" element={<AddDoctor />} />
        <Route path="/admin/add-user" element={<AddUser />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/xray-doctors" element={<XrayDoctors />} />
        <Route path="/admin/ecg-doctors" element={<EcgDoctors />} />
        <Route path="/admin/delete-user" element={<DeletedDoctors />} />
        <Route path="/admin/change-password/:id" element={<ChangePassword />} />
        <Route path="/admin/edit-user/:id" element={<EditUser />} />
        <Route path="/admin/edit-doctor/:id" element={<EditDoctor />} />
        <Route path="/admin/select-dr/:id" element={<SelectDoctors />} />
        <Route path="/admin/create-payment" element={<AddPayment />} />
        <Route path="/admin/payment-list" element={<PaymentList />} />
        <Route path="/admin/create-formate" element={<AddFormat />} />
        <Route path="/admin/view-formate" element={<AdminFormatList />} />
        <Route path="/admin/create-type" element={<AddType />} />
        <Route path="/admin/view-type" element={<TypeList />} />
        <Route path="/admin/create-history" element={<AddHistory />} />
        <Route path="/admin/view-history" element={<HistoryList />} />
        <Route path="/admin/create-software" element={<AddSoftware />} />
        <Route path="/admin/view-software" element={<SoftwareList />} />
        <Route path="/admin/create-message" element={<AddMessage />} />
        <Route path="/admin/doctor-list" element={<DoctorList />} />
        <Route path="/admin/update-doctor-month/:id" element={<UpdateDoctorMonth />} />
        <Route path="/admin/update-doctor-month/:id/:month" element={<UpdateDoctor />} />

        <Route path="/admin/delete-customer-list" element={<DeletedDoctors />}/>
        {/* </Route>
        <Route element={<DoctorPrivateRoute />}>    */}
        <Route path="/doctor/patient" element={<DoctorWaitingList />} />
        <Route path="/doctor/completed" element={<DrCompletedList />} />
        <Route path="/doctor/complete-report" element={<DrCompletedListArchive />} />
        <Route path="/doctor/patient/:id" element={<DrViewPatientInfo />} />
        <Route path="/doctor/edit-report/:id" element={<PatientEditReport />} />
        <Route path="doctor/formate/create" element={<CreateFormat />} />
        <Route path="doctor/formate" element={<Format />} />
        <Route path="doctor/formate/:id" element={<DrEditCreateFormat />} />

        {/* </Route>  */}

        {/*User routes */}
        {/* <Route element={<UserPrivateRoute />}>   */}
 

        <Route path="agent/defaultxrayupload" element={<SendReport />} />
        <Route path="agent/xray/ecgcreate" element={<SendECGReport />} />
        <Route path="agent/pending/patient" element={<PendingPTList />} />
        <Route
          path="agent/completed/patient"
          element={<AgentCompletePTList />}
        />
        <Route
          path="agent/running-month"
          element={<AgentRunningMonthPTList />}
        />
        <Route
          path="agent/previous-report"
          element={<AgentPreviousMonthPTList />}
        />
        <Route
          path="/agent/previous-m-report/:startDate/:endDate"
          element={<AgentAllPreviousMonthPTList />}
        />
        <Route path="agent/patient/edit/:id" element={<EditSendReport />} />
        <Route path="agent/patient/view/:id" element={<AgetViewReport />} />
        <Route path="agent/patient/print/:id" element={<AgetPrintReport />} />
        <Route path="agent/doctor" element={<AgetDoctor />} />
        <Route path="agent/bill" element={<AgetBill />} />
        <Route path="agent/bill/:monthYear" element={<AgetBillDetails />} />
        <Route path="agent/paybill/:monthYear" element={<PayBill />} />
        <Route path="agent/upload-dcm" element={<UploadDCM />} />
        <Route path="agent/create-referance" element={<AddReference />} />
        <Route path="agent/references" element={<ReferenceList />} />
        <Route path="agent/checkby/adduser" element={<AddCheckUser />} />
        <Route path="agent/allusers" element={<CheckedList />} />
        <Route path="agent/view-software" element={<SoftwareList />} />
        <Route path="agent/quick-send" element={<QuickSend />} />
      </Route>
    </Routes>
  );
};

export default Routing;
