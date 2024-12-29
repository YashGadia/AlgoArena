import React from 'react';
import TextField from '@material-ui/core/TextField';
import LoginPageImage from '../../images/websiteImages/LoginPageImage.png';
import './LoginPage.css';

const LoginPage = () => {
  return (
      <div className="loginContainer">
        <div className="leftimage">
          <img src={LoginPageImage} alt='Login Page' style={{ objectFit: 'contain' }} />
        </div>
        <div className="rightForm">
          <div className="rightForm_Title">
            Login
          </div>
          <div className="rightForm_Textfield">
            <TextField id="outlined-basic" label="Email" size="small" variant="outlined" style={{ width: 350 }} />
            <TextField id="outlined-basic" label="Pasword" size="small" variant="outlined" style={{ width: 350 }} />
          </div>
        </div>
      </div>
  )
}

export default LoginPage;