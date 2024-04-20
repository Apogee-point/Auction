import { Button } from '@mui/material';
import { Typography } from '@mui/material';
import { AccessAlarm, ThreeDRotation } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useState, useEffect } from 'react';

const HomePage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#2b4243',
      }}>
        <CircularProgress />
      </div>
    );
  }
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: '100vh',
      width:'100vw',
      backgroundColor: '#2b4243',
      color: '#fff',
      overflow: 'hidden',
      fontFamily: 'Courier New, Courier, monospace',
    }}>
      <CssBaseline />
      <Typography variant="h2" style={{ marginBottom: '16px',marginTop:'100px' }}>
        Welcome to our Auction Website!
      </Typography>
      <Typography variant="h5" style={{ marginBottom: '32px' }}>
        Here you can buy and sell items with ease.
      </Typography>

        <Button
          variant="contained"
          color="secondary"
          startIcon={<AccessAlarm />}
          style={{ margin: '8px' }}
        >
          <Link to={"/"} style={{ textDecoration: 'none', color: 'inherit' }}>Go to Home</Link>
        </Button>
        <Button
          variant="contained"
          color="primary"
          startIcon={<ThreeDRotation />}
          style={{ margin: '8px' }}
        >
          <Link to={"/items"} style={{ textDecoration: 'none', color: 'inherit' }}>View Listings</Link>
        </Button>
      </div>
  );
}

export default HomePage;