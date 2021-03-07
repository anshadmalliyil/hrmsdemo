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


// const fields = ['Country Name','Country Code', 'Country Name','Country Code']
const fields = [
  { key: 'Country_Name', _style: { width: '40%'} },
  { key: 'Country_Code', _style: { width: '20%'} },
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

const Countries = () => {
  //Default Values
  const DefCountryData={
    COUNTRY_NAME:"",
    COUNTRY_CODE:"",
    PK_COUNTRY_ID:0,
    IS_ACTIVE:0,
    StatusSwitch:false,
    ModelLabel:"Create Country"
  }
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [CountryList, setCountryList] = useState([]);
  const [modal, setModal] = useState(false);
  const [danger, setDanger] = useState(false);
  const [CountryData,setCountryData]=useState(DefCountryData);

  //Load All Countries
  const LoadAll=()=>{
    fetch(baseURL+"api/countries")
    .then(res => res.json())
      .then(response => {
        const Country_Data=[];
        setCountryList([]);
        for (const i of response) {
          const data={};
          data["Country_Name"]=i.countrY_NAME;
          data["Country_Code"]=i.countrY_CODE;
          data["PK_COUNTRY_ID"]=i.pK_COUNTRY_ID;
          data["Status"]=i.iS_ACTIVE;
          Country_Data.push(data)
        }
        setCountryList(Country_Data);
        
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
      const obj=CountryList.filter((e) => e.PK_COUNTRY_ID === id)[0];
      CountryData.PK_COUNTRY_ID=obj.PK_COUNTRY_ID;
      CountryData.COUNTRY_NAME=obj.Country_Name;
      CountryData.COUNTRY_CODE=obj.Country_Code;
      CountryData.IS_ACTIVE=obj.Status;
      CountryData.StatusSwitch=obj.Status == 1 ?true:false;
      CountryData.ModelLabel="Update Country";
      setCountryData(CountryData);
    }
    setModal(!modal);
  }
  //Edit/Update Country throgh API

  const SaveCountry = ()=>{
    if(!CountryData.COUNTRY_NAME || !CountryData.COUNTRY_CODE)
      {
          alert("Fill required feilds")
          return;
      }
    const url=baseURL+"api/countries"+(CountryData.PK_COUNTRY_ID > 0 ? "/"+CountryData.PK_COUNTRY_ID+"":"");
    const method=CountryData.PK_COUNTRY_ID > 0 ? "PUT":"POST";
    const requestOptions = {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(CountryData)
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

    //Delete Country through API
  const DeleteConfirm = (id)=>{
    if(id > 0)
    {
      const obj=CountryList.filter((e) => e.PK_COUNTRY_ID === id)[0];
      CountryData.PK_COUNTRY_ID=obj.PK_COUNTRY_ID;
      CountryData.COUNTRY_NAME=obj.Country_Name;
      CountryData.COUNTRY_CODE=obj.Country_Code;
      CountryData.IS_ACTIVE=obj.Status;
      CountryData.StatusSwitch=obj.Status == 1 ?true:false;
      CountryData.ModelLabel="Update Country";
      setCountryData(CountryData);
    }
    setDanger(!danger)
  }

   //Modal popup for Edit
  const DeleteCountry = ()=>{
    const url=baseURL+"api/countries/"+CountryData.PK_COUNTRY_ID+"";
    
    const requestOptions = {
      method: "DELETE",
      headers: { 'Content-Type': 'application/json' }
    
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
    
    {/* <CRow>
      <CCol sm="4">
        <CSelect>{optionItems}</CSelect>
       
      </CCol>
   
    </CRow> */}
      <CRow></CRow>
      <CRow>
        <CCol xs="12" lg="12">
          <CCard>
            <CCardHeader>
              Country List
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
                          onClick={(e)=>Edittoggle(item.PK_COUNTRY_ID)}
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
                        onClick={(e)=>DeleteConfirm(item.PK_COUNTRY_ID)}
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
    
            <CCardBody>
              <CRow>
                <CCol xs="6">
                  <CFormGroup>
                    <CLabel htmlFor="name">Country name</CLabel>
                    <CInput id="name" placeholder="Enter Country name" name="COUNTRY_NAME" value={CountryData.COUNTRY_NAME} required  onChange={(e)=>handleInputChange(e)}/>
                  </CFormGroup>
                </CCol>
                <CCol xs="6">
                  <CFormGroup>
                    <CLabel htmlFor="ccnumber">Country Code</CLabel>
                    <CInput id="COUNTRY_CODE" placeholder="Enter Country Code" name="COUNTRY_CODE" value={CountryData.COUNTRY_CODE} required  onChange={(e)=>handleInputChange(e)}/>
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

export default Countries
