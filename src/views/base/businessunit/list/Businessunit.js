import React, { useState, useEffect }  from 'react'
//import CIcon from '@coreui/icons-react'
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

// const fields = ['Country Name','Country Code', 'Country Name','Country Code']
const fields = [
    { key: 'Branch Name', _style: { width: '40%'} },
    { key: 'Branch Code', _style: { width: '40%'} },
    { key: 'PhoneNo', _style: { width: '40%'} },
    { key: 'Timezone', _style: { width: '40%'} },
    { key: 'Status', _style: { width: '40%'} },

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

const Businessunit = () => {
  //Default Values
  const DefBranchData={
    BRANCH_NAME:"",
    BRANCH_CODE:"",
    TIME_ZONE:"",
    PRIMARY_PHONE_NO:"",
    SECONDARY_PHONE_NO:"",
    POSTAL_CODE:"",
    ADDRESS:"",
    PK_BRANCH_ID:0,
    IS_ACTIVE:0,
    StatusSwitch:false,
    //ModelLabel:"Create BRANCH"
  }
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [BranchList, setBranchList] = useState([]);
  const [modal, setModal] = useState(false);
  const [danger, setDanger] = useState(false);
  const [BranchData,setBranchData]=useState(DefBranchData);

  //Load All Countries
  const LoadAll=()=>{
    fetch(baseURL+"api/BUSINESS_UNIT")
    .then(res => res.json())
      .then(response => {
        const BranchData=[];
        setBranchList([]);
        for (const i of response) {
          const data={};
          data["Branch Name"]=i.brancH_NAME;
          data["Branch Code"]=i.brancH_CODE;
          data["PhoneNo"]=i.primarY_PHONE_NO;
          data["Seccondary_PhoneNo"]=i.secondarY_PHONE_NO;
          data["Postal_Code"]=i.postaL_CODE;
          data["Address"]=i.address;
          data["Timezone"]=i.timE_ZONE;
          data["PK_BRANCH_ID"]=i.pK_BRANCH_ID;
          data["Status"]=i.iS_ACTIVE;
         BranchData.push(data)
        }
        setBranchList(BranchData);
        
        setIsLoading(false);
      })
      .catch(error => console.log(error));
   }

   //Change Status
  const ChangeSwitch = (event)=>{
    const { name, value } = event.target;
   BranchData.StatusSwitch=event.target.checked;
    BranchData.IS_ACTIVE=event.target.checked == true?1:0;
    setBranchData({ ...BranchData, [name]: event.target.checked })
  }
  //Text change events from form
  const handleInputChange = (event) => {
    const { name, value } = event.target
    setBranchData({ ...BranchData, [name]: value })
  }
  //Modal popup for create
  const toggle = ()=>{
   setBranchData(DefBranchData);
    setModal(!modal);
  }
    //Modal popup for Edit
  

 

    //Delete Country through API
  const DeleteConfirm = (id)=>{
    if(id > 0)
    {
      const obj=BranchList.filter((e) => e.PK_BRANCH_ID === id)[0];
     BranchData.PK_BRANCH_ID=obj.PK_BRANCH_ID;
     BranchData.BRANCH_NAME=obj.brancH_NAME;
      BranchData.BRANCH_CODE=obj.brancH_CODE;
     BranchData.IS_ACTIVE=obj.Status;
     BranchData.StatusSwitch=obj.Status == 1 ?true:false;
     BranchData.ModelLabel="Update branch";
     setBranchData(BranchData);
    }
    setDanger(!danger)
  }

   //Modal popup for Edit
  const DeleteCountry = ()=>{
    const url=baseURL+"api/BUSINESS_UNIT/"+BranchData.PK_BRANCH_ID+"";
    
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
             Branch List
              {/* <DocsLink name="CModal"/> */}
              <div className="card-header-actions">
      <CLink onClick={toggle}
        // {...rest}
        href="/#/base/businessunit/Create"
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
              items={BranchList}
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
                          //onClick={(e)=>Edittoggle(item.pK_BRANCH_ID)}
                          href={"/#/base/businessunit/Create/"+item.PK_BRANCH_ID}
                          rel="noreferrer noopener" 
                          target="_blank" 
                          className="card-header-action"  
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
                        onClick={(e)=>DeleteConfirm(item.PK_BRANCH_ID)}
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
        <CModalHeader closeButton>{BranchData.ModelLabel}</CModalHeader>
        <CModalBody>
        <CRow>
        <CCol xs="12" sm="12">
          <CCard>
            {/* <CCardHeader>
              {ModelLabel}
              <small> Form</small>
              <DocsLink name="-Input"/>
            </CCardHeader> */}
           
           
          </CCard>
        </CCol>
        
      </CRow>
        </CModalBody>
        
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

export default Businessunit
