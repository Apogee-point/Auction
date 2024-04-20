import  { useState ,useEffect} from 'react';
import axios from 'axios';
import { Button, TextField, Container, Grid } from '@mui/material';
import { useParams } from 'react-router-dom';


function AddItem() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startingPrice, setStartingPrice] = useState('');
  const [auctionStartTime, setAuctionStartTime] = useState('');
  const [auctionEndTime, setAuctionEndTime] = useState('');
  const id = useParams().id

  useEffect(()=>{
    const fetchItem = async () => {
        const response = await fetch(`http://localhost:3000/items/${id}`,{method: 'GET', headers: {"authorization": localStorage.getItem("token"),'Content-Type': 'application/json'}});
        const data = await response.json();
        const item = data.item;
        setName(item.name)
        setDescription(item.description)
        setAuctionStartTime(new Date(item.auctionStartTime).toISOString().slice(0, -5));
        setAuctionEndTime(new Date(item.auctionEndTime).toISOString().slice(0, -5));
        setStartingPrice(item.startingPrice)
    };
      fetchItem();
  },[id])

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/items/delete/${id}`, { method: 'DELETE',
      headers:{'authorization':localStorage.getItem('token')} });
      if (!response.ok) throw new Error('Network response was not ok');
      alert('Item deleted successfully');
    } catch (error) {
      console.error('Error:', error);
    }
  };

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
    formData.append('name', name);
    formData.append('description', description);
    formData.append('startingPrice', startingPrice);
    formData.append('auctionStartTime', auctionStartTime);
    formData.append('auctionEndTime', auctionEndTime);
    try {
      const response = await axios.put(`http://localhost:3000/items/update/${id}`,
      formData,{headers: {"authorization": localStorage.getItem("token"),'Content-Type': 'multipart/form-data'}});
      if (response.status === 200) {
        alert('Item updated successfully');
        window.location.href = '/items';
      } else {
        alert('Error updating item');
        console.log(response)
      }
    } catch (error) {
      console.error(error);
    }
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
            <Button variant="contained" color="primary" type="submit">Update Item</Button>
          </Grid>
          <Button variant="contained" color="primary" style={{'margin':'10px'}} onClick={handleDelete} type="submit">Delete Item</Button>
        </Grid>
      </form>
      <Grid item xs={12}>
            
      </Grid>
    </Container>
    </div>
    
  );
}

export default AddItem;