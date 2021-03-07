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
  CTextarea,
  CRow, 
  CLink
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { DocsLink } from 'src/reusable'
import Collapses from '../../collapses/Collapses'

import baseURL from '../../../common/CommonData'


//import { for } from 'core-js/fn/symbol'




const Create = (empid) => {
let path= empid.location.pathname;
let param=!path ? "":path.split("/")[4];
if(param == undefined){
  param = 0;
}
  const [collapse, setCollapse] = useState(false)
  const [collapse1, setCollapse1] = useState(false)
  const [collapse2, setCollapse2] = useState(false)
  const [collapse3, setCollapse3] = useState(false)
  const [collapse4, setCollapse4] = useState(false)
  const [collapse5, setCollapse5] = useState(false)
  const [collapseMulti, setCollapseMulti] = useState([false, false])
 // const [collapseMulti, setCollapseMulti] = useState([false, false])
  const [accordion, setAccordion] = useState(1)
  const [fade, setFade] = useState(true)
  const [page, setPage] = useState(1); 
  const DefEmpdata= {
    FIRST_NAME:"",
   LAST_NAME:"",
   EMAIL_ID:"",
   PK_EMP_ID:parseInt(param),
    IS_ACTIVE:0,
    BRANCHID:0,
    PREFIX_ID :0,
    LANGUAGE_ID :0,
    DEPT_ID :0,
    JOB_TITLE_ID:0,
    MANAGER_ID:0,
    EMPLOYEEID:"",
    PASSWORD:"",
    CPASSWORD:"",
    MOBILE_NO:"",
    TEL_NO: "",
    GENDER:"",
    MARITAL_STATUS:"",
    NATIONALITY:"",
    BLOOD_GROUP:"",
    PERSONAL_EMAIL:"",
    PHOTO:"",
    DATE_OF_JOIN:1/12/2020,
    DATE_OF_BIRTH:1/12/2020,
    ALLOW_LOGIN:"",
    StatusSwitch: false,
    selectNation:"",
    selectedDept:"",
    selectedbranch:"",
    selectedpfix:"",
    selectedlang:"",
    selectedjob:"",
    selectedmnger:"",
    autogenerte:0
  }
const DefdeptData=[{
   
  departmenT_NAME:"--select Department--",
  pK_DEPARTMENT_ID:0
}]
const DefbranchData=[{
  brancH_NAME:"--select branch--",
  pK_BRANCH_ID:0
}]
const DefpfixData=[{
   
  name:"--select prefix--",
  pK_PREFIX_ID:0
}]
const DeflangData=[{
   
  name:"--select language--",
  pK_LANGUAGE_ID:0
}]
const DefmngerData=[{
   
  NAME:"--select manager--",
  pK_EMP_ID:0
}]
const DefjobData=[{
   
  name:"--select designation--",
  pK_DESIGNATION_ID:0
}]
const DefnationData=[{
   
  nationalitY_NAME:"--select Nationality--",
  pK_NATIONALITY_ID:0
}]
const DefEmpAddress ={
  PK_UNIQUE_ID:0,
  FK_EMP_ID:DefEmpdata.PK_EMP_ID,
  COUNTRY_ID:0,
  STATE_ID:0,
  CITY:"",
  EMAIL:"",
  POSTAL_CODE:"",
  ADDRESS:"",
  EMERGENCY_NAME:"",
  EMERGENCY_PHONE_NO:"",
  EMERGENCY_CONTACT_EMAIL:"",
  selectedstate:"",
  selectedcountry:""
}
const DefCountryData=[{
   
  countrY_NAME:"--select Country--",
  pK_COUNTRY_ID:0
}]
const DefStateData=[{
   
  statE_NAME:"--select State--",
  pK_STATE_ID:0
}]
const DefEduData ={
  PK_EDUCATION_ID:0,
  FK_EMP_ID:DefEmpdata.PK_EMP_ID,
  EDUCATION_LEVEL:"",
  INSTITUTION_NAME:"",
  COURSE:""
  
}

const DefcertificateData={
  PK_CERTIFICATION_ID:0,
  FK_EMP_ID:DefEmpdata.PK_EMP_ID,
  CERTIFICATION_NAME:"",
  COURSE_CODE:0,
  ISSUED_DATE:"2020-02-01",
  COURSE_OFFERED_BY:""
}
const DefContractData={
  PK_CONTRACT_ID:0,
  FK_EMP_ID:DefEmpdata.PK_EMP_ID,
  CONTRACT_NAME:"",
  IS_ACTIVE:0,
  CONTRACT_START:"2020-02-01",
  CONTRACT_END:"2020-02-01",
  StatusSwitch1:""
}
const DefPassData={
  PK_DOCUMENT_ID:0,
  FK_EMP_ID:DefEmpdata.PK_EMP_ID,
  PASSPORT_NO:0,
  DRIVING_LICENSE_NO:0,
  PASSPORT_ISSUE_DATE:"2020-02-01",
  PASSPORT_EXPIRY_DATE:"2020-02-01",
  LICENSE_TYPE:"",
  LICENSE_ISSUE_DATE:"2020-02-01",
  LICENSE_EXPIRY_DATE:"2020-02-01",
  ID_NO:"",
  ID_ISSUE_DATE:"2020-02-01",
  ID_EXPIRY_DATE:"2020-02-01",
  VISA_NO:"",
  VISA_ISSUE_DATE:"2020-02-01",
  VISA_EXPIRY_DATE:"2020-02-01",
  PASSPORT_EXPIRY_REMINDER:0,
  ID_EXPIRY_REMINDER:0,
  VISA_EXPIRY_REMINDER:0,
}
const [AddData,setaddrdata]=useState(DefEmpAddress);
const [countrydata,setcountrydata]=useState(DefCountryData);
const [statedata,setstatedata]=useState(DefStateData);
const [EduData,setedudata]=useState(DefEduData);
const [CertificateData,setcertificateData]=useState(DefcertificateData);
const [ContractData,setcontractdata]=useState(DefContractData);
const [PassData,setpassdata]=useState(DefPassData);

const [nationdata,setnationdata]=useState(DefnationData);

const [Deptdata,setdeptdata]=useState(DefdeptData);
const [Branchdata,setbranchdata]=useState(DefbranchData);
const [pfixdata,setpfixdata]=useState(DefpfixData);
const [lngdata,setlngdata]=useState(DeflangData);
const [mngdata,setmngdata]=useState(DefmngerData);
const [jobdata,setjobdata]=useState(DefjobData);
const [Empdata,setempdata]=useState(DefEmpdata);
 //const [isLoading, setIsLoading] = useState(true);
const ChangeSwitch = (event)=>{
  const { name, value } = event.target;
  Empdata.StatusSwitch=event.target.checked;
  Empdata.IS_ACTIVE=event.target.checked == true?1:0;
  setempdata({ ...Empdata, [name]: event.target.checked })
}
const ChangeSwitch1 = (event)=>{
  const { name, value } = event.target;
  ContractData.StatusSwitch1=event.target.checked;
  ContractData.IS_ACTIVE=event.target.checked == true?1:0;
  setcontractdata({ ...ContractData, [name]: event.target.checked })
}

const handleInputChange = (event, level) => {
  if(level==1){
  const { name, value } = event.target
  setempdata({ ...Empdata, [name]: value })
  }
  if (level==3){
    const { name, value } = event.target
  setedudata({ ...EduData, [name]: value })
  
  }
  if(level==4){
    const { name, value } = event.target
    setcertificateData({ ...CertificateData, [name]: value })
    
  }
  if(level==5){
    const { name, value } = event.target
    setcontractdata({ ...ContractData, [name]: value })
    
  }
  if(level==6){
    const { name, value } = event.target
    setpassdata({ ...PassData, [name]: value })
    
  }
}
const handleInputChangeAddress = (event) => {
  const { name, value } = event.target
  setaddrdata({ ...AddData, [name]: value })
}
  const toggle = (e) => {
    setCollapse(!collapse)
    setCollapse1(false)
    setCollapse2(false)
    setCollapse3(false)
    setCollapse4(false)
    setCollapse5(false)
    e.preventDefault()
   
  }
  const toggle1 = (e) => {
    if(AddData.FK_EMP_ID){
      setCollapse1(!collapse1)
    }
     
     setCollapse(false)
    setCollapse2(false)
    setCollapse3(false)
    setCollapse4(false)
    setCollapse5(false)
  
    e.preventDefault()
   // setempdata(DefEmpdata);
  }
  const toggle2 = (e)=>{
    if(EduData.FK_EMP_ID){
      setCollapse2(!collapse2)
    }
 
    setCollapse1(false)
    setCollapse(false)
    setCollapse3(false)
    setCollapse4(false)
    setCollapse5(false)

    e.preventDefault()
  
  }
  const toggle3 = (e)=>{
    if(CertificateData.FK_EMP_ID){
      setCollapse3(!collapse3)
    }
   
    setCollapse1(false)
    setCollapse2(false)
    setCollapse(false)
    setCollapse4(false)
    setCollapse5(false)
    e.preventDefault()
  
  }
  const toggle4 = (e)=>{
    if(ContractData.FK_EMP_ID){
      setCollapse4(!collapse4)
    }

    setCollapse1(false)
    setCollapse2(false)
    setCollapse3(false)
    setCollapse(false)
    setCollapse5(false)
    e.preventDefault()
  
  }
  const toggle5 = (e)=>{
    if(PassData.FK_EMP_ID){
      setCollapse5(!collapse5)
    }
  
    setCollapse1(false)
    setCollapse2(false)
    setCollapse3(false)
    setCollapse4(false)
    setCollapse(false)
    e.preventDefault()
  
  }
  const dropdownchange = (event,level) => {
    if(level==1){
      const { name, value } = event.target
    setempdata({ ...Empdata, selectedDept: value })
    }
    else if(level==2){
      const { name, value } = event.target
      setempdata({ ...Empdata, selectedbranch: value })
    
    }
    else if(level==3){
      const { name, value}= event.target
      setempdata({ ...Empdata, selectedpfix: value})
    }
    else if(level==4){
      const { name, value}= event.target
      setempdata({ ...Empdata, selectedlang: value})
    }
    else if(level==5){
      const { name, value}= event.target
      setempdata({ ...Empdata, selectedmnger: value})
    }
    else if(level==6){
      const { name, value}= event.target
      setempdata({ ...Empdata, selectedjob: value})
    }
    else if(level==7){
      const { name, value}= event.target
    AddData.selectedcountry=value;
    setaddrdata(AddData);
      LoadStates(value);
    }
    else if(level==8){
      const { name, value}= event.target
      setaddrdata({ ...AddData, selectedstate: value})
  
    }
    else if(level==9){
      const { name, value}= event.target
      setempdata({ ...Empdata, selectNation: value})
  
    }
  }
  const Loaddropdown=()=>{
   
    fetch(baseURL+"api/Departments")
    .then(res => res.json())
      .then(response => {
        const dept_data=[];
        setdeptdata(DefdeptData);
        dept_data.push({departmenT_NAME:"--Select Departments--",      pK_DEPARTMENT_ID:""})
        for (const i of response) {
          const data={};
          data["departmenT_NAME"]=i.departmenT_NAME;
          data["pK_DEPARTMENT_ID"]=i.pK_DEPARTMENT_ID;
          dept_data.push(data)
        }
        Empdata.selectedDept="";
        setdeptdata(dept_data);
        setempdata(Empdata);
       // setBranchData(BranchData);
        
      })
        fetch(baseURL+"api/BUSINESS_UNIT")
        .then(res => res.json())
        .then(response =>{
          const branch_data=[];
          setbranchdata(DefbranchData);
          branch_data.push({brancH_NAME:"--Select branch--", pK_BRANCH_ID:""})
          for (const i of response){
            const data1={};
            data1["brancH_NAME"]=i.brancH_NAME;
            data1["pK_BRANCH_ID"]=i.pK_BRANCH_ID;
            branch_data.push(data1);
           // branchlist.push(data1);
          }
          Empdata.selectedbranch="";
      
          setbranchdata(branch_data);
          
          setempdata(Empdata);
          //setbranchdata(Branchdata);
          
        
        })
        fetch(baseURL+"api/Common/GetPrefix")
        .then(res => res.json())
        .then(response =>{
          const pfx_data=[];
          setpfixdata(DefpfixData);
          pfx_data.push({name:"--Select prefix--", pK_PREFIX_ID:""})
          for (const i of response){
            const data1={};
            data1["name"]=i.name;
            data1["pK_PREFIX_ID"]=i.pK_PREFIX_ID;
            pfx_data.push(data1)
          }
          Empdata.selectedpfix="";
          setpfixdata(pfx_data);
          setempdata(Empdata);
          //setbranchdata(Branchdata);
          
        
        })
        fetch(baseURL+"api/Common/GetLanguage")
        .then(res => res.json())
        .then(response =>{
          const lng_data=[];
          setlngdata(DeflangData);
          lng_data.push({name:"--Select language--", pK_LANGUAGE_ID:""})
          for (const i of response){
            const data1={};
            data1["name"]=i.name;
            data1["pK_LANGUAGE_ID"]=i.pK_LANGUAGE_ID;
            lng_data.push(data1)
          }
          Empdata.selectedlang=0;
          setlngdata(lng_data);
          setempdata(Empdata);
          //setbranchdata(Branchdata);
          
        
        })
        fetch(baseURL+"api/DESIGNATIONs")
        .then(res => res.json())
        .then(response =>{
          const job_data=[];
          setjobdata(DefjobData);
          job_data.push({name:"--Select designation--", pK_DESIGNATION_ID:""})
          for (const i of response){
            const data1={};
            data1["name"]=i.name;
            data1["pK_DESIGNATION_ID"]=i.pK_DESIGNATION_ID;
            job_data.push(data1)
          }
          Empdata.selectedjob="";
          setjobdata(job_data);
          setempdata(Empdata);
          //setbranchdata(Branchdata);
          
        
        })
        fetch(baseURL+"api/EMPLOYEE_MAIN_DETAILS")
        .then(res => res.json())
        .then(response =>{
          const emp_data=[];
          setmngdata(DefmngerData);
          emp_data.push({NAME:"--Select manager--", pK_EMP_ID:""})
          for (const i of response){
            const data1={};
            data1["NAME"]=i.firsT_NAME +" "+ i.lasT_NAME;
            data1["pK_EMP_ID"]=i.pK_EMP_ID;
            emp_data.push(data1)
          }
          Empdata.selectedmnger="";
          setmngdata(emp_data);
          setempdata(Empdata);
          //setbranchdata(Branchdata);
          
        
        })
        fetch(baseURL+"api/countries")
        .then(res => res.json())
        .then(response =>{
          const country_data=[];
          setcountrydata(DefCountryData);
          country_data.push({countrY_NAME:"--Select country--", pK_COUNTRY_ID:""})
          for (const i of response){
            const data1={};
            data1["countrY_NAME"]=i.countrY_NAME;
            data1["pK_COUNTRY_ID"]=i.pK_COUNTRY_ID;
            country_data.push(data1)
          }
          AddData.selectedcountry="";
          setcountrydata(country_data);
          setaddrdata(AddData);
          //setbranchdata(Branchdata);
          
        
        })
        fetch(baseURL+"api/Common/GetNationality")
        .then(res => res.json())
        .then(response =>{
          const nation_data=[];
          setnationdata(DefnationData);
          nation_data.push({nationalitY_NAME:"--Select Nationality--", pK_NATIONALITY_ID:""})
          for (const i of response){
            const data1={};
            data1["nationalitY_NAME"]=i.nationalitY_NAME;
            data1["pK_NATIONALITY_ID"]=i.pK_NATIONALITY_ID;
            nation_data.push(data1)
          }
          Empdata.selectNation="";
          setnationdata(nation_data);
          setempdata(Empdata);
          //setbranchdata(Branchdata);
          
        
        })
        // const CountryDrp={};
        // CountryDrp=Country_Data;
      
      .catch(error => console.log(error));
   
} 
const LoadStates=(CountryId)=>{
  let parameter=parseInt( CountryId) > 0 ?"/GetSTATEByCountry?CountryId="+CountryId:""
fetch(baseURL+"api/States"+parameter)
    .then(res => res.json())
      .then(response => {
        const State_Data=[];
        setstatedata(DefStateData);
        State_Data.push({statE_NAME:"--Select State--",      pK_STATE_ID:""})
        for (const i of response) {
          const data={};
          data["statE_NAME"]=i.statE_NAME;
          data["pK_STATE_ID"]=i.pK_STATE_ID;
        State_Data.push(data)
        }
        // const CountryDrp={};
        // CountryDrp=Country_Data;
        AddData.selectedstate="";
        setstatedata(State_Data);
        setaddrdata(AddData);
        
      })
}
  const toggleFade = () => {
    setFade(!fade)
  }
 
  const showpass = (id)=>{
    if(id ==1)
    {
      document.getElementById('autogenerated').style.display ='block';
    }
    else {
      document.getElementById('autogenerated').style.display ='none';
    }
  

  }
  const showauto = (id)=>{
    if(id ==1)
    {
      document.getElementById('passform').style.display ='block';
    }
    else {
      document.getElementById('passform').style.display ='none';
    }
  
  }
  function checkpassword() {
     if(Empdata.PASSWORD!==Empdata.CPASSWORD){
       alert("password missmatch");
       return;
     }

  }

  const Saveemp = (level)=>{
    if(level==1){
    Empdata.ALLOW_LOGIN=parseInt(Empdata.ALLOW_LOGIN);
    Empdata.DEPT_ID=parseInt(Empdata.selectedDept);
    Empdata.BRANCHID=parseInt(Empdata.selectedbranch);
    Empdata.PREFIX_ID=parseInt(Empdata.selectedpfix);
    Empdata.LANGUAGE_ID=parseInt(Empdata.selectedlang);
    Empdata.MANAGER_ID=parseInt(Empdata.selectedmnger);
    Empdata.JOB_TITLE_ID=parseInt(Empdata.selectedjob);
    Empdata.NATIONALITY= Empdata.selectNation;
    //Empdata.DATE_OF_BIRTH=Empdata.DATE_OF_BIRTH.split(' ')[0];
  
    if(Empdata.ALLOW_LOGIN==1){
      checkpassword();
      //return;
    }
    if(!Empdata.FIRST_NAME || !Empdata.LAST_NAME)
    {
      alert("Please fill out the fields");
        return;
    }

     AddData.FK_EMP_ID=Empdata.PK_EMP_ID;
    EduData.FK_EMP_ID=Empdata.PK_EMP_ID;
    CertificateData.FK_EMP_ID=Empdata.PK_EMP_ID;
    ContractData.FK_EMP_ID=Empdata.PK_EMP_ID;
    PassData.FK_EMP_ID=Empdata.PK_EMP_ID;
   
         //if (CountryData.DEPARTMENT_NAME !="" && CountryData.DEPARTMENT_CODE != null){
      const url=baseURL+"api/EMPLOYEE_MAIN_DETAILS"+(Empdata.PK_EMP_ID > 0 ? "/"+Empdata.PK_EMP_ID+"":"");
      const method=Empdata.PK_EMP_ID > 0 ? "PUT":"POST";
      const requestOptions = {
        method: method,
        headers: { 'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"},
        body: JSON.stringify(Empdata)
    };
    fetch(url, requestOptions)
    .then(response => response.json())
    .then(data => FinishSave(data)
    );
  }

    if( level==2){
      AddData.COUNTRY_ID =parseInt( AddData.selectedcountry);
      AddData.STATE_ID = parseInt( AddData.selectedstate);
      
      const url=baseURL+"api/EMPLOYEE_MAIN_DETAILS/SaveAddress"+(AddData.PK_UNIQUE_ID > 0 ? "/"+AddData.PK_UNIQUE_ID+"":"");
      const method=AddData.PK_UNIQUE_ID > 0 ? "PUT":"POST";
      const requestOptions = {
        method: method,
        headers: { 'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"},
        body: JSON.stringify(AddData)
    };
    fetch(url, requestOptions)
    .then(response => response.json())
    .then(data => FinishSave(data,1)
    );
    }
    if( level==3){
      const url=baseURL+"api/EMPLOYEE_MAIN_DETAILS/SaveEdu"+(EduData.PK_EDUCATION_ID > 0 ? "/"+EduData.PK_EDUCATION_ID+"":"");
      const method=EduData.PK_EDUCATION_ID > 0 ? "PUT":"POST";
      const requestOptions = {
        method: method,
        headers: { 'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"},
        body: JSON.stringify(EduData)
    };
    
    fetch(url, requestOptions)
    .then(response => response.json())
    .then(data => FinishSave(data,2)
    );
    }
    if( level==4){
      const url=baseURL+"api/EMPLOYEE_MAIN_DETAILS/SaveCertificate"+(CertificateData.PK_CERTIFICATION_ID > 0 ? "/"+CertificateData.PK_CERTIFICATION_ID+"":"");
      const method=CertificateData.PK_CERTIFICATION_ID > 0 ? "PUT":"POST";
      const requestOptions = {
        method: method,
        headers: { 'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"},
        body: JSON.stringify(CertificateData)
    };
    fetch(url, requestOptions)
    .then(response => response.json())
    .then(data => FinishSave(data,3)
    );
    }
    if( level==5){
      const url=baseURL+"api/EMPLOYEE_MAIN_DETAILS/SaveContract"+(ContractData.PK_CONTRACT_ID > 0 ? "/"+ContractData.PK_CONTRACT_ID+"":"");
      const method=ContractData.PK_CONTRACT_ID > 0 ? "PUT":"POST";
      const requestOptions = {
        method: method,
        headers: { 'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"},
        body: JSON.stringify(ContractData)
    };
    fetch(url, requestOptions)
    .then(response => response.json())
    .then(data => FinishSave(data,4)
    );
    }
    if( level==6){
      const url=baseURL+"api/EMPLOYEE_MAIN_DETAILS/SavePassport"+(PassData.PK_DOCUMENT_ID > 0 ? "/"+PassData.PK_DOCUMENT_ID+"":"");
      const method=PassData.PK_DOCUMENT_ID > 0 ? "PUT":"POST";
      const requestOptions = {
        method: method,
        headers: { 'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"},
        body: JSON.stringify(PassData)
    };
    fetch(url, requestOptions)
    .then(response => response.json())
    .then(data => FinishSave(data)
    );
    }


  }

 
  const FinishSave = (result,level) => {
    if (result > 0) {
      Loaddropdown();
      AddData.FK_EMP_ID=result;
      if(level==1){
        EduData.FK_EMP_ID=result;
      }
      else if(level==2){
        CertificateData.FK_EMP_ID=result;
      }
      else if(level==3){
     
        ContractData.FK_EMP_ID=result;
      }
      else if(level==4){
       PassData.FK_EMP_ID=result;
      }
     // LoadAll();
      alert("Success");
      //history.push()
     // setModal(!modal);
     
    }
    else if (result =-1 || result == -2){
      alert("insertion failed")
    }
    else {
      alert("Failed");
    }
  }

  useEffect(()=>{
    
  
    Loaddropdown();
    LoadStates();
    setCollapse(true);
    if(DefEmpdata.PK_EMP_ID>0){
      fetch(baseURL+"api/EMPLOYEE_MAIN_DETAILS/"+DefEmpdata.PK_EMP_ID)
      .then(res => res.json())
        .then(response => {
        //  const emplist=[];
          //setempdata([]);
         // setdeptdata(DefdeptData);
        //  dept_data.push({departmenT_NAME:"--Select Departments--",      pK_DEPARTMENT_ID:""})
         
         // setempList(emplist);
           // const obj=emplist.filter((e) => e.PK_EMP_ID == DefEmpdata.PK_EMP_ID)[0];
           const obj=response;
                Empdata.PK_EMP_ID=obj.pK_EMP_ID;
                Empdata.FIRST_NAME=obj.firsT_NAME;
                Empdata.LAST_NAME=obj.lasT_NAME;
               
              Empdata.selectedbranch=obj.branchid;
              Empdata.selectedDept=obj.depT_ID;
              Empdata.selectedjob=obj.joB_TITLE_ID;
              Empdata.selectedlang=obj.languagE_ID;
              Empdata.selectedmnger=obj.manageR_ID;
              Empdata.selectedpfix=obj.prefiX_ID;
             
               Empdata.GENDER=obj.gender;
               Empdata.MARITAL_STATUS=obj.maritaL_STATUS;
              // const today=obj.DATE_OF_BIRTH.split(":")[2];
              
                Empdata.EMAIL_ID=obj.emaiL_ID;
                Empdata.MOBILE_NO=obj.mobilE_NO;
                Empdata.TEL_NO=obj.teL_NO;
                Empdata.EMPLOYEEID=obj.employeeid;
                Empdata.PERSONAL_EMAIL=obj.personaL_EMAIL;
                Empdata.selectNation=obj.nationality;
                Empdata.BLOOD_GROUP=obj.blooD_GROUP;
                Empdata.DATE_OF_JOIN= obj.datE_OF_JOIN.split("T")[0];
                Empdata.DATE_OF_BIRTH=obj.datE_OF_BIRTH.split("T")[0];
              //  Empdata.GENDER=obj.GENDER;
                
                Empdata.PHOTO=obj.photo;
                Empdata.ALLOW_LOGIN=obj.alloW_LOGIN;
                if(obj.alloW_LOGIN==1){
                  showpass(1);
                  Empdata.PASSWORD=obj.password;
                  Empdata.CPASSWORD=obj.password;
                }
                Empdata.IS_ACTIVE=obj.iS_ACTIVE;
                Empdata.StatusSwitch=obj.iS_ACTIVE == 1 ?true:false;
                //Empdata.ModelLabel="Update Departments";
                setempdata(Empdata);
               
       })
       fetch(baseURL+"api/EMPLOYEE_MAIN_DETAILS/GetEmployeeAddressDetails/"+Empdata.PK_EMP_ID)
      .then(res => res.json())
        .then(response => {
          const obj=response;
                AddData.PK_UNIQUE_ID=obj.pK_UNIQUE_ID;
                AddData.EMAIL=obj.email;
                AddData.EMERGENCY_CONTACT_EMAIL=obj.emergencY_CONTACT_EMAIL;
                
              AddData.EMERGENCY_NAME=obj.emergencY_NAME;
              AddData.selectedcountry=obj.countrY_ID;
              LoadStates(obj.countrY_ID);
              AddData.selectedstate=obj.statE_ID;
              AddData.CITY=obj.city;
              AddData.POSTAL_CODE=obj.postaL_CODE;
              AddData.EMERGENCY_PHONE_NO=obj.emergencY_PHONE_NO;
               AddData.ADDRESS=obj.address;
               AddData.FK_EMP_ID=obj.fK_EMP_ID;
              
              
                //Empdata.ModelLabel="Update Departments";
                setaddrdata(AddData);
                
       })
       fetch(baseURL+"api/EMPLOYEE_MAIN_DETAILS/GetEmployeeEduDetails/"+Empdata.PK_EMP_ID)
       .then(res => res.json())
         .then(response => {
           const obj=response;
                 EduData.PK_EDUCATION_ID=obj.pK_EDUCATION_ID;
                 EduData.EDUCATION_LEVEL=obj.educatioN_LEVEL;
                 EduData.INSTITUTION_NAME=obj.institutioN_NAME;
                
               EduData.COURSE=obj.course;
                EduData.FK_EMP_ID=obj.fK_EMP_ID;
               
                  
                 //Empdata.ModelLabel="Update Departments";
                 setedudata(EduData);
                
        })
        fetch(baseURL+"api/EMPLOYEE_MAIN_DETAILS/GetEmployeeCertificationDetails/"+Empdata.PK_EMP_ID)
       .then(res => res.json())
         .then(response => {
           const obj=response;
                 CertificateData.PK_CERTIFICATION_ID=obj.pK_CERTIFICATION_ID;
                 CertificateData.CERTIFICATION_NAME=obj.certificatioN_NAME;
                 CertificateData.COURSE_CODE=obj.coursE_CODE;
             
                 CertificateData.ISSUED_DATE=obj.issueD_DATE.split("T")[0];;
             
                 CertificateData.COURSE_OFFERED_BY=obj.coursE_OFFERED_BY;
             
                CertificateData.FK_EMP_ID=obj.fK_EMP_ID;
               
                  
                 //Empdata.ModelLabel="Update Departments";
                 setcertificateData(CertificateData);
                
        })

        fetch(baseURL+"api/EMPLOYEE_MAIN_DETAILS/GetEmployeeContractDetails/"+Empdata.PK_EMP_ID)
       .then(res => res.json())
         .then(response => {
           const obj=response;
                 ContractData.PK_CONTRACT_ID=obj.pK_CONTRACT_ID;
                 ContractData.CONTRACT_NAME=obj.contracT_NAME;
                 ContractData.StatusSwitch1=obj.iS_ACTIVE;
             
                 ContractData.CONTRACT_START=obj.contracT_START.split("T")[0];
                 ContractData.CONTRACT_END=obj.contracT_END.split("T")[0];
             
                
                 ContractData.FK_EMP_ID=obj.fK_EMP_ID;
               
                  
                 //Empdata.ModelLabel="Update Departments";
                 setcontractdata(ContractData);
                
        })
        fetch(baseURL+"api/EMPLOYEE_MAIN_DETAILS/GetEmployeePassDetails/"+Empdata.PK_EMP_ID)
        .then(res => res.json())
          .then(response => {
            const obj=response;
                  PassData.PK_DOCUMENT_ID=obj.pK_DOCUMENT_ID;
                  PassData.DRIVING_LICENSE_NO=obj.drivingG_LICENSE_NO;
                  PassData.PASSPORT_NO=obj.passporT_NO;
                  PassData.LICENSE_TYPE=obj.licencE_TYPE;
                  PassData.ID_NO=obj.iD_NO;
                  PassData.VISA_NO=obj.visA_NO;
                  PassData.PASSPORT_ISSUE_DATE=obj.passporT_ISSUE_DATE.split("T")[0];
                  PassData.PASSPORT_EXPIRY_DATE=obj.passporT_EXPIRY_DATE.split("T")[0];
                  PassData.PASSPORT_EXPIRY_REMINDER=obj.passporT_EXPIRY_REMINDER;
              
                  PassData.ID_EXPIRY_DATE=obj.iD_EXPIRY_DATE.split("T")[0];
                  PassData.ID_ISSUE_DATE=obj.iD_ISSUE_DATE.split("T")[0];
                  PassData.ID_EXPIRY_REMINDER=obj.iD_EXPIRY_REMINDER;
              
                  PassData.VISA_EXPIRY_DATE=obj.visA_EXPIRY_DATE.split("T")[0];
                  PassData.VISA_ISSUE_DATE=obj.visA_ISSUE_DATE.split("T")[0];
                  PassData.VISA_EXPIRY_REMINDER=obj.visA_EXPIRY_REMINDER;
              
                  
                  PassData.FK_EMP_ID=obj.fK_EMP_ID;
                
                   
                  //Empdata.ModelLabel="Update Departments";
                  setpassdata(PassData);
                 
         })
     }
   
  }, [page]);
 
  return (
    <CRow>
      <CCol xl="12">
        <CCard>
          <CCardHeader>
          <CLink
              color="primary"
              onClick={toggle}
              className={'mb-1'}
            >Employee  Details</CLink>
            <DocsLink name="CCollapse"/>
          </CCardHeader>
          <CCollapse show={collapse}>
            <CCardBody>
                <div className="row">
                   <CCol xs="12" md="4">
                    <CSelect  name="pK_BRANCH_ID" id="pK_BRANCH_ID" value={Empdata.selectedbranch} onChange={(e)=>dropdownchange(e,2)} >
                       {Branchdata.map(item => (
                        <option
                         key={item.pK_BRANCH_ID}
                         value={item.pK_BRANCH_ID}
                         >
                         {item.brancH_NAME}
                       </option>
                       ))} 
                    </CSelect>
                  </CCol>
              
                  <CCol xs="12" md="4">
                    <CSelect  name="pK_PREFIX_ID" id="pK_PREFIX_ID" value={Empdata.selectedpfix} onChange={(e)=>dropdownchange(e,3)} >
                       {pfixdata.map(item => (
                        <option
                         key={item.pK_PREFIX_ID}
                         value={item.pK_PREFIX_ID}
                         >
                         {item.name}
                       </option>
                       ))} 
                    </CSelect>
                  </CCol>
                  
                  <CCol xs="12" md="4">
                     <CSelect  name="pK_LANGUAGE_ID" id="pK_LANGUAGE_ID" value={Empdata.selectedlang} onChange={(e)=>dropdownchange(e,4)} >
                       {lngdata.map(item => (
                        <option
                         key={item.pK_LANGUAGE_ID}
                         value={item.pK_LANGUAGE_ID}
                         >
                         {item.name}
                       </option>
                       ))} 
                    </CSelect>
                  </CCol>
              </div>
              <br></br>
              <div className="row">
                  <CCol xs="12" md="4">
                  <CSelect  name="pK_DEPARTMENT_ID" id="pK_DEPARTMENT_ID" value={Empdata.selectedDept} onChange={(e)=>dropdownchange(e,1)} >
                    {Deptdata.map(item => (
        <option
          key={item.pK_DEPARTMENT_ID}
          value={item.pK_DEPARTMENT_ID}
        >
          {item.departmenT_NAME}
        </option>
      ))} 
      </CSelect>
      </CCol>
                  <CCol xs="12" md="4">
                  <CSelect  name="pK_DESIGNATION_ID" id="pK_DESIGNATION_ID" value={Empdata.selectedjob} onChange={(e)=>dropdownchange(e,6)} >
                       {jobdata.map(item => (
                        <option
                         key={item.pK_DESIGNATION_ID}
                         value={item.pK_DESIGNATION_ID}
                         >
                         {item.name}
                       </option>
                       ))} 
                    </CSelect>
                 </CCol>
                  <CCol xs="12" md="4">
                     <CSelect  name="pK_EMP_ID" id="pK_EMP_ID" value={Empdata.selectedmnger} onChange={(e)=>dropdownchange(e,5)} >
                       {mngdata.map(item => (
                        <option
                         key={item.pK_EMP_ID}
                         value={item.pK_EMP_ID}
                         >
                         {item.NAME}
                       </option>
                       ))} 
                    </CSelect>
                  </CCol>
               </div>
               <br></br>
              
              <div className="row">
              <CFormGroup className="col-xs-12 col-md-4">
                <CLabel htmlFor="fname">First Name</CLabel>
                <CInput id="fname" placeholder="Enter your First name" name="FIRST_NAME" value={Empdata.FIRST_NAME}  onChange={(e)=>handleInputChange(e,1)} />
              </CFormGroup>
              <CFormGroup className="col-xs-12 col-md-4">
                <CLabel htmlFor="lname">Last Name</CLabel>
                <CInput id="lname" placeholder="Enter your Last name" name="LAST_NAME" value={Empdata.LAST_NAME} onChange={(e)=>handleInputChange(e,1)}  />
              </CFormGroup>
              <CFormGroup className="col-xs-12 col-md-4">
                <CLabel htmlFor="email">email</CLabel>
                <CInput id="email" placeholder="Enter your email" name="EMAIL_ID" value={Empdata.EMAIL_ID} onChange={(e)=>handleInputChange(e,1)}  />
              </CFormGroup>
             </div>
             <div className="row">
              <CFormGroup className="col-xs-12 col-md-4">
                <CLabel htmlFor="mno">Mobile No</CLabel>
                <CInput id="mno" placeholder="Enter your Mobile no" name="MOBILE_NO" value={Empdata.MOBILE_NO} onChange={(e)=>handleInputChange(e,1)}  />
              </CFormGroup>
              <CFormGroup className="col-xs-12 col-md-4">
                <CLabel htmlFor="tel">Telephone No</CLabel>
                <CInput id="tel" placeholder="Enter your Telephone no" name="TEL_NO"  value={Empdata.TEL_NO} onChange={(e)=>handleInputChange(e,1)} />
              </CFormGroup>
              <CFormGroup className="col-xs-12 col-md-4">
                <CLabel htmlFor="empid">Employee Id</CLabel>
                <CInput id="empid" placeholder="Enter your Employee Id" name="EMPLOYEEID" value={Empdata.EMPLOYEEID} onChange={(e)=>handleInputChange(e,1)}  />
              </CFormGroup>
              </div>
              <div className="row">
              <CFormGroup className="col-xs-12 col-md-4">
                <CLabel htmlFor="Pmail">Personal Email</CLabel>
                <CInput id="Pmail" placeholder="Enter your Personal Email" name="PERSONAL_EMAIL" value={Empdata.PERSONAL_EMAIL}  onChange={(e)=>handleInputChange(e,1)} />
              </CFormGroup  >
              <CFormGroup className="col-xs-12 col-md-4">
              <CLabel htmlFor="pK_NATIONALITY_ID">Nationality</CLabel>
               
                     <CSelect  name="pK_NATIONALITY_ID" id="pK_NATIONALITY_ID" value={Empdata.selectNation} onChange={(e)=>dropdownchange(e,9)} >
                       {nationdata.map(item => (
                        <option
                         key={item.pK_NATIONALITY_ID}
                         value={item.nationalitY_NAME}
                         >
                         {item.nationalitY_NAME}
                       </option>
                       ))} 
                    </CSelect>
                
            
              </CFormGroup>
              <CFormGroup className="col-xs-12 col-md-4" >
                <CLabel htmlFor="blood">Blood Group</CLabel>
                <CInput id="blood" placeholder="Enter your Blood Group" name="BLOOD_GROUP" value={Empdata.BLOOD_GROUP} onChange={(e)=>handleInputChange(e,1)} />
              </CFormGroup>
              </div>
            <div className="row">
             
                <CFormGroup  className="col-xs-12 col-md-4">
                    <CLabel htmlFor="doj">Date of join</CLabel>
                    <CInput type="date" id="doj" name="DATE_OF_JOIN" placeholder="date" value={Empdata.DATE_OF_JOIN} onChange={(e)=>handleInputChange(e,1)} checked={Empdata.DATE_OF_JOIN} />        
                </CFormGroup>
                <CFormGroup  className="col-xs-12 col-md-4">
                    <CLabel htmlFor="dob">Date of birth</CLabel>
                    <CInput type="date" id="dob" name="DATE_OF_BIRTH" placeholder="date" value={Empdata.DATE_OF_BIRTH} onChange={(e)=>handleInputChange(e,1)} checked={Empdata.DATE_OF_BIRTH} />        
                </CFormGroup>
               
            </div>
            <CFormGroup row >
                  <CCol md="3">
                    <CLabel>Gender</CLabel>
                  </CCol>
                  
                  <CCol md="9">
                    <CFormGroup variant="custom-radio" id="gen" inline value={Empdata.GENDER} >
                      <CInputRadio custom id="fem" name="GENDER" value="F" onChange={(e)=>handleInputChange(e,1)} checked={Empdata.GENDER=="F"} />
                      <CLabel variant="custom-checkbox" htmlFor="fem">Female</CLabel>
                    </CFormGroup>
                    <CFormGroup variant="custom-radio" inline value={Empdata.GENDER} >
                      <CInputRadio custom id="mal" name="GENDER" value="M" onChange={(e)=>handleInputChange(e,1)} checked={Empdata.GENDER =="M"}/>
                      <CLabel variant="custom-checkbox" htmlFor="mal">Male</CLabel>
                    </CFormGroup>
                    <CFormGroup variant="custom-radio" inline value={Empdata.GENDER} >
                      <CInputRadio custom id="other" name="GENDER" value="O" onChange={(e)=>handleInputChange(e,1)} checked={Empdata.GENDER =="O"} />
                      <CLabel variant="custom-checkbox" htmlFor="other">other</CLabel>
                    </CFormGroup>
                  </CCol>
                </CFormGroup>
            <CFormGroup row >
                  <CCol md="3">
                    <CLabel>Martial Status</CLabel>
                  </CCol>
                  
                  <CCol md="9">
                    <CFormGroup variant="custom-radio" inline value={Empdata.MARITAL_STATUS}  >
                      <CInputRadio custom id="inline-radio1" name="MARITAL_STATUS" value="M" onChange={(e)=>handleInputChange(e,1)} checked={Empdata.MARITAL_STATUS =="M"} />
                      <CLabel variant="custom-checkbox" htmlFor="inline-radio1">Married</CLabel>
                    </CFormGroup>
                    <CFormGroup variant="custom-radio" inline  value={Empdata.MARITAL_STATUS} >
                      <CInputRadio custom id="inline-radio2" name="MARITAL_STATUS" value="S" onChange={(e)=>handleInputChange(e,1)} checked={Empdata.MARITAL_STATUS =="S"}  />
                      <CLabel variant="custom-checkbox" htmlFor="inline-radio2">Single</CLabel>
                    </CFormGroup>
                    
                  </CCol>
                </CFormGroup>
            <CFormGroup row >
                  <CLabel col md="3" htmlFor="file-input">Photo</CLabel>
                  <CCol xs="12" md="9">
                    <CInputFile id="file-input" name="PHOTO" value={Empdata.PHOTO} onChange={(e)=>handleInputChange(e,1)} />
                  </CCol>
                </CFormGroup>
                
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel>Status</CLabel>
                  </CCol>
                  <CCol md="9">
                 <CFormGroup>
                    <CSwitch className={'mx-1'} variant={'3d'} name="StatusSwitch" color={'primary'} checked={Empdata.StatusSwitch} onChange={(e)=>ChangeSwitch(e)} />
                  </CFormGroup>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel>Allow login</CLabel>
                  </CCol>
                  <CCol md="9">
                    <CFormGroup variant="custom-radio" inline value={Empdata.ALLOW_LOGIN}  >
                      <CInputRadio custom id="login1" name="ALLOW_LOGIN" value="1" onClick={() => showpass(1)} onChange={(e)=>handleInputChange(e,1)} checked={Empdata.ALLOW_LOGIN=="1"} />
                      <CLabel variant="custom-checkbox" htmlFor="login1">yes</CLabel>
                    </CFormGroup>
                    <CFormGroup variant="custom-radio" inline value={Empdata.ALLOW_LOGIN} >
                      <CInputRadio custom id="login2" name="ALLOW_LOGIN" value="0" onClick={() => showpass(0)} onChange={(e)=>handleInputChange(e,1)} checked={Empdata.ALLOW_LOGIN=="0"} />
                      <CLabel variant="custom-checkbox" htmlFor="login2">No</CLabel>
                    </CFormGroup>
                    
                  </CCol>
                </CFormGroup>
                <CFormGroup row style={{display:'none'}} id="autogenerated">
                  <CCol md="3">
                    <CLabel>Auto Generate Password</CLabel>
                  </CCol>
                  <CCol md="9">
                    <CFormGroup variant="custom-checkbox" inline   >
                      <CInputRadio custom id="auto1" name="auto" value="1" onClick={() => showauto(1)} onChange={(e)=>handleInputChange(e,1)}  checked={Empdata.autogenerte=0} />
                      <CLabel variant="custom-checkbox" htmlFor="auto1">yes</CLabel>
                    </CFormGroup>
                    <CFormGroup variant="custom-checkbox" inline >
                      <CInputRadio custom id="auto2" name="auto" value="0" onClick={() => showauto(0)} onChange={(e)=>handleInputChange(e,1)} checked={Empdata.autogenerte=1} />
                      <CLabel variant="custom-checkbox" htmlFor="auto2">No</CLabel>
                    </CFormGroup>
                    
                  </CCol>
                </CFormGroup>
                <CFormGroup row style={{display:'none'}} id="passform" className="col-xs-12 col-md-5">
                <CLabel htmlFor="pass">Password</CLabel>
                <CInput id="pass" placeholder="Enter Password " name="PASSWORD" type="password" value={Empdata.PASSWORD} onChange={(e)=>handleInputChange(e,1)}  />
                 <br></br>
                  <CLabel htmlFor="cpass">Confirm Password</CLabel>
                <CInput id="cpass" placeholder="Confirm Password " sele name="CPASSWORD" type="password"  value={Empdata.CPASSWORD}  onChange={(e)=>handleInputChange(e,1)}  />
              
              </CFormGroup>
              <CFormGroup  style={{float:'right'}} > 
                <CButton type="submit" size="sm" color="primary"onClick={(e)=>Saveemp(1)}><CIcon name="cil-scrubber" /> Submit</CButton>
                 <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
              </CFormGroup>
            </CCardBody>
          </CCollapse>
          {/* <CCardFooter> 
            <CLink
              color="primary"
              onClick={toggle}
              className={'mb-1'}
            >Toggling button</CLink>
          </CCardFooter>*/}
        </CCard>

        
     

        
      </CCol>
      <CCol xl="12">
        <CCard>
          <CCardHeader>
         
            <CLink
              color="primary"
              onClick={toggle1}
              className={'mb-1'}
            >Employee Address</CLink>
            <DocsLink name="CCollapse"/>
          </CCardHeader>
          <CCollapse show={collapse1}>
            <CCardBody>
                <div className="row">
                   <CCol xs="12" md="4">
                    <CSelect  name="pK_COUNTRY_ID" id="pK_COUNTRY_ID"  value={AddData.selectedcountry} onChange={(e)=>dropdownchange(e,7)} >
                    {countrydata.map(item => (
                        <option
                         key={item.pK_COUNTRY_ID}
                         value={item.pK_COUNTRY_ID}
                         >
                         {item.countrY_NAME}
                       </option>
                       ))}   </CSelect>
                  </CCol>
              
                  <CCol xs="12" md="4">
                    <CSelect  name="pK_STATE_ID" id="pK_STATE_ID" value={AddData.selectedstate}  onChange={(e)=>dropdownchange(e,8)} >
                    {statedata.map(item => (
                        <option
                         key={item.pK_STATE_ID}
                         value={item.pK_STATE_ID}
                         >
                         {item.statE_NAME}
                       </option>
                       ))} </CSelect>
                  </CCol>
            
              </div>
              <br></br>
               <div className="row">
              <CFormGroup className="col-xs-12 col-md-4">
                <CLabel htmlFor="city">City</CLabel>
                <CInput id="city" placeholder="Enter your City" name="CITY" value={AddData.CITY}  onChange={(e)=>handleInputChangeAddress(e)} />
              </CFormGroup>
              <CFormGroup className="col-xs-12 col-md-4">
                <CLabel htmlFor="ema">Email</CLabel>
                <CInput id="ema" placeholder="Enter your Email" type="email" name="EMAIL" value={AddData.EMAIL} onChange={(e)=>handleInputChangeAddress(e)}  />
              </CFormGroup>
              <CFormGroup className="col-xs-12 col-md-4">
                <CLabel htmlFor="pcode">Postal Code</CLabel>
                <CInput id="pcode" placeholder="Enter your postal code" name="POSTAL_CODE" value={AddData.POSTAL_CODE} onChange={(e)=>handleInputChangeAddress(e)}  />
              </CFormGroup>
             </div>
             <div className="row">
              <CFormGroup className="col-xs-12 col-md-4">
                <CLabel htmlFor="address">Address</CLabel>
               
                
                    <CTextarea 
                      name="ADDRESS" 
                      id="address" 
                      rows="9"
                      placeholder="Address..." 
                      value={AddData.ADDRESS}
                      onChange={(e)=>handleInputChangeAddress(e)}

                    />
                 </CFormGroup>
              <CFormGroup className="col-xs-12 col-md-4">
                <CLabel htmlFor="ename">Emergency Name</CLabel>
                <CInput id="ename" placeholder="Enter your Emergency contact name" name="EMERGENCY_NAME"  value={AddData.EMERGENCY_NAME} onChange={(e)=>handleInputChangeAddress(e)} />
              </CFormGroup>
              <CFormGroup className="col-xs-12 col-md-4">
                <CLabel htmlFor="eempid">Emergency Email Id</CLabel>
                <CInput id="eempid" placeholder="Enter your Emergency email Id" name="EMERGENCY_CONTACT_EMAIL" value={AddData.EMERGENCY_CONTACT_EMAIL} onChange={(e)=>handleInputChangeAddress(e)}  />
              </CFormGroup>
              </div>
              <div className="row">
              <CFormGroup className="col-xs-12 col-md-4">
                <CLabel htmlFor="eeno">Emergency phone no</CLabel>
                <CInput id="eeno" placeholder="Enter your Emergency phone no" name="EMERGENCY_PHONE_NO" value={AddData.EMERGENCY_PHONE_NO}  onChange={(e)=>handleInputChangeAddress(e)} />
              </CFormGroup>
            
              </div>
              <CFormGroup  style={{float:'right'}} > 
                <CButton type="submit" size="sm" color="primary"onClick={(e)=>Saveemp(2)}><CIcon name="cil-scrubber" /> Submit</CButton>
                 <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
              </CFormGroup>
            
                 </CCardBody>
          </CCollapse>
         
            
          
        </CCard>

        
     

        
      </CCol>
      <CCol xl="12">
        <CCard>
          <CCardHeader>
          <CLink
              color="primary"
              onClick={toggle2}
              className={'mb-1'}
            >Employee Education</CLink>
            <DocsLink name="CCollapse"/>
          </CCardHeader>
          <CCollapse show={collapse2}>
            <CCardBody>
               
               <div className="row">
              <CFormGroup className="col-xs-12 col-md-4">
                <CLabel htmlFor="edu">Education level</CLabel>
                <CInput id="edu" placeholder="Enter your Education" name="EDUCATION_LEVEL" value={EduData.EDUCATION_LEVEL}  onChange={(e)=>handleInputChange(e,3)} />
              </CFormGroup>
              <CFormGroup className="col-xs-12 col-md-4">
                <CLabel htmlFor="iname">Institution Name</CLabel>
                <CInput id="iname" placeholder="Enter your institution name" type="email" name="INSTITUTION_NAME" value={EduData.INSTITUTION_NAME} onChange={(e)=>handleInputChange(e,3)}  />
              </CFormGroup>
              <CFormGroup className="col-xs-12 col-md-4">
                <CLabel htmlFor="course">Course</CLabel>
                <CInput id="course" placeholder="Enter your course" name="COURSE" value={EduData.COURSE} onChange={(e)=>handleInputChange(e,3)}  />
              </CFormGroup>
             </div>
               <CFormGroup  style={{float:'right'}} > 
                <CButton type="submit" size="sm" color="primary"onClick={(e)=>Saveemp(3)}><CIcon name="cil-scrubber" /> Submit</CButton>
                 <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
              </CFormGroup>
            
                 </CCardBody>
          </CCollapse>
          
        </CCard>

        
     

        
      </CCol>
      <CCol xl="12">
        <CCard>
          <CCardHeader>
          <CLink
              color="primary"
              onClick={toggle3}
              className={'mb-1'}
            >Employee certification</CLink>
            <DocsLink name="CCollapse"/>
          </CCardHeader>
          <CCollapse show={collapse3}>
            <CCardBody>
              
               <div className="row">
              <CFormGroup className="col-xs-12 col-md-4">
                <CLabel htmlFor="certi">Cettification Name</CLabel>
                <CInput id="certi" placeholder="Enter your Certification name" name="CERTIFICATION_NAME" value={CertificateData.CERTIFICATION_NAME}  onChange={(e)=>handleInputChange(e,4)} />
              </CFormGroup>
              <CFormGroup className="col-xs-12 col-md-4">
                <CLabel htmlFor="ccode">Course code</CLabel>
                <CInput id="ccode" placeholder="Enter your Coursecode"  name="COURSE_CODE" value={CertificateData.COURSE_CODE} onChange={(e)=>handleInputChange(e,4)}  />
              </CFormGroup>
              <CFormGroup className="col-xs-12 col-md-4">
                <CLabel htmlFor="coffered">Course offered by</CLabel>
                <CInput id="coffered" placeholder="Enter the course offered" name="COURSE_OFFERED_BY" value={CertificateData.COURSE_OFFERED_BY} onChange={(e)=>handleInputChange(e,4)}  />
              </CFormGroup>
             </div>
             <div className="row">
             <CFormGroup  className="col-xs-12 col-md-4">
                    <CLabel htmlFor="issuedate">Issued Date</CLabel>
                    <CInput type="date" id="issuedate" name="ISSUED_DATE" placeholder="date" value={CertificateData.ISSUED_DATE} onChange={(e)=>handleInputChange(e,4)} checked={CertificateData.ISSUED_DATE} />        
                </CFormGroup>
              
              </div>
                 <CFormGroup  style={{float:'right'}} > 
                <CButton type="submit" size="sm" color="primary"onClick={(e)=>Saveemp(4)}><CIcon name="cil-scrubber" /> Submit</CButton>
                 <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
              </CFormGroup>
            
                 </CCardBody>
          </CCollapse>
          
        </CCard>

        
     

        
      </CCol>
      <CCol xl="12">
        <CCard>
          <CCardHeader>
          <CLink
              color="primary"
              onClick={toggle4}
              className={'mb-1'}
            >Employee Contract</CLink>
            <DocsLink name="CCollapse"/>
          </CCardHeader>
          <CCollapse show={collapse4}>
            <CCardBody>
                <div className="row">
              <CFormGroup className="col-xs-12 col-md-4">
                <CLabel htmlFor="cname">Contract Name</CLabel>
                <CInput id="cname" placeholder="Enter your Contract name" name="CONTRACT_NAME" value={ContractData.CONTRACT_NAME}  onChange={(e)=>handleInputChange(e,5)} />
              </CFormGroup>
              <CFormGroup  className="col-xs-12 col-md-4">
                    <CLabel htmlFor="cstart">Contract start Date</CLabel>
                    <CInput type="date" id="cstart" name="CONTRACT_START" placeholder="date" value={ContractData.CONTRACT_START} onChange={(e)=>handleInputChange(e,5)} checked={ContractData.CONTRACT_START} />        
                </CFormGroup>
                <CFormGroup  className="col-xs-12 col-md-4">
                    <CLabel htmlFor="cend">Contract end Date</CLabel>
                    <CInput type="date" id="cend" name="CONTRACT_END" placeholder="date" value={ContractData.CONTRACT_END} onChange={(e)=>handleInputChange(e,5)} checked={ContractData.CONTRACT_END} />        
                </CFormGroup>
             </div>
             <div className="row">
             <CCol md="3">
                    <CLabel>Active</CLabel>
                  </CCol>
             <CFormGroup>
                    <CSwitch className={'mx-1'} variant={'3d'} name="StatusSwitch1" color={'primary'} checked={ContractData.StatusSwitch1} onChange={(e)=>ChangeSwitch1(e)} />
              </CFormGroup>
              </div>
               <CFormGroup  style={{float:'right'}} > 
                <CButton type="submit" size="sm" color="primary"onClick={(e)=>Saveemp(5)}><CIcon name="cil-scrubber" /> Submit</CButton>
                 <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
              </CFormGroup>
            
                 </CCardBody>
          </CCollapse>
        
        </CCard>

        
     

        
      </CCol>
      <CCol xl="12">
        <CCard>
          <CCardHeader>
          <CLink
              color="primary"
              onClick={toggle5}
              className={'mb-1'}
            >Employee Passport</CLink>
            <DocsLink name="CCollapse"/>
          </CCardHeader>
          <CCollapse show={collapse5}>
            <CCardBody>
                <div className="row">
              <CFormGroup className="col-xs-12 col-md-4">
                <CLabel htmlFor="pname">Passport No</CLabel>
                <CInput id="pname" placeholder="Enter your Passport No" name="PASSPORT_NO" value={PassData.PASSPORT_NO}  onChange={(e)=>handleInputChange(e,6)} />
              </CFormGroup>
              <CFormGroup  className="col-xs-12 col-md-4">
                    <CLabel htmlFor="pidata">passport issue Date</CLabel>
                    <CInput type="date" id="pidata" name="PASSPORT_ISSUE_DATE" placeholder="date" value={PassData.PASSPORT_ISSUE_DATE} onChange={(e)=>handleInputChange(e,6)} checked={[PassData].PASSPORT_ISSUE_DATE} />        
                </CFormGroup>
                <CFormGroup  className="col-xs-12 col-md-4">
                    <CLabel htmlFor="pedata">Passport Expiry Date</CLabel>
                    <CInput type="date" id="pedata" name="PASSPORT_EXPIRY_DATE" placeholder="date" value={PassData.PASSPORT_EXPIRY_DATE} onChange={(e)=>handleInputChange(e,6)} checked={PassData.PASSPORT_EXPIRY_DATE} />        
                </CFormGroup>
             </div>
             <div className="row">
             <CFormGroup className="col-xs-12 col-md-4">
                <CLabel htmlFor="dno">Driving Licence No</CLabel>
                <CInput id="dno" placeholder="Enter your driving licence no" name="DRIVING_LICENSE_NO" value={PassData.DRIVING_LICENSE_NO}  onChange={(e)=>handleInputChange(e,6)} />
              </CFormGroup>
              <CFormGroup className="col-xs-12 col-md-4">
                <CLabel htmlFor="ltype">Licence Type</CLabel>
                <CInput id="ltype" placeholder="Enter your licence type" name="LICENSE_TYPE" value={PassData.LICENSE_TYPE}  onChange={(e)=>handleInputChange(e,6)} />
              </CFormGroup>
              <CFormGroup  className="col-xs-12 col-md-4">
                    <CLabel htmlFor="lidata">Licence Issue Date</CLabel>
                    <CInput type="date" id="lidata" name="LICENSE_ISSUE_DATE" placeholder="date" value={PassData.LICENSE_ISSUE_DATE} onChange={(e)=>handleInputChange(e,6)} checked={PassData.LICENSE_ISSUE_DATE} />        
                </CFormGroup>
              </div>
              <div className="row">
              <CFormGroup  className="col-xs-12 col-md-4">
                    <CLabel htmlFor="ledata">Licence Expiry Date</CLabel>
                    <CInput type="date" id="ledata" name="LICENSE_EXPIRY_DATE" placeholder="date" value={PassData.LICENSE_EXPIRY_DATE} onChange={(e)=>handleInputChange(e,6)} checked={PassData.LICENSE_EXPIRY_DATE} />        
                </CFormGroup>
              <CFormGroup className="col-xs-12 col-md-4">
                <CLabel htmlFor="idno">ID no</CLabel>
                <CInput id="idno" placeholder="Enter your Id no" name="ID_NO" value={PassData.ID_NO}  onChange={(e)=>handleInputChange(e,6)} />
              </CFormGroup>
              <CFormGroup  className="col-xs-12 col-md-4">
                    <CLabel htmlFor="iddata">ID Issue Date</CLabel>
                    <CInput type="date" id="iddata" name="ID_ISSUE_DATE" placeholder="date" value={PassData.ID_ISSUE_DATE} onChange={(e)=>handleInputChange(e,6)} checked={PassData.ID_ISSUE_DATE} />        
                </CFormGroup>
              </div>
              <div className="row">
              <CFormGroup  className="col-xs-12 col-md-4">
                    <CLabel htmlFor="idedata">ID Expiry Date</CLabel>
                    <CInput type="date" id="idedata" name="ID_EXPIRY_DATE" placeholder="date" value={PassData.ID_EXPIRY_DATE} onChange={(e)=>handleInputChange(e,6)} checked={PassData.ID_EXPIRY_DATE} />        
                </CFormGroup>
                 <CFormGroup className="col-xs-12 col-md-4">
                <CLabel htmlFor="vno">Visa no</CLabel>
                <CInput id="vno" placeholder="Enter your Visa no" name="VISA_NO" value={PassData.VISA_NO}  onChange={(e)=>handleInputChange(e,6)} />
              </CFormGroup>
              <CFormGroup  className="col-xs-12 col-md-4">
                    <CLabel htmlFor="vdata">Visa Issue Date</CLabel>
                    <CInput type="date" id="vdata" name="VISA_ISSUE_DATE" placeholder="date" value={PassData.VISA_ISSUE_DATE} onChange={(e)=>handleInputChange(e,6)} checked={PassData.VISA_ISSUE_DATE} />        
                </CFormGroup>
              </div>
              <div className="row">
              <CFormGroup  className="col-xs-12 col-md-4">
                    <CLabel htmlFor="vedata">Visa Expiry Date</CLabel>
                    <CInput type="date" id="vedata" name="VISA_EXPIRY_DATE" placeholder="date" value={PassData.VISA_EXPIRY_DATE} onChange={(e)=>handleInputChange(e,6)} checked={PassData.VISA_EXPIRY_DATE} />        
                </CFormGroup>
               </div>
               <div class="row">
               <CCol md="3">
                    <CLabel> Passport Expiry Reminder</CLabel>
                  </CCol>
               <CCol md="9">
                    <CFormGroup variant="custom-checkbox" inline value={PassData.PASSPORT_EXPIRY_REMINDER}  >
                      <CInputRadio custom id="per" name="PASSPORT_EXPIRY_REMINDER" value="Yes" onChange={(e)=>handleInputChange(e)} checked={PassData.PASSPORT_EXPIRY_REMINDER ="Yes"} />
                      <CLabel variant="custom-checkbox" htmlFor="per">Yes</CLabel>
                    </CFormGroup>
                    <CFormGroup variant="custom-checkbox" inline  value={PassData.PASSPORT_EXPIRY_REMINDER} >
                      <CInputRadio custom id="per1" name="PASSPORT_EXPIRY_REMINDER" value="No" onChange={(e)=>handleInputChange(e)} checked={PassData.PASSPORT_EXPIRY_REMINDER ="No"}  />
                      <CLabel variant="custom-checkbox" htmlFor="per1">No</CLabel>
                    </CFormGroup>
                    
              </CCol>
             
               </div>
               <div class="row">
               <CCol md="3">
                    <CLabel> ID Expiry Reminder</CLabel>
                  </CCol>
               <CCol md="9">
                    <CFormGroup variant="custom-checkbox" inline value={PassData.ID_EXPIRY_REMINDER}  >
                      <CInputRadio custom id="ier" name="ID_EXPIRY_REMINDER" value="Yes" onChange={(e)=>handleInputChange(e)} checked={PassData.ID_EXPIRY_REMINDER ="Yes"} />
                      <CLabel variant="custom-checkbox" htmlFor="ier">Yes</CLabel>
                    </CFormGroup>
                    <CFormGroup variant="custom-checkbox" inline  value={PassData.ID_EXPIRY_REMINDER} >
                      <CInputRadio custom id="ier1" name="ID_EXPIRY_REMINDER" value="No" onChange={(e)=>handleInputChange(e)} checked={PassData.ID_EXPIRY_REMINDER ="No"}  />
                      <CLabel variant="custom-checkbox" htmlFor="ier1">No</CLabel>
                    </CFormGroup>
                    
              </CCol>
             
               </div>
              
               <div class="row">
               <CCol md="3">
                    <CLabel> Visa Expiry Reminder</CLabel>
                  </CCol>
               <CCol md="9">
                    <CFormGroup variant="custom-checkbox" inline value={PassData.VISA_EXPIRY_REMINDER}  >
                      <CInputRadio custom id="ver" name="VISA_EXPIRY_REMINDER" value="Yes" onChange={(e)=>handleInputChange(e)} checked={PassData.VISA_EXPIRY_REMINDER ="Yes"} />
                      <CLabel variant="custom-checkbox" htmlFor="ver">Yes</CLabel>
                    </CFormGroup>
                    <CFormGroup variant="custom-checkbox" inline  value={PassData.VISA_EXPIRY_REMINDER} >
                      <CInputRadio custom id="ver1" name="VISA_EXPIRY_REMINDER" value="No" onChange={(e)=>handleInputChange(e)} checked={PassData.VISA_EXPIRY_REMINDER ="No"}  />
                      <CLabel variant="custom-checkbox" htmlFor="ver1">No</CLabel>
                    </CFormGroup>
                    
              </CCol>
             
               </div>
              
             
               <CFormGroup  style={{float:'right'}} > 
                <CButton type="submit" size="sm" color="primary"onClick={(e)=>Saveemp(6)}><CIcon name="cil-scrubber" /> Submit</CButton>
                 <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
              </CFormGroup>
            
                 </CCardBody>
          </CCollapse>
        
        </CCard>

        
     

        
      </CCol>
   
    </CRow>
   

    
  )
}

export default Create
