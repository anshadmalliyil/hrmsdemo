import React, { useState, useEffect }  from 'react'

import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
    CButton,
  CFormGroup,
  CInput,
  CLabel,
  CRow,
  CSwitch,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CLink,
 
  CModalTitle
} from '@coreui/react'
//import { DocsLink } from 'src/reusable'
import baseURL from '../../../common/CommonData'
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


// const fields = ['Country Name','Country Code']
const fields = [
  { key: 'Company_Name', _style: { width: '15%'} },
  //{ key: 'companY_LOGO', _style: { width: '60%'} },
  { key: 'Company_Domain', _style: { width: '20%'} },
  { key: 'License_No', _style: { width: '20%'} },
  { key: 'Expiry_Date', _style: { width: '15%'} },
  { key: 'Employee_Range', _style: { width: '20%'} },
  { key: 'PhoneNo', _style: { width: '25%'} },
 // { key: 'Seccondary_PhoneNo', _style: { width: '40%'} },
  { key: 'Email', _style: { width: '15%'} },
 // { key: 'Postal_Code', _style: { width: '40%'} },
 // { key: 'Address', _style: { width: '40%'} },

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

// var company_data=[];

const Company = () => {
  //Default Values
  const DefCompanyData={
    PK_COMPANY_ID:0,
    COMPANY_NAME:"",
    COMPANY_LOGO:"",
    COMPANY_DOMAIN:"",
    LICENSE_NO :0,
    ISSUE_DATE:"",
    EXPIRY_DATE:"",
    EMPLOYEE_RANGE:0,
    PRIMARY_PHONE_NO:"",
    SECONDARY_PHONE_NO:"",
    EMAIL_ADDRESS:"",
    POSTAL_CODE:"",
    ADDRESS:"",
    IS_ACTIVE:0,
    StatusSwitch:false,
    
  }
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [CompanyList, setCompanyList] = useState([]);
  const [modal, setModal] = useState(false);
  const [danger, setDanger] = useState(false);
  const [CompanyData,setCompanyData]=useState(DefCompanyData);

  //Load All Company Details
  const LoadAll=()=>{
    fetch(baseURL+"api/COMPANY_DETAILS")
    .then(res => res.json())
      .then(response => {
        const CompanyData=[];
        setCompanyList([]);
        for (const i of response) {
          const data={};
          data["Company_Name"]=i.companY_NAME;
        data["Company_Logo"]=i.companY_LOGO;
          data["Company_Domain"]=i.companY_DOMAIN;
          data["License_No"]=i.licensE_NO;
          data["Expiry_Date"]=i.expirY_DATE;
          data["Employee_Range"]=i.employeE_RANGE;
          data["PhoneNo"]=i.primarY_PHONE_NO;
          data["Seccondary_PhoneNo"]=i.secondarY_PHONE_NO;
          data["Email"]=i.emaiL_ADDRESS;
          data["Postal_Code"]=i.postaL_CODE;
          data["Address"]=i.address;
          data["PK_COMPANY_ID"]=i.pK_COMPANY_ID;
          data["Status"]=i.iS_ACTIVE;
          CompanyData.push(data)
        }
        setCompanyList(CompanyData);
        
        setIsLoading(false);
      })
      .catch(error => console.log(error));
   }

   //Change Status
  const ChangeSwitch = (event)=>{
    const { name, value } = event.target;
    CompanyData.StatusSwitch=event.target.checked;
    CompanyData.IS_ACTIVE=event.target.checked == true?1:0;
    setCompanyData({ ...CompanyData, [name]: event.target.checked })
  }
  //Text change events from form
  const handleInputChange = (event) => {
    const { name, value } = event.target
    setCompanyData({ ...CompanyData, [name]: value })
  }
  //Modal popup for create
 const toggle = ()=>{
  setCompanyData(DefCompanyData);
   setModal(!modal);
  }
    //Modal popup for Edit
  const Edittoggle = (id)=>{
    if(id > 0)
    {
      const obj=CompanyList.filter((e) => e.PK_COMPANY_ID == id)[0];
      CompanyData.PK_COMPANY_ID=obj.PK_COMPANY_ID;
      CompanyData.COMPANY_NAME=obj.Company_Name;
      CompanyData.COMPANY_LOGO=obj.Company_Logo;
      CompanyData.COMPANY_DOMAIN=obj.Company_Domain;
      CompanyData.LICENSE_NO =obj.License_No;
      CompanyData.EXPIRY_DATE=obj.Expiry_Date;
      CompanyData.EMPLOYEE_RANGE=obj.Employee_Range;
      CompanyData.PRIMARY_PHONE_NO=obj.PhoneNo;
      CompanyData.SECCONDARY_PHONE_NO=obj.Seccondary_PhoneNo;
      CompanyData.EMAIL_ADDRESS=obj.Email;
      CompanyData.POSTAL_CODE=obj.Postal_Code;
      CompanyData.ADDRESS=obj.Address;
      CompanyData.IS_ACTIVE=obj.Status;
      CompanyData.StatusSwitch=obj.Status == 1 ?true:false;
      CompanyData.ModelLabel="Update Company";
      setCompanyData(CompanyData);
    }
    setModal(!modal);
  }
  //Edit/Update Company throgh API

  const SaveCompany = ()=>{

    const url=baseURL+"api/COMPANY_DETAILS/"+(CompanyData.PK_COMPANY_ID > 0 ? "/"+CompanyData.PK_COMPANY_ID+"":"");
    const method=CompanyData.PK_COMPANY_ID > 0 ? "PUT":"POST";
    const requestOptions = {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      "Access-Control-Allow-Origin": "*",
      body: JSON.stringify(CompanyData)
  };

  fetch(url, requestOptions)
      .then(response => response.json())
      .then(data => FinishSave(data)
      );
  }
 //For delete notification
  const FinishSave = (result) => {
    if (result > 0) {
      LoadAll();
      alert("Success");
      setModal(!modal);

    }
    else {
      alert("failed");
    }
  }

    //Delete Company through API
  const DeleteConfirm = (id)=>{
    if(id > 0)
    {
      const obj=CompanyList.filter((e) => e.PK_COMPANY_ID === id)[0];
      CompanyData.PK_COMPANY_ID=obj.PK_COMPANY_ID;
      CompanyData.COMPANY_NAME=obj.Company_Name;
      CompanyData.COMPANY_CODE=obj.Company_Code;
      CompanyData.IS_ACTIVE=obj.Status;
      CompanyData.StatusSwitch=obj.Status === 1 ?true:false;
      CompanyData.ModelLabel="Update Company";
      setCompanyData(CompanyData);
    }
    setDanger(!danger)
  }

   //Modal popup for Edit
  const DeleteCompany = ()=>{
    const url=baseURL+"api/COMPANY_DETAILS/"+ CompanyData.PK_COMPANY_ID+"";
    
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
              Company List
              {/* <DocsLink name="CModal"/> */}
              <div className="card-header-actions">
      <CLink 
        // {...rest}
        href="/#/base/company/createcompany"
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
              items={ CompanyList}
              fields={fields}
              itemsPerPage={5}
              pagination
              scopedSlots = {{
                'Status':
                  (item)=>(
                    <td>
                      <CBadge color={getBadge(item.Status === 1 ? "Active":"Inactive")}>
                        {item.Status === 1 ? "Active":"Inactive"}
                      </CBadge>
                    </td>
                  ),
                'edit_details':
                  (item, index)=>{
                    return (
                      <td className="py-2">
                        
                       <CButton
                        href={"/#/base/company/createcompany/"+item.PK_COMPANY_ID}
                          color="primary"
                          variant="outline"
                          shape="square"
                          size="sm"
                        onClick={(e)=>Edittoggle(item.PK_COMPANY_ID)}
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
                        onClick={(e)=>DeleteConfirm(item.PK_COMPANY_ID)}
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
        <CModalHeader closeButton>{CompanyData.ModelLabel}</CModalHeader>
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
                    <CLabel htmlFor="name">Company name</CLabel>
                    <CInput id="name" placeholder="Enter Country name" name="CCOMPANY_NAME" value={CompanyData.COMPANY_NAME} required  onChange={(e)=>handleInputChange(e)}/>
                  </CFormGroup>
                </CCol>
                <CCol xs="6">
                  <CFormGroup>
                    <CLabel htmlFor="ccnumber">Company Code</CLabel>
                    <CInput id="COMPANY_LOGO" placeholder="Enter Company Logo" name="COMPANY_LOGO" value={CompanyData.COMPANY_LOGO} required  onChange={(e)=>handleInputChange(e)}/>
                  </CFormGroup>
                </CCol>
               
              </CRow>
              <CRow>
                <CCol xs="6">
                  <CFormGroup>
                    <CLabel htmlFor="name">Status</CLabel>
                    <CSwitch className={'mx-1'} variant={'3d'} name="StatusSwitch" color={'primary'} checked={CompanyData.StatusSwitch} onChange={(e)=>ChangeSwitch(e)}/>
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
            <CButton  color="success" onClick={(e)=>SaveCompany()}>Save</CButton>
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
                <CButton color="danger"onClick={(e)=>DeleteCompany()}>Delete</CButton>{' '}
                <CButton color="secondary" onClick={() => setDanger(!danger)}>Cancel</CButton>
              </CModalFooter>
            </CModal>
    </>
  )
}

export default Company
