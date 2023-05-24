export const navItems = [
    {
        title:'Users',
        path:'#',
        accessName:"_users",
        icon:<i className="menu-icon fa fa-calendar"></i>,
        userRole:'admin',
        child:[
           {
            title:'Add Doctor',
            path:'/admin/add-doctor',
            accessName:"_addDoctor",
            icon:<i className="menu-icon fa fa-calendar"></i>,
           },
           {
            title:'Add User',
            path:'/admin/add-user',
            accessName:"_addUser",
            icon:<i className="menu-icon fa fa-user"></i>,
           },
           {
            title:'User List',
            path:'/admin/users',
            accessName:"_manamgeUser",
            icon:<i className="menu-icon fa fa-user"></i>,
           },{
            title:'Radiology Doctors',
            path:'/admin/xray-doctors',
            accessName:"_mangeRadiologyDoctor",
            icon:<i className="menu-icon fa fa-calendar"></i>,
           },
           {
            title:'ECG Doctors',
            path:'/admin/ecg-doctors',
            accessName:"_mangeEcgDoctor",
            icon:<i className="menu-icon fa fa-user"></i>,
           },
           {
            title:'Delete Doctor',
            path:'/admin/delete-user',
            accessName:"_deleteUser",
            icon:<i className="menu-icon fa fa-user"></i>,
           },
           {
            title:'Delete Users',
            path:'/admin/delete-customer-list',
            accessName:"_deleteDoctor",
            icon:<i className="menu-icon fa fa-user"></i>,
           }
        ]
    },
    {
        title:'Incomplete Report',
        path:'/admin/patient-list',
        accessName:"_incompleteReport",
        icon:<i className="menu-icon fa fa-calendar"></i>,
        userRole:'admin',
    },
    {
        title:'Completed Report',
        path:'/admin/completed',
        accessName:"_completedReport",
        icon:<i className="menu-icon fa fa-calendar"></i>,
        userRole:'admin',
    },

    {
        title:'Manage Report',
        path:'#',
        accessName:"_reports",
        icon:<i className="menu-icon fa fa-calendar"></i>,
        userRole:'admin',
        child:[
           {
            title:'Today Completed Report',
            path:'/admin/completed',
            accessName:"_addDoctor",
            icon:<i className="menu-icon fa fa-calendar"></i>,
           },
           {
            title:'Today Summery',
            path:'/admin/Agent-daily-report',
            accessName:"_addUser",
            icon:<i className="menu-icon fa fa-user"></i>,
           },
           {
            title:'Monthly Completed',
            path:'/admin/patient',
            accessName:"_manamgeUser",
            icon:<i className="menu-icon fa fa-user"></i>,
           },{
            title:'Search Report',
            path:'/admin/serarch_report',
            accessName:"_mangeRadiologyDoctor",
            icon:<i className="menu-icon fa fa-calendar"></i>,
           },
           {
            title:'Deleted Reports',
            path:'/admin/delete-report"',
            accessName:"_mangeEcgDoctor",
            icon:<i className="menu-icon fa fa-archive"></i>,
           }           
        ]
    },

    {
        title:'Manage Doctor Bill',
        path:'#',
        accessName:"_reports",
        icon:<i className="menu-icon fa fa-calendar"></i>,
        userRole:'admin',
        child:[
           {
            title:'Doctor Update',
            path:'/admin/doctor-list',
            accessName:"_addDoctor",
            icon:<i className="menu-icon fa fa-refresh"></i>,
           },
           {
            title:'Update Report',
            path:'/admin/doctor-bill',
            accessName:"_addUser",
            icon:<i className="menu-icon fa fa-refresh"></i>,
           },
           {
            title:'Transection History',
            path:'/admin/doctor-trangection',
            accessName:"_manamgeUser",
            icon:<i className="menu-icon fa fa-refresh"></i>,
           }          
        ]
    },
    {
        title:' Manage Customer Bill',
        path:'#',
        accessName:"_reports",
        icon:<i className="menu-icon fa fa-calendar"></i>,
        userRole:'admin',
        child:[
           {
            title:'Customer OLD Bill',
            path:'/admin/customerbill',
            accessName:"_addDoctor",
            icon:<i className="menu-icon fa fa-refresh"></i>,
           },
           {
            title:'Customer Update',
            path:'/admin/customer-list',
            accessName:"_addUser",
            icon:<i className="menu-icon fa fa-refresh"></i>,
           },
           {
            title:'Payment',
            path:'/admin/customer-bill',
            accessName:"_manamgeUser",
            icon:<i className="menu-icon fa fa-refresh"></i>,
                
           },
           {
            title:'Transection History',
            path:'/admin/customer-trangection',
            accessName:"_manamgeUser",
            icon:<i className="menu-icon fa fa-refresh"></i>,
           }          
        ]
    },

    {
        title:'Others setting',
        path:'#',
        accessName:"_reports",
        icon:<i className="menu-icon fa fa-calendar"></i>,
        userRole:'admin',
        child:[
           {
            title:'Add Payment',
            path:'/admin/create-payment',
            accessName:"_addDoctor",
            icon:<i className="menu-icon fa fa-eye"></i>,
           },
           {
            title:'View All Payment',
            path:'/admin/payment-list',
            accessName:"_addUser",
            icon:<i className="menu-icon fa fa-eye"></i>,
           },
           {
            title:'Add Formate',
            path:'/admin/create-formate',
            accessName:"_manamgeUser",
            icon:<i className="menu-icon fa fa-eye"></i>,
                
           },
           {
            title:'All Formates',
            path:'/admin/view-formate',
            accessName:"_manamgeUser",
            icon:<i className="menu-icon fa fa-eye"></i>,
           } ,        
           {
            title:'Add x-ray name',
            path:'/admin/create-type',
            accessName:"_manamgeUser",
            icon:<i className="menu-icon fa fa-eye"></i>,
           },
           {
            title:'All x-ray name',
            path:'/admin/view-type',
            accessName:"_manamgeUser",
            icon:<i className="menu-icon fa fa-eye"></i>,
           },
           {
            title:'Add History',
            path:'/admin/create-history',
            accessName:"_manamgeUser",
            icon:<i className="menu-icon fa fa-eye"></i>,
           },
            {
            title:'All History',
            path:'/admin/view-history',
            accessName:"_manamgeUser",
            icon:<i className="menu-icon fa fa-eye"></i>,
           }        
        ]
    },
    {
        title:'Settings',
        path:'#',
        accessName:"_reports",
        icon:<i className="menu-icon fa fa-calendar"></i>,
        userRole:'admin',
        child:[
           {
            title:'Add Message',
            path:'/admin/create-message',
            accessName:"_addDoctor",
            icon:<i className="menu-icon fa fa-eye"></i>,
           },
           {
            title:'Add Software',
            path:'/admin/create-software',
            accessName:"_addUser",
            icon:<i className="menu-icon fa fa-eye"></i>,
           },
           {
            title:'All Software',
            path:'/admin/view-software',
            accessName:"_addUser",
            icon:<i className="menu-icon fa fa-eye"></i>,
           }
               
        ]
    }, 

    //Start customer Menu
    {
        title:'Send Report',
        path:'#',
        accessName:"_sendReport",
        icon:<i className="menu-icon fa fa-calendar"></i>,
        userRole:'user',
        child:[
           {
            title:'Send xray Report',
            path:'/agent/defaultxrayupload',
            accessName:"_sendXrayReport",
            icon:<i className="menu-icon fa fa-calendar"></i>,
           },
           {
            title:'Send ECG Report',
            path:'/agent/xray/ecgcreate',
            accessName:"_sendXrayReport",
            icon:<i className="menu-icon fa fa-send"></i>,
           },

           {
            title:'Quick Send Report',
            path:'/agent/quick-send',
            accessName:"_quickSendReport",
            icon:<i className="menu-icon fa fa-calendar"></i>, 
        },

           {
            title:'DCM File Uploader',
            path:'/agent/upload-dcm',
            accessName:"_quickSendReport",
            icon:<i className="menu-icon fa fa-calendar"></i>, 
        },
          
        ]
    },
   /* {
        title:'Quick Send Report',
        path:'/agent/xray/defaultsendreports',
        accessName:"_quickSendReport",
        icon:<i className="menu-icon fa fa-calendar"></i>,
        userRole:'user',
    },*/
    {
        title:'Waiting Report',
        path:'/agent/pending/patient',
        accessName:"_sendReport",
        icon:<i className="menu-icon fa fa-calendar"></i>,
        userRole:'user',
       /* child:[
           {
            title:'Waiting xray Report',
            path:'/agent/pending/patient',
            accessName:"_sendXrayReport",
            icon:<i className="menu-icon fa fa-calendar"></i>,
           },
           {
            title:'Waiting ECG  Report',
            path:'/agent/pendingecg',
            accessName:"_sendXrayReport",
            icon:<i className="menu-icon fa fa-send"></i>,
           } 
        ]*/
    },

  

    {
        title:'Completed Report',
        path:'/agent/completed/patient',
        accessName:"_quickSendReport",
        icon:<i className="menu-icon fa fa-calendar"></i>,
        userRole:'user',
    },
    {
        title:'All Report',
        path:'#',
        accessName:"_sendReport",
        icon:<i className="menu-icon fa fa-calendar"></i>,
        userRole:'user',
        child:[
           {
            title:'This Month Report',
            path:'/agent/running-month',
            accessName:"_sendXrayReport",
            icon:<i className="menu-icon fa fa-calendar"></i>,
           },
           {
            title:'Previous Month Report',
            path:'/agent/previous-report',
            accessName:"_sendXrayReport",
            icon:<i className="menu-icon fa fa-send"></i>,
           },
           {
            title:' Previous All',
            path:'/agent/previous-m-report/2/1',
            accessName:"_sendXrayReport",
            icon:<i className="menu-icon fa fa-send"></i>,
           } 
        ]
    },
    {
        title:'Doctor List',
        path:'/agent/doctor',
        accessName:"_quickSendReport",
        icon:<i className="menu-icon fa fa-calendar"></i>,
        userRole:'user',
    },
    {
        title:'Referance List',
        path:'#',
        accessName:"_sendReport",
        icon:<i className="menu-icon fa fa-calendar"></i>,
        userRole:'user',
        child:[
           {
            title:'Add Referance',
            path:'/agent/create-referance',
            accessName:"_sendXrayReport",
            icon:<i className="menu-icon fa fa-calendar"></i>,
           },
           {
            title:'Referance List',
            path:'/agent/references',
            accessName:"_sendXrayReport",
            icon:<i className="menu-icon fa fa-send"></i>,
           },
           
        ]
    },
    {
        title:'Bill',
        path:'#',
        accessName:"_sendReport",
        icon:<i className="menu-icon fa fa-calendar"></i>,
        userRole:'user',
        child:[
           {
            title:'Manage Bill',
            path:'/agent/bill',
            accessName:"_sendXrayReport",
            icon:<i className="menu-icon fa fa-calendar"></i>,
           }, 
           
        ]
    },
    {
        title:'Checked user',
        path:'#',
        accessName:"_sendReport",
        icon:<i className="menu-icon fa fa-calendar"></i>,
        userRole:'user',
        child:[
           {
            title:'Add new',
            path:'/agent/checkby/adduser',
            accessName:"_sendXrayReport",
            icon:<i className="menu-icon fa fa-calendar"></i>,
           },
           {
            title:'All Users',
            path:'/agent/allusers',
            accessName:"_sendXrayReport",
            icon:<i className="menu-icon fa fa-send"></i>,
           },
           
        ]
    },
    {
        title:'Software',
        path:'/agent/view-software',
        accessName:"_quickSendReport",
        icon:<i className="menu-icon fa fa-calendar"></i>,
        userRole:'user',
    },


    //Doctor Menu
    {
        title:'Incomplete Report',
        path:'/doctor/patient',
        accessName:"_quickSendReport",
        icon:<i className="menu-icon fa fa-desktop"></i>,
        userRole:'xray_dr',
    }, 
     {
        title:'Today Completed Report',
        path:'/doctor/completed',
        accessName:"_quickSendReport",
        icon:<i className="menu-icon fa fa-desktop"></i>,
        userRole:'xray_dr',
    },
    {
        title:'All Completed Report',
        path:'/doctor/complete-report',
        accessName:"_quickSendReport",
        icon:<i className="menu-icon fa fa-desktop"></i>,
        userRole:'xray_dr',
    },
    {
        title:'My Format',
        path:'#',
        accessName:"_sendReport",
        icon:<i className="menu-icon fa fa-calendar"></i>,
        userRole:'xray_dr',
        child:[
           {
            title:'Add Format',
            path:'/doctor/formate/create',
            accessName:"_sendXrayReport",
            icon:<i className="menu-icon fa fa-calendar"></i>,
           },
           {
            title:'View All Format',
            path:'/doctor/formate',
            accessName:"_sendXrayReport",
            icon:<i className="menu-icon fa fa-send"></i>,
           },
           
        ]
    },

    
    //ECG Doctor Menu
    {
        title:'Incomplete Report',
        path:'/doctor/patient',
        accessName:"_quickSendReport",
        icon:<i className="menu-icon fa fa-desktop"></i>,
        userRole:'ecg_dr',
    }, 
     {
        title:'Today Completed Report',
        path:'/doctor/completed',
        accessName:"_quickSendReport",
        icon:<i className="menu-icon fa fa-desktop"></i>,
        userRole:'ecg_dr',
    },
    {
        title:'All Completed Report',
        path:'/doctor/complete-report',
        accessName:"_quickSendReport",
        icon:<i className="menu-icon fa fa-desktop"></i>,
        userRole:'ecg_dr',
    },
    {
        title:'My Format',
        path:'#',
        accessName:"_sendReport",
        icon:<i className="menu-icon fa fa-calendar"></i>,
        userRole:'ecg_dr',
        child:[
           {
            title:'Add Format',
            path:'/doctor/formate/create',
            accessName:"_sendXrayReport",
            icon:<i className="menu-icon fa fa-calendar"></i>,
           },
           {
            title:'View All Format',
            path:'/doctor/formate',
            accessName:"_sendXrayReport",
            icon:<i className="menu-icon fa fa-send"></i>,
           },
           
        ]
    },

]
