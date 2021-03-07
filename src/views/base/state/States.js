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
  { key: 'State_Name', _style: { width: '40%'} },
  { key: 'State_Code', _style: { width: '20%'} },
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

const State = () => {
  //Default Values
  const DefStateData={
  //  FK_BRANCH_ID:0 ,
   // FK_MANAGER_ID:0,
   FK_COUNTRY_ID:"",
   STATE_NAME:"",
   STATE_CODE:"",
   PK_STATE_ID:0,
    IS_ACTIVE:0,
    StatusSwitch:false,
    ModelLabel:"Create States",
  }
  const DefCountryData=[{
   
    countrY_NAME:"--select Country--",
    pK_COUNTRY_ID:""
  }]
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [StateList, setStateList] = useState([]);
  const [modal, setModal] = useState(false);
  const [danger, setDanger] = useState(false);
  
  const [CountryData,setCountryData]=useState(DefCountryData);
  const [StateData,setStateData]=useState(DefStateData);

  const CountryChange = (event) => {
    const { name, value } = event.target
    setStateData({ ...StateData, [name]: value })
    // CountryData.ModelLabel="Update Country";

  }
  const LoadCountries=()=>{

    fetch("http://localhost:51264/api/countries")
    .then(res => res.json())
      .then(response => {
        const Country_Data=[];
        setCountryData(DefCountryData);
        Country_Data.push({countrY_NAME:"--Select Country--",      pK_COUNTRY_ID:""})
        for (const i of response) {
          const data={};
          data["countrY_NAME"]=i.countrY_NAME;
          data["pK_COUNTRY_ID"]=i.pK_COUNTRY_ID;
          Country_Data.push(data)
        }
        // const CountryDrp={};
        // CountryDrp=Country_Data;
        StateData.FK_COUNTRY_ID="";
        setCountryData(Country_Data);
        setStateData(StateData);
        
      })
  }
  //Load All Countries
  const LoadAll=()=>{
    fetch("http://localhost:51264/api/States")
    .then(res => res.json())
      .then(response => {
        const State_Data=[];
        setStateList([]);
        for (const i of response) {
          const data={};
          data["State_Name"]=i.statE_NAME;
          data["State_Code"]=i.statE_CODE;
          data["PK_STATE_ID"]=i.pK_STATE_ID;
          data["Status"]=i.iS_ACTIVE;
          data["FK_COUNTRY_ID"]=i.fK_COUNTRY_ID;
          State_Data.push(data)
        }
        setStateList(State_Data);
        
        setIsLoading(false);
      })
      .catch(error => console.log(error));
   }

   //Change Status
  const ChangeSwitch = (event)=>{
    const { name, value } = event.target;
    StateData.StatusSwitch=event.target.checked;
    StateData.IS_ACTIVE=event.target.checked === true?1:0;
    setStateData({ ...StateData, [name]: event.target.checked })
  }
  //Text change events from form
  const handleInputChange = (event) => {
    const { name, value } = event.target
    setStateData({ ...StateData, [name]: value })
  }
  //Modal popup for create
  const toggle = ()=>{
    setStateData(DefStateData);
    
    setModal(!modal);
  }
    //Modal popup for Edit
  const Edittoggle = (id)=>{
    if(id > 0)
    {
      const obj=StateList.filter((e) => e.PK_STATE_ID=== id)[0];
      StateData.PK_STATE_ID=obj.PK_STATE_ID;
      StateData.FK_COUNTRY_ID=obj.FK_COUNTRY_ID;
      StateData.STATE_NAME=obj.State_Name;
      StateData.STATE_CODE=obj.State_Code;
      StateData.IS_ACTIVE=obj.Status;
      StateData.StatusSwitch=obj.Status == 1 ?true:false;
      StateData.ModelLabel="Update States";
      setStateData(StateData);
    }
    setModal(!modal);
  }
  //Edit/Update Country throgh API

  const SaveState = ()=>{
    if(!StateData. FK_COUNTRY_ID)
    {
      alert("select country !!");
      return;
    }
    if(StateData.STATE_NAME !="" && StateData.STATE_CODE !=null){
  // StateData.STATE_CODE=parseFloat(StateData.STATE_CODE);
  StateData.FK_COUNTRY_ID=parseInt(StateData.FK_COUNTRY_ID);
      const url="http://localhost:51264/api/States"+(StateData.PK_STATE_ID > 0 ? "/"+StateData.PK_STATE_ID+"":"");
      
    const method=StateData.PK_STATE_ID > 0 ? "PUT":"POST";
 
    const requestOptions = {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      "Access-Control-Allow-Origin": "*",
      body: JSON.stringify(StateData)
  };

  fetch(url, requestOptions)
      .then(response => response.json())
      .then(data => FinishSave(data)
      );
  }
  else{
    alert("please fill out the field");
  }
}
 //For save notification
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

    //Delete Country through API
  const DeleteConfirm = (id)=>{
    if(id > 0)
    {
      const obj=StateList.filter((e) => e.PK_STATE_ID=== id)[0];
      StateData.PK_STATE_ID=obj.PK_STATE_ID;
      StateData.STATE_NAME=obj.State_Name;
      StateData.STATE_CODE=obj.State_Name;
      StateData.IS_ACTIVE=obj.Status;
      StateData.StatusSwitch=obj.Status == 1 ?true:false;
      StateData.ModelLabel="Update State";
      setStateData(StateData);
    }
    setDanger(!danger)
  }

   //Modal popup for Edit
  const DeleteState = ()=>{
    const url="http://localhost:51264/api/States/"+StateData.PK_STATE_ID+"";
    
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
    LoadCountries();
  }, [page]);
  return (
    <>

      <CRow></CRow>
      <CRow>
        <CCol xs="12" lg="12">
          <CCard>
            <CCardHeader>
              State List
              {/* <DocsLink name="CModal"/> */}
              <div className="card-header-actions">
      <CLink onClick={toggle}
        // {...rest}
        href="#"
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
              items={StateList}
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
                          onClick={(e)=>Edittoggle(item.PK_STATE_ID)}
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
                        onClick={(e)=>DeleteConfirm(item.PK_STATE_ID)}
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
        <CModalHeader closeButton>{StateData.ModelLabel}</CModalHeader>
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
                    <CLabel htmlFor="name">State name</CLabel>
                    <CInput id="statE_NAME" placeholder="Enter State name" name="STATE_NAME" value={StateData.STATE_NAME} required  onChange={(e)=>handleInputChange(e)}/>
                  </CFormGroup>
                </CCol>
                <CCol xs="6">
                  <CFormGroup>
                    <CLabel htmlFor="ccnumber">State Code</CLabel>
                    <CInput id="statE_CODE" placeholder="Enter State Code" name="STATE_CODE" value={StateData.STATE_CODE} required  onChange={(e)=>handleInputChange(e)}/>
                  </CFormGroup>
                </CCol>
              </CRow>
              <CRow>
               
                <CCol xs="6">
                <CFormGroup >
                
                <CLabel htmlFor="name">Country</CLabel>
                 
                  <CSelect custom size="lg" name="FK_COUNTRY_ID" id="pK_COUNTRY_ID"  value={StateData.FK_COUNTRY_ID}
              // onChange={(e) => this.setState({selectedTeam: e.target.value})}
              onChange={(e)=>CountryChange(e)}
              >
         {CountryData.map(item => (
        <option
          key={item.pK_COUNTRY_ID}
          value={item.pK_COUNTRY_ID}
        >
          {item.countrY_NAME}
        </option>
      ))}
 
                    </CSelect>
             
                </CFormGroup>
                </CCol>
                <CCol xs="6">
                  <CFormGroup>
                    <CLabel htmlFor="name">Status</CLabel>
                    <CSwitch className={'mx-1'} variant={'3d'} name="StatusSwitch" color={'primary'} checked={StateData.StatusSwitch} onChange={(e)=>ChangeSwitch(e)}/>
                  </CFormGroup>
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
            <CButton  color="success" onClick={(e)=>SaveState()}>Save</CButton>
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
                <CButton color="danger" onClick={(e)=>DeleteState()}>Delete</CButton>{' '}
                <CButton color="secondary" onClick={() => setDanger(!danger)}>Cancel</CButton>
              </CModalFooter>
            </CModal>
    </>
  )
}

export default State

