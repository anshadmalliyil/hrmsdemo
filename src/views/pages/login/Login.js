import React from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  // Redirect,
  Route
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {Redirect} from 'react-router-dom';
import baseURL from '../../common/CommonData'
const Login = () => {
  const history = useHistory()
  const LoginClick=()=>{
    // const { history } = this.props;
    fetch(baseURL+"api/home/login")
    .then(res => res.json())
      .then(response => {
        //this.history.pushState(null, '/base/dashboard');
         //return <Redirect to='../../dashboard'  />
        history.push('/dashboard');
        //setIsLoading(false);
      })
      .catch(error => console.log(error));
   }
  return (
    <div className="c-app c-default-layout flex-row align-items-center" style={{ 
      backgroundImage: `url("avatars/hrms.jpg")` 
    }}>
      <CContainer>
  
        <CRow className="justify-content-center">
          <CCol md="5">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <CRow>
                      <CCol xs="6">
                      <p className="text-muted">Signsss In to your account</p>
                      </CCol>
                      <CCol xs="6" className="text-right">
                      <Link to="/register">
                      <CButton color="link" className="px-0">Register Now!</CButton>
                      {/* <CButton color="primary" className="mt-3" active tabIndex={-1}>Register Now!</CButton> */}
                    </Link>
                      </CCol>
                    </CRow>
                    
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" placeholder="Username" autoComplete="username" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" placeholder="Password" autoComplete="current-password" />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        
                        <CButton color="primary" className="px-4" onClick={(e)=>LoginClick()}>Login</CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">Forgot password?</CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              {/* <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua.</p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>Register Now!</CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard> */}
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
