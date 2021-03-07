import React, { useState, useEffect }  from 'react'
import CIcon from '@coreui/icons-react'
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
  { key: 'Department_Name', _style: { width: '40%'} },
  { key: 'Department_Code', _style: { width: '20%'} },
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

const DepartmentCreate = () => {
  //Default Values
  const DefCountryData={
  //  FK_BRANCH_ID:0 ,
   // FK_MANAGER_ID:0,
    DEPARTMENT_NAME:"",
    DEPARTMENT_CODE:"",
    PK_DEPARTMENT_ID:0,
    IS_ACTIVE:0,
    StatusSwitch:false,
    ModelLabel:"Create Departments"
  }
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [CountryList, setCountryList] = useState([]);
  const [modal, setModal] = useState(false);
  const [danger, setDanger] = useState(false);
  const [CountryData,setCountryData]=useState(DefCountryData);

  //Load All Countries
  const LoadAll=()=>{
    fetch("http://localhost:51264/api/Departments")
    .then(res => res.json())
      .then(response => {
        const CountryData=[];
        setCountryList([]);
        for (const i of response) {
          const data={};
          data["Department_Name"]=i.departmenT_NAME;
          data["Department_Code"]=i.departmenT_CODE;
          data["PK_DEPARTMENT_ID"]=i.pK_DEPARTMENT_ID;
          data["Status"]=i.iS_ACTIVE;
          CountryData.push(data)
        }
        setCountryList(CountryData);
        
        setIsLoading(false);
      })
      .catch(error => console.log(error));
   }

   //Change Status
  const ChangeSwitch = (event)=>{
    const { name, value } = event.target;
    CountryData.StatusSwitch=event.target.checked;
    CountryData.IS_ACTIVE=event.target.checked == true?1:0;
    setCountryData({ ...CountryData, [name]: event.target.checked })
  }
  //Text change events from form
  const handleInputChange = (event) => {
    const { name, value } = event.target
    setCountryData({ ...CountryData, [name]: value })
  }
  //Modal popup for create
  const toggle = ()=>{
    setCountryData(DefCountryData);
    setModal(!modal);
  }
    //Modal popup for Edit
  const Edittoggle = (id)=>{
    if(id > 0)
    {
      const obj=CountryList.filter((e) => e.PK_DEPARTMENT_ID === id)[0];
      CountryData.PK_DEPARTMENT_ID=obj.PK_DEPARTMENT_ID;
      CountryData.DEPARTMENT_NAME=obj.Department_Name;
      CountryData.DEPARTMENT_CODE=obj.Department_Code;
      CountryData.IS_ACTIVE=obj.Status;
      CountryData.StatusSwitch=obj.Status == 1 ?true:false;
      CountryData.ModelLabel="Update Departments";
      setCountryData(CountryData);
    }
    setModal(!modal);
  }
  //Edit/Update Country throgh API

  const SaveCountry = ()=>{
    if(!CountryData.DEPARTMENT_NAME || !CountryData.DEPARTMENT_CODE)
    {
      alert("Please fill out the fields");
        return;
    }
    //if (CountryData.DEPARTMENT_NAME !="" && CountryData.DEPARTMENT_CODE != null){
      const url="http://localhost:51264/api/Departments"+(CountryData.PK_DEPARTMENT_ID > 0 ? "/"+CountryData.PK_DEPARTMENT_ID+"":"");
      const method=CountryData.PK_DEPARTMENT_ID > 0 ? "PUT":"POST";
      const requestOptions = {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        "Access-Control-Allow-Origin": "*",
        body: JSON.stringify(CountryData)
    };
    fetch(url, requestOptions)
      .then(response => response.json())
      .then(data => FinishSave(data)
      );
  // }
  //   else {
  //     alert("Please fill out the fields");
  //   }
  

  
  }
 //For save notification
  const FinishSave = (result) => {
    if (result > 0) {
      LoadAll();
      alert("Success");
      setModal(!modal);

    }
    else if (result =-1 || result == -2){
      alert("Input Already Exist")
    }
    else {
      alert("Failed");
    }
  }

    //Delete Country through API
  const DeleteConfirm = (id)=>{
    if(id > 0)
    {
      const obj=CountryList.filter((e) => e.PK_DEPARTMENT_ID === id)[0];
      CountryData.PK_DEPARTMENT_ID=obj.PK_DEPARTMENT_ID;
      CountryData.DEPARTMENT_NAME=obj.Department_Name;
      CountryData.DEPARTMENT_CODE=obj.Department_Code;
      CountryData.IS_ACTIVE=obj.Status;
      CountryData.StatusSwitch=obj.Status == 1 ?true:false;
      CountryData.ModelLabel="Update Department";
      setCountryData(CountryData);
    }
    setDanger(!danger)
  }

   //Modal popup for Edit
  const DeleteCountry = ()=>{
    const url="http://localhost:51264/api/Departments/"+CountryData.PK_DEPARTMENT_ID+"";
    
    const requestOptions = {
      method: "DELETE",
      headers: { 'Content-Type': 'application/json' },
      "Access-Control-Allow-Origin": "*"
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
              Department Create
              {/* <DocsLink name="CModal"/> */}
              <div className="card-header-actions">
      <CLink 
      // onClick={toggle}
        // {...rest}
        href="/dashboard"
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
              items={CountryList}
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
                          color="primary"
                          variant="outline"
                          shape="square"
                          size="sm"
                          onClick={(e)=>Edittoggle(item.PK_DEPARTMENT_ID)}
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
                        onClick={(e)=>DeleteConfirm(item.PK_DEPARTMENT_ID)}
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
        show={modal}
        onClose={toggle} 
      >
        <CModalHeader closeButton>{CountryData.ModelLabel}</CModalHeader>
        <CModalBody>
        <CRow>
        <CCol xs="12" sm="12">
          <CCard>
            {/* <CCardHeader>
              {ModelLabel}
              <small> Form</small>
              <DocsLink name="-Input"/>
            </CCardHeader> */}
            <CCardBody>
              <CRow>
                <CCol xs="6">
                  <CFormGroup>
                    <CLabel htmlFor="name">Department name</CLabel>
                    <CInput id="name" placeholder="Enter Department name" name="DEPARTMENT_NAME" value={CountryData.DEPARTMENT_NAME} required  onChange={(e)=>handleInputChange(e)}/>
                  </CFormGroup>
                </CCol>
                <CCol xs="6">
                  <CFormGroup>
                    <CLabel htmlFor="ccnumber">Department Code</CLabel>
                    <CInput id="COUNTRY_CODE" placeholder="Enter Department Code" name="DEPARTMENT_CODE" value={CountryData.DEPARTMENT_CODE} required  onChange={(e)=>handleInputChange(e)}/>
                  </CFormGroup>
                </CCol>
              </CRow>
              <CRow>
                <CCol xs="6">
                  <CFormGroup>
                    <CLabel htmlFor="name">Status</CLabel>
                    <CSwitch className={'mx-1'} variant={'3d'} name="StatusSwitch" color={'primary'} checked={CountryData.StatusSwitch} onChange={(e)=>ChangeSwitch(e)}/>
                  </CFormGroup>
                </CCol>
                <CCol xs="6">
                 
                </CCol>
              </CRow>
              {/* <CButton type="submit" size="sm" color="success"><CIcon name="cil-scrubber" /> Submit</CButton>
              <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton> */}
              
            </CCardBody>
           
          </CCard>
        </CCol>
        
      </CRow>
        </CModalBody>
        <CModalFooter>
        {/* <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block color="success">Success</CButton>
            </CCol> */}
            <CButton  color="success" onClick={(e)=>SaveCountry()}>Save</CButton>
          <CButton
            color="secondary"
            onClick={toggle}
          >Cancel</CButton>
        </CModalFooter>
      </CModal>
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
                <CButton color="danger"onClick={(e)=>DeleteCountry()}>Delete</CButton>{' '}
                <CButton color="secondary" onClick={() => setDanger(!danger)}>Cancel</CButton>
              </CModalFooter>
            </CModal>
    </>
  )
}

export default DepartmentCreate
