import React, { useState,useEffect,array } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CCollapse,
  CSelect,
  CForm,
  CTextarea,
  CFade,
  CDropdownMenu,
  CDropdownItem,
  CDropdown,
  CDropdownDivider,
  CDropdownToggle,
  CLabel,
  CSwitch,
  CFormGroup,
  CInput,
  CInputRadio,
  CInputFile,
  CRow 
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { DocsLink } from 'src/reusable'
import baseURL from '../../../common/CommonData'
//import { for } from 'core-js/fn/symbol'
const BranchCreate= (branchid) => {
  const [page, setPage] = useState(1);
 let path=branchid.location.pathname;
 let param=!path ? "":path.split("/")[4];
 if(param==undefined){
   param=0;
 }
 const DefBranchData={};

 
const DefCountryData=[{
   
  countrY_NAME:"--select Country--",
  pK_COUNTRY_ID:""
}]

const DefStateData=[{
 
  statE_NAME:"--select State--",
  pK_STATE_ID:""
}]

const DefmanagerData=[{
 
  NAME:"--select Manager--",
   pK_EMP_ID:""
 }]

 const [branchlist,setbranchlist]=useState([]);
  const [BranchData,setBranchData]=useState(DefBranchData);
  const [CountryData,setCountryData]=useState(DefCountryData);
  const [StateData,setStateData]=useState(DefStateData);
  const [ManagerData,setManagerData]=useState(DefmanagerData);
  const ChangeSwitch = (event)=>{
    const { name, value } = event.target;
    BranchData.StatusSwitch=event.target.checked;
    BranchData.IS_ACTIVE=event.target.checked == true?1:0;
    setBranchData({ ...BranchData, [name]: event.target.checked })
  }
  
  
useEffect(()=>{
 
  LoadCountries();
  LoadManager();
  if (param>0){
    fetch(baseURL+"api/BUSINESS_UNIT/"+param)
    .then(res => res.json())
      .then(response => {
  
        const obj=response;//branchlist.filter((e) => e.PK_BRANCH_ID === DefBranchData.PK_BRANCH_ID)[0];
        const Branch_ ={};
        Branch_.PK_BRANCH_ID=obj.pK_BRANCH_ID;
       // BranchData.FK_MANAGER_ID=obj.MANAGER;
       Branch_.selectmanager="1";//String(obj.fK_MANAGER_ID);
       Branch_.BRANCH_NAME=obj.brancH_NAME;
       Branch_.BRANCH_CODE=obj.brancH_CODE;
       // BranchData.COUNTRY_ID=obj.COUNTRY_ID;
       Branch_.selectedCountry=String(obj.countrY_ID);
       LoadStates(obj.countrY_ID);
      BranchData.PRIMARY_PHONE_NO=obj.PhoneNo;
       BranchData.SECONDARY_PHONE_NO=obj.Seccondary_PhoneNo;
       //BranchData.EMAIL_ADDRESS=obj.Email;
       BranchData.POSTAL_CODE=obj.Postal_Code;
       BranchData.ADDRESS=obj.Address;
       // BranchData.STATE_ID=obj.STATE_ID;
       Branch_.selectedState=String(obj.statE_ID);
       Branch_.TIME_ZONE=obj.timE_ZONE;
       Branch_.IS_ACTIVE=obj.iS_ACTIVE;
       Branch_.StatusSwitch=obj.iS_ACTIVE == 1 ?true:false;
       setBranchData(Branch_);
       // CountryData.ModelLabel="Update Country";
        // setBranchData(BranchData);
   
      })
    }
  else{
  //Default Values
 const DefBranchData={
     
    BRANCH_CODE:"",
    BRANCH_NAME:"",
    PK_BRANCH_ID:parseInt(param),
    FK_MANAGER_ID:0,
    PRIMARY_PHONE_NO:"",
    SECONDARY_PHONE_NO:"",
    POSTAL_CODE:"",
    ADDRESS:"",
    TIME_ZONE:"",
    COUNTRY_ID:0,
    STATE_ID:0,
    IS_ACTIVE:0,
    StatusSwitch:false,
    //ModelLabel:"Create Branch",
    selectedCountry: "",
    selectedState: "",
    selectmanager:""
  }
  }
  
  }, [page]);
 
  const handleInputChange = (event) => {
    const { name, value } = event.target
    setBranchData({ ...BranchData, [name]: value })
  }
  const CountryChange = (event) => {
    const { name, value } = event.target
    BranchData.selectedCountry=value;
    // CountryData.ModelLabel="Update Country";
     setBranchData(BranchData);
    // setBranchData({ ...BranchData, [name]: value })
    LoadStates(value);
  }

  const StateChange = (event) => {
    const { name, value } = event.target
    BranchData.selectedState=value;
    // CountryData.ModelLabel="Update Country";
     setBranchData(BranchData);
    // setBranchData({ ...BranchData, selectedState: value })
  }

  const ManagerChange = (event) => {
    const { name, value } = event.target;
    BranchData.selectmanager=value;
     setBranchData(BranchData);
    // setBranchData({ ...BranchData, selectmanager: value })
  }
  const toggle = ()=>{
    setBranchData(DefBranchData);
   // setModal(!modal);
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
        // const CountryDrp={};
        // CountryDrp=Country_Data;
        BranchData.selectedCountry="";
        setCountryData(Country_Data);
        setBranchData(BranchData);
        
      })
  }
  const LoadStates=(CountryId)=>{
    let parameter=parseInt( CountryId) > 0 ?"/GetSTATEByCountry?CountryId="+CountryId:""
 fetch(baseURL+"api/States"+parameter)
      .then(res => res.json())
        .then(response => {
          const State_Data=[];
          setStateData(DefStateData);
          State_Data.push({statE_NAME:"--Select State--",      pK_STATE_ID:""})
          for (const i of response) {
            const data={};
            data["statE_NAME"]=i.statE_NAME;
            data["pK_STATE_ID"]=i.pK_STATE_ID;
          State_Data.push(data)
          }
          // const CountryDrp={};
          // CountryDrp=Country_Data;
          BranchData.selectedState="";
          setStateData(State_Data);
          setBranchData(BranchData);
          
        })
  }
  const LoadManager=()=>{
  
     
        fetch(baseURL+"api/EMPLOYEE_MAIN_DETAILS")
        .then(res => res.json())
          .then(response => {
            const Manager_Data=[];
            setManagerData(DefmanagerData);
            Manager_Data.push({NAME:"--Select Manager--",      pK_EMP_ID:""})
            for (const i of response) {
              const data1={};
              data1["NAME"]=i.firsT_NAME+""+i.lasT_NAME;
              data1["pK_EMP_ID"]=i.pK_EMP_ID;
            Manager_Data.push(data1)
            }
            // const CountryDrp={};
            // CountryDrp=Country_Data;
            
            setManagerData(Manager_Data);
            BranchData.selectmanager="";
            setBranchData(BranchData);
            
          })     
  }
 
    const SaveBranch = ()=>{
      BranchData.COUNTRY_ID =parseInt( BranchData.selectedCountry);
      BranchData.STATE_ID = parseInt( BranchData.selectedState);
      BranchData.FK_MANAGER_ID =!BranchData.selectmanager ? 0:parseInt(BranchData.selectmanager);
     
        const url=baseURL+"api/BUSINESS_UNIT"+(BranchData.PK_BRANCH_ID > 0 ? "/"+BranchData.PK_BRANCH_ID+"":"");
        const method=BranchData.PK_BRANCH_ID > 0 ? "PUT":"POST";
        const requestOptions = {
          method: method,
          headers: { 'Content-Type': 'application/json' },
          "Access-Control-Allow-Origin": "*",
          body: JSON.stringify(BranchData)
      };
      fetch(url, requestOptions)
      .then(response => response.json())
      .then(data => FinishSave(data)
      );
    }
    
      const FinishSave = (result) => {
        if (result > 0) {
         // LoadAll();
          alert("Success");
          
    
        }
        else {
          alert("failed");
        }
      }
      return (
        <CRow>
        <CCol xs="12" md="12">
          <CCard>
            <CCardHeader>
              Create Branch
              <small></small>
            </CCardHeader>
            <CCardBody>
              <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
                <div className="row">
                 <CFormGroup className="col-md-6" >
                  <CCol md="9">
                    <CLabel htmlFor="text-input">Branch Name</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                  <CInput id="Bname" name="BRANCH_NAME" placeholder="BRANCH NAME"value={BranchData.BRANCH_NAME}onChange={(e)=>handleInputChange(e)} />
                  </CCol>
                  
                </CFormGroup>
                
                <CFormGroup className="col-md-6" >
                  <CCol md="9">
                    <CLabel htmlFor="text-input">Branch Code</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                  <CInput id="text-input" name="BRANCH_CODE"placeholder="BRANCH CODE" value={BranchData.BRANCH_CODE}onChange={(e)=>handleInputChange(e)}/>
                  </CCol>
                </CFormGroup>
               
                </div>
                <div className="row">
                <CFormGroup className="col-md-6">
                      <CCol md="9">
                        <CLabel htmlFor="select">Country</CLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                      <CSelect custom size="lg" name="pK_COUNTRY_ID" id="pK_COUNTRY_ID"  value={BranchData.selectedCountry}
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
                      </CCol>
                    </CFormGroup>
                    <CFormGroup className="col-md-6">
                      <CCol md="9">
                        <CLabel htmlFor="select">State</CLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                      <CSelect custom size="lg" name="pK_STATE_ID" id="pK_STATE_ID" value={BranchData.selectedState} onChange={(e)=>StateChange(e)}>
                        {StateData.map(item => (
                           <option key={item.pK_STATE_ID}
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
                    <CLabel htmlFor="date-input">Manager Name</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                  <CSelect custom size="lg" name="pK_EMP_ID" id="pK_EMP_ID" value={BranchData.selectmanager} onChange={(e)=>ManagerChange(e)}>
                   
                   {ManagerData.map(item => (
       <option
         key={item.pK_EMP_ID}
         value={item.pK_EMP_ID}
       >
         {item.NAME}
       </option>
     ))}
              </CSelect>
                  </CCol>
                </CFormGroup>
                <CFormGroup className="col-md-6">
                  <CCol md="9">
                    <CLabel htmlFor="text-input">Time Zone</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                  <CInput id="Tzone" name="TIME_ZONE" placeholder="TIME ZONE"value={BranchData.TIME_ZONE}onChange={(e)=>handleInputChange(e)} />
                  </CCol>
                </CFormGroup>
                </div>
                <div className="row">
               
                <CFormGroup className="col-md-6">
                  <CCol md="9">
                    <CLabel htmlFor="text-input">PhoneNo</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput id="text-input" name="PRIMARY_PHONE_NO" placeholder="PhoneNo" value={BranchData.PRIMARY_PHONE_NO}   onChange={(e)=>handleInputChange(e)} />
                  </CCol>
                </CFormGroup>
                </div>
                <div className="row">
                <CFormGroup className="col-md-6">
                  <CCol md="9">
                    <CLabel htmlFor="text-input">Seccondary Phone No</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput id="text-input" name="SECONDARY_PHONE_NO" placeholder="Seccondary Phone No" value={BranchData.SECONDARY_PHONE_NO}   onChange={(e)=>handleInputChange(e)} />
                  </CCol>
                </CFormGroup>
    
                </div>
                <div className="row">
                <CFormGroup className="col-md-6">
                  <CCol md="9">
                    <CLabel htmlFor="text-input">Postal Code</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput id="text-input" name="POSTAL_CODE" placeholder="Postal Code" value={BranchData.POSTAL_CODE}   onChange={(e)=>handleInputChange(e)}/>
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
                      placeholder="Address..." value={BranchData.ADDRESS}  onChange={(e)=>handleInputChange(e)}
                    />
                  </CCol>
                </CFormGroup>
              
               
                  </div>
               
                <CCol xs="6">
                      <CFormGroup>
                        <CLabel htmlFor="name">Status</CLabel>
                        <CSwitch className={'mx-1'} variant={'3d'} name="StatusSwitch" color={'primary'} checked={BranchData.StatusSwitch} onChange={(e)=>ChangeSwitch(e)}/>
                        </CFormGroup>
                    </CCol>
    
              </CForm>
             
            </CCardBody>
            <div className="row">
              
            <CCol className="col-md-4">
                  
                  </CCol>
                  <CCol className="col-md-4">
                   
            <CCardFooter>
              <CButton type="submit" size="sm" color="primary" onClick={(e)=>SaveBranch()}><CIcon name="cil-scrubber" /> Save</CButton>
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

export default BranchCreate
