import React, { useState, useEffect,array} from 'react'

import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CCardHeader,
  CInputFile,
  CTextarea,
   CForm,
  CInput,
   CRow,
   CSwitch,
   CSelect,
   CFormGroup,
  CLabel,
  
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useHistory } from 'react-router-dom'
import baseURL from '../../../common/CommonData'
const Createcompany = (match) => {

  const history = useHistory()
  let path = match.location.pathname;
  let param =!path? "":path.split("/")[4];
  if(param==undefined)
  {
    param=0;
  }
  const [page, setPage] = useState(1);
  const [collapse, setCollapse] = useState(false)
  const [collapseMulti, setCollapseMulti] = useState([false, false])
  const [fade, setFade] = useState(true)
  const DefCompanyData= {
    PK_COMPANY_ID:parseInt(param),
    FK_STATE_ID:0,
    COMPANY_NAME:"",
    TRN_NO:0,
    COMPANY_LOGO:"",
    COMPANY_DOMAIN:"",
    LICENSE_NO :0,
    ISSUE_DATE:"2021-01-01",
    EXPIRY_DATE:"2021-01-01",
    EMPLOYEE_RANGE:0,
    PRIMARY_PHONE_NO:"",
    SECONDARY_PHONE_NO:"",
    EMAIL_ADDRESS:"",
    POSTAL_CODE:"",
    ADDRESS:"",
    IS_ACTIVE:0,
    StatusSwitch:false,
    FK_COUNTRY_ID: "",
    selectedState: ""
  }
const DefCountryData=[{
  countrY_NAME:"--select country--",
  pK_COUNTRY_ID:""
}]
const DefStateData=[{
  statE_NAME:"--select state--",
  pK_STATE_ID:""
}]
    const [CompanyList, setCompanyList] = useState([]);
    const [CompanyData,setcompanydata]=useState(DefCompanyData);
    const [CountryData,setCountryData]=useState(DefCountryData);
    const [StateData,setStateData]=useState(DefStateData)
     const handleInputChange = (event) => {
    const { name, value } = event.target
      setcompanydata({ ...CompanyData, [name]: value })
    }
    const CountryChange = (event) => {
      const { name, value } = event.target
     // setcompanydata({ ...CompanyData, FK_COUNTRY_ID: value })
     //CompanyData.FK_COUNTRY_ID=value;
    //  setcompanydata(CompanyData);
     setcompanydata({ ...CompanyData, [name]: value })
      LoadState(value);
    }
    const StateChange = (event) => {
      const { name, value } = event.target
     // CompanyData.selectedState=value;
      setcompanydata({ ...CompanyData, [name]: value })
    }
    const toggle = ()=>{
      setcompanydata(DefCompanyData);
     // setModal(!modal);
    }
    
    const SaveCompany = ()=>{
        if(!CompanyData.COMPANY_NAME || !CompanyData.COMPANY_DOMAIN)
        {
          alert("please fill out the fields");
          return;
        }
       CompanyData.FK_COUNTRY_ID =parseInt( CompanyData.FK_COUNTRY_ID);
       CompanyData.LICENSE_NO =parseInt( CompanyData.LICENSE_NO);
       CompanyData.TRN_NO =parseInt( CompanyData.TRN_NO);
       CompanyData.EMPLOYEE_RANGE =parseInt( CompanyData.EMPLOYEE_RANGE);
       CompanyData.FK_STATE_ID =parseInt( CompanyData.selectedState);
      const url=baseURL+"api/COMPANY_DETAILS"+(CompanyData.PK_COMPANY_ID > 0 ? "/"+CompanyData.PK_COMPANY_ID+"":"");
        const method=CompanyData.PK_COMPANY_ID > 0 ? "PUT":"POST";
        const requestOptions = {
        method: method,
        headers: { 'Content-Type': 'application/json' },
      //  "Access-Control-Allow-Origin": "*",
        body: JSON.stringify(CompanyData)
      };
  
      fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => FinishSave(data)
        );
    }
    const FinishSave = (result) => {
      if (result > 0) {
        //LoadAll();
        alert("Success");
        history.push('/base/company/listing');
        //setModal(!modal);
  
      }
      else if (result==-1||result ==-2){
        alert("Input Already Exist")
      }
      else {
        alert("failed");
      }
    }

    const LoadCountries=()=>{
      fetch(baseURL+"api/countries")
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
          //const CountryDrp={};
     // CountryDrp=Country_Data;
          CompanyData.FK_COUNTRY_ID="";
          setCountryData(Country_Data);
          setcompanydata(CompanyData);
          
        })
        .catch(error => console.log(error));
     }

     useEffect(()=>{
     LoadCountries();
     LoadState();
     if(DefCompanyData.PK_COMPANY_ID>0)
    {      
        fetch(baseURL+"api/COMPANY_DETAILS/"+DefCompanyData.PK_COMPANY_ID)
        .then(res => res.json())
          .then(response => {
            
           const obj=response;
      
     
      CompanyData.PK_COMPANY_ID=obj.pK_COMPANY_ID;
      CompanyData.COMPANY_NAME=obj.companY_NAME;
      CompanyData.COMPANY_LOGO=obj.companY_LOGO;
      CompanyData.COMPANY_DOMAIN=obj.companY_DOMAIN;
      CompanyData.LICENSE_NO =obj.licensE_NO;
      CompanyData.EXPIRY_DATE=obj.expirY_DATE.split("T")[0];
      CompanyData.ISSUE_DATE=obj.issuE_DATE.split("T")[0];
      CompanyData.EMPLOYEE_RANGE=obj.employeE_RANGE;
      CompanyData.PRIMARY_PHONE_NO=obj.primarY_PHONE_NO;
      CompanyData.TRN_NO=obj.trN_NO;
      CompanyData.SECONDARY_PHONE_NO=obj.secondarY_PHONE_NO;
      CompanyData.EMAIL_ADDRESS=obj.emaiL_ADDRESS;
      CompanyData.FK_COUNTRY_ID=String(obj.countrY_ID);
      CompanyData.selectedState=String(obj.statE_ID);
      CompanyData.POSTAL_CODE=obj.postaL_CODE;
      CompanyData.ADDRESS=obj.address;
      CompanyData.IS_ACTIVE=obj.iS_ACTIVE;
      CompanyData.FK_COUNTRY_ID=obj.fK_COUNTRY_ID;
      CompanyData.selectedState=obj.fK_STATE_ID;
      
      CompanyData.StatusSwitch=obj.iS_ACTIVE == 1 ?true:false;
 
      LoadState(obj.countrY_ID);
    
            setcompanydata(CompanyData);
          })
        
        }
     },[page]);
     
     const LoadState=(CountryId)=>{
      let parameter=parseInt( CountryId) > 0 ?"/GetSTATEByCountry?CountryId="+CountryId:""
      fetch(baseURL+"api/STATEs" +parameter)
      .then(res => res.json())
        .then(response => {
          const State_Data=[];
          setStateData(DefStateData);
          State_Data.push({statE_NAME:"--Select State--", pK_STATE_ID:""})
          for (const i of response) {
            const data={};
            data["statE_NAME"]=i.statE_NAME;
            data["pK_STATE_ID"]=i.pK_STATE_ID;
            State_Data.push(data)
          }
          // const CountryDrp={};
          // CountryDrp=Country_Data;
          CompanyData.selectedState="";
          setStateData(State_Data);
          setcompanydata(CompanyData);
          
        })
        .catch(error => console.log(error));
     }
  
//is_active
    const ChangeSwitch = (event)=>{
      const { name, value } = event.target;
      CompanyData.StatusSwitch=event.target.checked;
      CompanyData.IS_ACTIVE=event.target.checked == true?1:0;
      setcompanydata({ ...CompanyData, [name]: event.target.checked })
    }
    
  return (  
      <CRow>
    <CCol xs="12" md="12">
      <CCard>
        <CCardHeader>
          Create
          <small> Company</small>
        </CCardHeader>
        <CCardBody>
          <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
            <div className="row">
             <CFormGroup className="col-md-6" >
              <CCol md="9">
                <CLabel htmlFor="text-input">Company Name</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput id="text-input" name="COMPANY_NAME" placeholder="Compay Name" value={CompanyData.COMPANY_NAME}   onChange={(e)=>handleInputChange(e)}/>
              </CCol>
              </CFormGroup>
              <CFormGroup className="col-md-6">
              <CCol md="9">
                <CLabel htmlFor="text-input">Licence no</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput id="text-input" name="LICENSE_NO" placeholder="Licence No" value={CompanyData.LICENSE_NO}   onChange={(e)=>handleInputChange(e)} />
              </CCol>
            </CFormGroup>
            </div>
            <div className="row">
            <CFormGroup className="col-md-6">
              <CCol md="9">
                <CLabel htmlFor="text-input">Trn No</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput id="text-input" name="TRN_NO" placeholder="Enter Trn No" value={CompanyData.TRN_NO}   onChange={(e)=>handleInputChange(e)} />
              </CCol>
            </CFormGroup>
              <CFormGroup className="col-md-6" >
              <CCol md="9">
                <CLabel htmlFor="text-input">Company Domain</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput id="text-input" name="COMPANY_DOMAIN" placeholder="Company Domain" value={CompanyData.COMPANY_DOMAIN} onChange={(e)=>handleInputChange(e)}/>
              </CCol>
            </CFormGroup>
            </div>
            <div className="row">
            <CFormGroup className="col-md-6">
                  <CCol md="9">
                    <CLabel htmlFor="pK_COUNTRY_ID">Country</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CSelect custom name ="FK_COUNTRY_ID" id="FK_COUNTRY_ID" value={CompanyData.FK_COUNTRY_ID}   onChange={(e)=>CountryChange(e)}
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
                  </CCol>
                </CFormGroup>
                <CFormGroup className="col-md-6">
                  <CCol md="9">
                    <CLabel htmlFor="select">State</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CSelect custom name="selectedState" id="selectedState" value={CompanyData.selectedState}   onChange={(e)=>StateChange(e)}>
                    {StateData.map(item => (
                       <option
                        key={item.pK_STATE_ID}
                       value={item.pK_STATE_ID}
                     >
                       {item.statE_NAME}
                     </option>
                   ))}
                    </CSelect>
                  </CCol>
                </CFormGroup>


                
                </div>
            <div className="row">
            <CFormGroup className="col-md-6">
              <CCol md="9">
                <CLabel htmlFor="date-input">Expiry_Date</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput type="date" id="date-input" name="EXPIRY_DATE" placeholder="date" value={CompanyData.EXPIRY_DATE}   onChange={(e)=>handleInputChange(e)} />
              </CCol>
            </CFormGroup>
                             
            <CFormGroup className="col-md-6">
              <CCol md="9">
                <CLabel htmlFor="text-input">Employee Range</CLabel>
              </CCol>
               
                  <CCol xs="12" md="9">
                    <CSelect custom name="EMPLOYEE_RANGE" id="select"  value={CompanyData.EMPLOYEE_RANGE}   onChange={(e)=>handleInputChange(e)}>
                      <option value="0">Employee Range</option>
                      <option value="1">1-10 </option>
                      <option value="2">10-50</option>
                      <option value="3">50-100</option>
                      <option value="4">100-150 </option>
                      <option value="5">150-200</option>
                      <option value="6">200-300</option>
                    </CSelect>
                  </CCol>
               
            </CFormGroup>
            </div>
            <div className="row">
            <CFormGroup className="col-md-6">
              <CCol md="9">
                <CLabel htmlFor="date-input">Issue Date</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput type="date" id="date-input" name="ISSUE_DATE" placeholder="issue date" value={CompanyData.ISSUE_DATE}   onChange={(e)=>handleInputChange(e)} />
              </CCol>
            </CFormGroup>
             
            <CFormGroup className="col-md-6">
              <CCol md="9">
                <CLabel htmlFor="text-input">PhoneNo</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput  name="PRIMARY_PHONE_NO" placeholder="PhoneNo" minLength="10" maxLength="10" value={CompanyData.PRIMARY_PHONE_NO}   onChange={(e)=>handleInputChange(e)} />
              </CCol>
            </CFormGroup>
            </div>
            <div className="row">
            <CFormGroup className="col-md-6">
              <CCol md="9">
                <CLabel htmlFor="text-input">Seccondary Phone No</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput id="text-input" name="SECONDARY_PHONE_NO" placeholder="Seccondary Phone No" value={CompanyData.SECONDARY_PHONE_NO}   onChange={(e)=>handleInputChange(e)} />
              </CCol>
            </CFormGroup>
            <CFormGroup className="col-md-6" >
              <CCol md="9">
                <CLabel htmlFor="email-input">Email</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput type="email" id="email-input" name="EMAIL_ADDRESS" placeholder="Enter Email" autoComplete="email" value={CompanyData.EMAIL_ADDRESS}   onChange={(e)=>handleInputChange(e)}/>
              </CCol>
            </CFormGroup>
            </div>
            <div className="row">
            <CFormGroup className="col-md-6">
              <CCol md="9">
                <CLabel htmlFor="text-input">Postal Code</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput id="text-input" name="POSTAL_CODE" placeholder="Postal Code" value={CompanyData.POSTAL_CODE}   onChange={(e)=>handleInputChange(e)}/>
              </CCol>
            </CFormGroup>
            <CFormGroup className="col-md-6" >
              <CCol md="9">
                <CLabel htmlFor="textarea-input">Address</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CTextarea 
                  name="ADDRESS" 
                  id="textarea-input" 
                  rows="9"
                  placeholder="Address..." value={CompanyData.ADDRESS}  onChange={(e)=>handleInputChange(e)}
                />
              </CCol>
            </CFormGroup>
            <CFormGroup className="col-md-6">
            <CCol md="6">
              <CLabel  htmlFor="file-input">Company Logo</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInputFile id="file-input" name="COMPANY_LOGO" value={CompanyData.COMPANY_LOGO}   onChange={(e)=>handleInputChange(e)}/>
              </CCol>
            </CFormGroup>
           
              </div>
           
            <CCol xs="6">
                  <CFormGroup>
                    <CLabel htmlFor="name">Status</CLabel>
                    <CSwitch className={'mx-1'} variant={'3d'} name="StatusSwitch" color={'primary'} checked={CompanyData.StatusSwitch} onChange={(e)=>ChangeSwitch(e)}/>
                    </CFormGroup>
                </CCol>

          </CForm>
         
        </CCardBody>
        <div className="row">
          
        <CCol className="col-md-4">
              
              </CCol>
              <CCol className="col-md-4">
               
        <CCardFooter>
          <CButton size="sm" color="primary" onClick={(e)=>SaveCompany()}><CIcon name="cil-scrubber" /> Save</CButton>
          <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
        </CCardFooter>
      
              </CCol>
        <CCol className="col-md-4">
               
              </CCol>
        </div>
      </CCard>
      </CCol>
    </CRow>
                   
                 
  )
}

export default Createcompany

