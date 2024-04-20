import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Link, redirect } from 'react-router-dom'

const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address,setAddress]=useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const res= await fetch("http://localhost:3000/signup",{
      method:"POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        email:email,
        password:password,
        name:username,
        address:address, 

      })
    })
    const response= await res.json();
    console.log(response);
    alert(response.msg);
    redirect('/')
    
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Container maxWidth="sm" >
      <Box mt={4}>
        <Typography variant="h4" align="center">
          Sign Up
        </Typography>
        <form style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '16px',
        }} onSubmit={handleSubmit}>
          <TextField
            style={{ marginBottom: '16px',width:"100%" ,color:'white'}}
            label="Username"
            variant="filled"
            value={username}
            onChange={handleUsernameChange}
          />
          <TextField
            style={{ marginBottom: '16px',width:"100%" }}
            label="Email"
            variant="filled"
            type="email"
            value={email}
            onChange={handleEmailChange}
          />
          <TextField
            style={{ marginBottom: '16px',width:"100%" }}
            label="Password"
            variant="filled"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <TextField
            style={{ marginBottom: '16px' , width:"100%" }}
            label="Adress"
            variant="filled"
            type="text"
            value={address}
            onChange={handleAddressChange}
          />
          <Button
            style={{ marginTop: '16px' }}
            variant="contained"
            color="primary"
            type="submit"
          >
            Sign Up
          </Button>
        </form>
        <Link to={"/login"}><p className="signup-anchor">Log in</p></Link>
      </Box>
    </Container>
    </div>
    
  );
};

export default SignUpPage;