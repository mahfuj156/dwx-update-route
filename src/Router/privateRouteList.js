import AdminFormatList from "../component/share/doctor/helper/AdminFormatList";
import AddDoctor from "../pages/admin/doctors/AddDoctor";
import DeletedDoctors from "../pages/admin/doctors/DeletedDoctors";
import EcgDoctors from "../pages/admin/doctors/EcgDoctors";
import EditDoctor from "../pages/admin/doctors/EditDoctor";
import XrayDoctors from "../pages/admin/doctors/XrayDoctors";
import AddFormat from "../pages/admin/others/formate/AddFormat";
import AddPayment from "../pages/admin/others/payment/AddPayment";
import PaymentList from "../pages/admin/others/payment/PaymentList";
import AddType from "../pages/admin/others/type/AddType";
import TypeList from "../pages/admin/others/type/TypeList";
import AdminCompletedList from "../pages/admin/patients/AdminCompletedList";
import SelectDoctors from "../pages/admin/patients/SelectDoctors";
import ViewReport from "../pages/admin/patients/ViewReport";
import WaitingList from "../pages/admin/patients/WaitingList";
import WelcomePage from "../pages/admin/patients/WelcomePage";
import AddUser from "../pages/admin/users/AddUser";
import ChangePassword from "../pages/admin/users/ChangePassword";
import EditUser from "../pages/admin/users/EditUser";
import Users from "../pages/admin/users/Users";
import DoctorWaitingList from "../pages/doctor/patients/WaitingList";
export const routerList = [
    {
        elem:<WelcomePage />,
        path:"/",
        role:"admin"
    },
    {
        elem:<WaitingList />,
        path:"/admin/patient-list",
        role:"admin"
    },
    {
        elem:<AdminCompletedList />,
        path:"/admin/completed",
        role:"admin"
    },
    {
        elem:<ViewReport />,
        path:"/admin/view-patient/:id",
        role:"admin"
    },
    {
        elem:<AddDoctor />,
        path:"/admin/add-doctor",
        role:"admin"
    },
    {
        elem:<AddUser />,
        path:"/admin/add-user",
        role:"admin"
    },
    {
        elem:<Users />,
        path:"/admin/usersr",
        role:"admin"
    },
    {
        elem:<XrayDoctors />,
        path:"/admin/xray-doctors",
        role:"admin"
    },
    {
        elem:<EcgDoctors />,
        path:"/admin/ecg-doctors",
        role:"admin"
    },
    {
        elem:<DeletedDoctors />,
        path:"/admin/delete-user",
        role:"admin"
    },
    {
        elem:<ChangePassword />,
        path:"/admin/change-password/:id",
        role:"admin"
    },
    {
        elem:<EditUser />,
        path:"/admin/edit-user/:id",
        role:"admin"
    },
    {
        elem:<EditDoctor />,
        path:"/admin/edit-doctor/:id",
        role:"admin"
    },
    {
        elem:<SelectDoctors />,
        path:"/admin/select-dr/:id",
        role:"admin"
    },
    {
        elem:<AddPayment />,
        path:"/admin/create-payment",
        role:"admin"
    },
    {
        elem:<PaymentList />,
        path:"/admin/payment-list",
        role:"admin"
    },
    {
        elem:<AddFormat />,
        path:"/admin/create-formate",
        role:"admin"
    },
    {
        elem:<AdminFormatList />,
        path:"/admin/view-formate",
        role:"admin"
    },
    {
        elem:<AddType />,
        path:"/admin/create-type",
        role:"admin"
    },
    {
        elem:<TypeList />,
        path:"/admin/view-type",
        role:"admin"
    },
    {
        elem:<DoctorWaitingList />,
        path:"/doctor/patien",
        role:"xray_dr"
    }
]

