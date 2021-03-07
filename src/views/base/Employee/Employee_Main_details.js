import React, { useState, useEffect }  from 'react'
import CIcon from '@coreui/icons-react'
import { Link } from 'react-router-dom'
import baseURL from '../../common/CommonData'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CButton,
  CCardFooter,
  CCollapse,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CFade,
  CForm,
  CFormGroup,
  CFormText,
  CValidFeedback,
  CInvalidFeedback,
  CTextarea,
  CInput,
  CInputFile,
  CInputCheckbox,
  CInputRadio,
  CInputGroup,
  CInputGroupAppend,
  CInputGroupPrepend,
  CDropdown,
  CInputGroupText,
  CLabel,
  CSelect,
  CRow,
  CSwitch,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CLink,
  CToast,
  CToastBody,
  CToastHeader,
  CToaster,
  CAlert,
  CModalTitle
} from '@coreui/react'
import { DocsLink } from 'src/reusable'

// import usersData from '../../users/UsersData'

  ////////Toaster///////////

const getBadge = status => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}


// const fields = ['Country Name','Country Code', 'Country Name','Country Code']
const fields = [
 // { key: 'EMPLOYEEID', _style: { width: '40%'} },
  { key: 'FIRST_NAME', _style: { width: '20%'} },
  { key: 'LAST_NAME', _style: { width: '20%'} },
  { key: 'EMAIL_ID', _style: { width: '20%'} },
  
  { key: 'Status', _style: { width: '20%'} },
  {
    key: 'edit_details',
    label: '',
    _style: { width: '1%' },
    sorter: false,
    filter: false
  },
  {
    key: 'delete',
    label: '',
    _style: { width: '1%' },
    sorter: false,
    filter: false
  }
]

// var country_data=[];

const EmployeeMain = () => {
  //Default Values
  const DefCountryData={
  //  FK_BRANCH_ID:0 ,
   // FK_MANAGER_ID:0,
   FIRST_NAME:"",
   LAST_NAME:"",
   EMAIL_ID:"",
   PK_EMP_ID:0,
    IS_ACTIVE:0,
    StatusSwitch:false,
    ModelLabel:"Create Departments"
  }
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [emplist, setempList] = useState([]);
  const [modal, setModal] = useState(false);
  const [danger, setDanger] = useState(false);
  const [empData,setempData]=useState(DefCountryData);

  //Load All Countries
  const LoadAll=()=>{
    fetch(baseURL+"api/EMPLOYEE_MAIN_DETAILS")
    .then(res => res.json())
      .then(response => {
        const empData=[];
        setempData([]);
        for (const i of response) {
          const data={};
          data["FIRST_NAME"]=i.firsT_NAME;
          data["LAST_NAME"]=i.lasT_NAME;
          data["EMAIL_ID"]= i.emaiL_ID;
          data["PK_EMP_ID"]=i.pK_EMP_ID;

          data["Status"]=i.iS_ACTIVE;
          empData.push(data)
        }
        setempList(empData);
        
        setIsLoading(false);
      })
      .catch(error => console.log(error));
   }

  
  //Text change events from form
  
  
    //Modal popup for Edit
  const Edittoggle = (id)=>{
    if(id > 0)
    {
      const obj=emplist.filter((e) => e.PK_EMP_ID === id)[0];
      empData.PK_EMP_ID=obj.PK_EMP_ID;
      empData.FIRST_NAME=obj.Department_Name;
      empData.DEPARTMENT_CODE=obj.Department_Code;
      empData.IS_ACTIVE=obj.Status;
      empData.StatusSwitch=obj.Status == 1 ?true:false;
      empData.ModelLabel="Update Departments";
      setempList(empData);
    }
    //setModal(!modal);
  }
  
  

    //Delete Country through API
  const DeleteConfirm = (id)=>{
    if(id > 0)
    {
      const obj=emplist.filter((e) => e.PK_EMP_ID === id)[0];
      empData.PK_EMP_ID=obj.PK_EMP_ID;
      empData.FIRST_NAME=obj.FIRST_NAME;
      empData.LAST_NAME=obj.LAST_NAME;
      empData.IS_ACTIVE=obj.Status;
      empData.StatusSwitch=obj.Status == 1 ?true:false;
      empData.ModelLabel="Update Department";
      setempList(empData);
    }
    setDanger(!danger)
    setIsLoading(false);
  }

   //Modal popup for Edit
  const Deleteemp = ()=>{
    const url=baseURL+"api/EMPLOYEE_MAIN_DETAILS/"+empData.PK_EMP_ID+"";
    
    const requestOptions = {
      method: "DELETE",
      headers: { 'Content-Type': 'application/json' },
     // "Access-Control-Allow-Origin": "*"
  };
  fetch(url, requestOptions)
      .then(response => response.json())
      .then(data => FinishDelete(data)
      );
  }
 //For delete notification
  const FinishDelete=(result)=>{
    if(result > 0)
    {
      LoadAll();
      alert("Success");
      setDanger(!danger)
      
    }
    else
    {
      alert("failed");
    }
  }

 
 
  useEffect(()=>{
    LoadAll();
  }, [page]);
  return (
    <>

      <CRow></CRow>
      <CRow>
        <CCol xs="12" lg="12">
          <CCard>
            <CCardHeader>
              Department List
              {/* <DocsLink name="CModal"/> */}
              <div className="card-header-actions">
              <CLink
              // onClick={toggle}
        // {...rest}
        href="/#/base/Employee/create"
        rel="noreferrer noopener" 
        target="_blank" 
        className="card-header-action"  
      >
        <small className="text-muted">{ 'Create New' }</small>
      </CLink>
   
    </div>
            </CCardHeader>
            <CCardBody>
            <CDataTable
              items={emplist}
              fields={fields}
              itemsPerPage={5}
              pagination
              scopedSlots = {{
                'Status':
                  (item)=>(
                    <td>
                      <CBadge color={getBadge(item.Status == 1 ? "Active":"Inactive")}>
                        {item.Status == 1 ? "Active":"Inactive"}
                      </CBadge>
                    </td>
                  ),
                'edit_details':
                  (item, index)=>{
                    return (
                      <td className="py-2">
                        <CButton
                          href={"/#/base/Employee/create/"+item.PK_EMP_ID}
                          //target="_blank" 
                          color="primary"
                          variant="outline"
                          shape="square"
                          size="sm"
                          //onClick={(e)=>Edittoggle(item.PK_EMP_ID)}
                          // onClick={()=>{toggle(index)}}
                        >
                          
                          Edit
                        </CButton>
                      </td>
                      )
                  },
                'delete':
                (item, index)=>{
                  return (
                    <td className="py-2">
                      <CButton
                        color="danger"
                        variant="outline"
                        shape="square"
                        size="sm"
                        onClick={(e)=>DeleteConfirm(item.PK_EMP_ID)}
                      >
                        Delete
                      </CButton>
                    </td>
                    )
                },
              }}
            />
            </CCardBody>
          </CCard>
        </CCol>

      </CRow>
      <CModal 
              show={danger} 
              onClose={() => setDanger(!danger)}
              color="danger" 
            >
              <CModalHeader closeButton>
                <CModalTitle>Delete Confirm</CModalTitle>
              </CModalHeader>
              <CModalBody>
                Do you want to delete this data?
              </CModalBody>
              <CModalFooter>
                <CButton color="danger"onClick={(e)=>Deleteemp()}>Delete</CButton>{' '}
                <CButton color="secondary" onClick={() => setDanger(!danger)}>Cancel</CButton>
              </CModalFooter>
            </CModal>
      </>
  )
}

export default  EmployeeMain 

