import  { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Container, Grid } from '@mui/material';
// import Spinner from 'react-spinner-material';

function AddItem() {
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startingPrice, setStartingPrice] = useState('');
  const [auctionStartTime, setAuctionStartTime] = useState('');
  const [auctionEndTime, setAuctionEndTime] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');
  const submitForm = async (event) => {
    event.preventDefault();
    if(new Date() > new Date(auctionStartTime)){
      alert('Auction start time must be greater than the current time');
      return;
    }
    if (new Date(auctionEndTime) <= new Date(auctionStartTime)) {
      alert('End time must be greater than start time');
      return;
    }
    const formData = new FormData();
    file.forEach((f) => formData.append('images', f));
    formData.append('name', name);
    formData.append('description', description);
    formData.append('startingPrice', startingPrice);
    formData.append('auctionStartTime', auctionStartTime);
    formData.append('auctionEndTime', auctionEndTime);
    try {
      const response = await axios.post('http://localhost:3000/items/add',
      formData,{headers: {"authorization": localStorage.getItem("token"),'Content-Type': 'multipart/form-data'}});
      if (response.status === 200) {
        alert('Item added successfully');
        window.location.href = '/';
      } else {
        alert('Error adding item');
        console.log(response)
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileChange = (event) => {
    setUploadStatus('Uploading...');
    setFile([...event.target.files]);
    setUploadStatus('Uploaded');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Container maxWidth="sm">
      <form onSubmit={submitForm}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField fullWidth label="Name" value={name} onChange={(e) => setName(e.target.value)} required />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth multiline label="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth type="number" label="Starting Price" value={startingPrice} onChange={(e) => setStartingPrice(e.target.value)} required />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth type="datetime-local" label="Auction Start Time" InputLabelProps={{ shrink: true }} value={auctionStartTime} onChange={(e) => setAuctionStartTime(e.target.value)} required />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth type="datetime-local" label="Auction End Time" InputLabelProps={{ shrink: true }} value={auctionEndTime} onChange={(e) => setAuctionEndTime(e.target.value)} required />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" component="label">
              Upload Image
              <input type="file" name='images' multiple hidden onChange={handleFileChange} required />
            </Button>
            {uploadStatus && <p>{uploadStatus}</p>}
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">Add Item</Button>
          </Grid>
        </Grid>
      </form>
    </Container>
    </div>
    
  );
}

export default AddItem;