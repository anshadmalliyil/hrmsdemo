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
import baseURL from '../../common/CommonData'
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

// const fields = ['Designation_Name',''Designation_Code', 'Status']
const fields = [
  { key: 'Designation_Name', _style: { width: '40%'} },
  { key: 'Minimum_Experience', _style: { width: '20%'} },
  { key: 'Minimum_Requirement', _style: { width: '20%'} },
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

// var Designation_data=[];

const Designation = () => {
  //Default Values
  const DefDesignationData={
  NAME:"",
    PK_DESIGNATION_ID:0,
    IS_ACTIVE:0,
    StatusSwitch:false,
    ModelLabel:"Create Designations",
    FK_QUALIFICATION_ID:"",
    FK_EXPERIENCE_ID:""
  }
  const DefQualificationData=[{
   
    qualificatioN_NAME:"--select--",
    pK_QUALIFICATION_ID:""
  }]

  const DefExperienceData=[{
   
    experiencE_NAME:"--select--",
    pK_EXPERIENCE_ID:""
  }]
  
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [DesignationList, setDesignationList] = useState([]);
  const [modal, setModal] = useState(false);
  const [danger, setDanger] = useState(false);
  const [DesignationData,setDesignationData]=useState(DefDesignationData);
  const [QualificationData,setQualificationData]=useState(DefQualificationData);
  const [ExperienceData,setExperienceData]=useState(DefExperienceData);

  const QualificationChange = (event) => {
    const { name, value } = event.target
    setDesignationData({ ...DesignationData, [name]: value })

  }
  const GetQualifications=()=>{

    fetch(baseURL+"api/designations/GetQualifications")
    .then(res => res.json())
      .then(response => {
        const Qualification_Data=[];
        setQualificationData(DefQualificationData);
        Qualification_Data.push({qualificatioN_NAME:"--Select--",      pK_QUALIFICATION_ID:""})
        for (const i of response) {
          const data={};
          data["qualificatioN_NAME"]=i.qualificatioN_NAME;
          data["pK_QUALIFICATION_ID"]=i.pK_QUALIFICATION_ID;
          Qualification_Data.push(data)
        }
        DesignationData.FK_QUALIFICATION_ID="";
        setQualificationData(Qualification_Data);
        setDesignationData(DesignationData);
        
      })
  }

  const ExperienceChange = (event) => {
    const { name, value } = event.target
    setDesignationData({ ...DesignationData, [name]: value })

  }
  const GetExperience=()=>{

    fetch(baseURL+"api/designations/GetExperience")
    .then(res => res.json())
      .then(response => {
        const Experience_Data=[];
        setExperienceData(DefExperienceData);
        Experience_Data.push({experiencE_NAME:"--Select--",      pK_EXPERIENCE_ID:""})
        for (const i of response) {
          const data={};
          data["experiencE_NAME"]=i.experiencE_NAME;
          data["pK_EXPERIENCE_ID"]=i.pK_EXPERIENCE_ID;
          Experience_Data.push(data)
        }
        DesignationData.FK_EXPERIENCE_ID="";
        setExperienceData(Experience_Data);
        setDesignationData(DesignationData);
        
      })
  }
  //Load All Countries
  const LoadAll=()=>{
    fetch(baseURL+"api/DESIGNATIONs/DesignationList")
    .then(res => res.json())
      .then(response => {
        const DesignationData=[];
        setDesignationList([]);
        for (const i of response) {
          const data={};
          data["Designation_Name"]=i.name;
          data["Minimum_Experience"]=i.experiencE_NAME;
          data["Minimum_Requirement"]=i.qualificatioN_NAME;
          data["PK_DESIGNATION_ID"]=i.pK_DESIGNATION_ID;
          data["FK_QUALIFICATION_ID"]=i.fK_QUALIFICATION_ID;
          data["FK_EXPERIENCE_ID"]=i.fK_EXPERIENCE_ID;
          data["Status"]=i.iS_ACTIVE;
          DesignationData.push(data)
        }
        setDesignationList(DesignationData);
        
        setIsLoading(false);
      })
      .catch(error => console.log(error));
   }

   //Change Status
  const ChangeSwitch = (event)=>{
    const { name, value } = event.target;
    DesignationData.StatusSwitch=event.target.checked;
    DesignationData.IS_ACTIVE=event.target.checked == true?1:0;
    setDesignationData({ ...DesignationData, [name]: event.target.checked })
  }
  //Text change events from form
  const handleInputChange = (event) => {
    const { name, value } = event.target
    setDesignationData({ ...DesignationData, [name]: value })
  }
  //Modal popup for create
  const toggle = ()=>{
    setDesignationData(DefDesignationData);
    setModal(!modal);
  }
    //Modal popup for Edit
  const Edittoggle = (id)=>{
    if(id > 0)
    {
      const obj=DesignationList.filter((e) => e.PK_DESIGNATION_ID === id)[0];
      DesignationData.PK_DESIGNATION_ID=obj.PK_DESIGNATION_ID;
      DesignationData.NAME=obj.Designation_Name;
      DesignationData.FK_EXPERIENCE_ID=obj.FK_EXPERIENCE_ID;
      DesignationData.FK_QUALIFICATION_ID=obj.FK_QUALIFICATION_ID;
      DesignationData.IS_ACTIVE=obj.Status;
      DesignationData.StatusSwitch=obj.Status == 1 ?true:false;
      DesignationData.ModelLabel="Update Designation";
      setDesignationData(DesignationData);
    }
    setModal(!modal);
  }
  //Edit/Update Designation throgh API

  const SaveDesignation = ()=>{
      if(!DesignationData.NAME)
      {
        alert("Please fill out the fields");
          return;
      }
    DesignationData.FK_QUALIFICATION_ID=parseInt(DesignationData.FK_QUALIFICATION_ID);
    DesignationData.FK_EXPERIENCE_ID=parseInt(DesignationData.FK_EXPERIENCE_ID);
    const url=baseURL+"api/DESIGNATIONs"+(DesignationData.PK_DESIGNATION_ID > 0 ? "/"+DesignationData.PK_DESIGNATION_ID+"":"");
    const method=DesignationData.PK_DESIGNATION_ID > 0 ? "PUT":"POST";
    const requestOptions = {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      "Access-Control-Allow-Origin": "*",
      body: JSON.stringify(DesignationData)
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

    //Delete Designation through API
  const DeleteConfirm = (id)=>{
    if(id > 0)
    {
      const obj=DesignationList.filter((e) => e.PK_DESIGNATION_ID === id)[0];
      DesignationData.PK_DESIGNATION_ID=obj.PK_DESIGNATION_ID;
      DesignationData.NAME=obj.Designation_Name;
      DesignationData.IS_ACTIVE=obj.Status;
      DesignationData.StatusSwitch=obj.Status == 1 ?true:false;
      DesignationData.ModelLabel="Update Designation";
      setDesignationData(DesignationData);
    }
    setDanger(!danger)
  }

   //Modal popup for Edit
  const DeleteDesignation = ()=>{
    const url=baseURL+"api/DESIGNATIONs/"+DesignationData.PK_DESIGNATION_ID+"";
    
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
    GetQualifications();
    GetExperience();
  }, [page]);
  return (
    <>

      <CRow></CRow>
      <CRow>
        <CCol xs="12" lg="12">
          <CCard>
            <CCardHeader>
            Designation List
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
              items={DesignationList}
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
                          onClick={(e)=>Edittoggle(item.PK_DESIGNATION_ID)}
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
                        onClick={(e)=>DeleteConfirm(item.PK_DESIGNATION_ID)}
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
        <CModalHeader closeButton>{DesignationData.ModelLabel}</CModalHeader>
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
                    <CLabel htmlFor="name">Designation name</CLabel>
                    <CInput id="name" placeholder="Enter Designation name" name="NAME" value={DesignationData.NAME} required  onChange={(e)=>handleInputChange(e)}/>
                  </CFormGroup>
                </CCol>
                <CCol xs="6">
                <CFormGroup >
                
                <CLabel htmlFor="name">Minimum Experience</CLabel>
                 
                  <CSelect custom size="lg" name="FK_EXPERIENCE_ID" id="FK_EXPERIENCE_ID"  value={DesignationData.FK_EXPERIENCE_ID}
              // onChange={(e) => this.setState({selectedTeam: e.target.value})}
              onChange={(e)=>ExperienceChange(e)}
              >
         {ExperienceData.map(item => (
        <option
          key={item.pK_EXPERIENCE_ID}
          value={item.pK_EXPERIENCE_ID}
        >
          {item.experiencE_NAME}
        </option>
      ))}
 
                    </CSelect>
             
                </CFormGroup>
                </CCol>
              </CRow>
              <CRow>
                
              <CCol xs="6">
                <CFormGroup >
                
                <CLabel htmlFor="name">Minimum Requirement</CLabel>
                 
                  <CSelect custom size="lg" name="FK_QUALIFICATION_ID" id="FK_QUALIFICATION_ID"  value={DesignationData.FK_QUALIFICATION_ID}
              // onChange={(e) => this.setState({selectedTeam: e.target.value})}
              onChange={(e)=>QualificationChange(e)}
              >
         {QualificationData.map(item => (
        <option
          key={item.pK_QUALIFICATION_ID}
          value={item.pK_QUALIFICATION_ID}
        >
          {item.qualificatioN_NAME}
        </option>
      ))}
 
                    </CSelect>
             
                </CFormGroup>
                </CCol>
                <CCol xs="6">
                  <CFormGroup>
                    <CLabel htmlFor="name">Status</CLabel>
                    <CSwitch className={'mx-1'} variant={'3d'} name="StatusSwitch" color={'primary'} checked={DesignationData.StatusSwitch} onChange={(e)=>ChangeSwitch(e)}/>
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
            <CButton  color="success" onClick={(e)=>SaveDesignation()}>Save</CButton>
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
                <CButton color="danger"onClick={(e)=>DeleteDesignation()}>Delete</CButton>{' '}
                <CButton color="secondary" onClick={() => setDanger(!danger)}>Cancel</CButton>
              </CModalFooter>
            </CModal>
    </>
  )
}
export default Designation
