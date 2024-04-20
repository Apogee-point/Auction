
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';


const LoginPage=()=>{
  const [password, setPassword] = useState('');
  const [email,setEmail]=useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const res= await fetch("http://localhost:3000/login",{
      method:"POST",
      headers: { "Content-Type": "application/json" },
      body:JSON.stringify({
        email:email,
        password:password
      })
    })
    const response=await res.json();
    if(response.token!= null) localStorage.setItem("token",response.token)
    console.log(response.token);
    if(response.token!=null) window.location.href="/"
    else alert("Invalid Credentials")
    
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Container maxWidth="sm">
      <Box mt={4}>
        <Typography variant="h4" align="center">
          Login
        </Typography>
        <form style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '16px',
        }} onSubmit={handleSubmit}>
          <TextField
            style={{ marginBottom: '16px' ,color:"white"}}
            label="Email"
            variant="outlined"
            type="email"
            value={email}
            onChange={handleEmailChange}
          />
          <TextField
            style={{ marginBottom: '16px',color:"white" }}
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <Button
            style={{ marginTop: '16px' }}
            variant="contained"
            color="primary"
            type="submit"
          >
            Login
          </Button>
        </form>
      </Box>
    </Container>
    </div>
    
  );
}

export default LoginPage;
