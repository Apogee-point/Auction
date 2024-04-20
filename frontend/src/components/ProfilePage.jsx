import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link, redirect } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { getMessaging, getToken} from 'firebase/messaging';

export default function ProfilePage(){
  const [userData, setUserData] = useState(null);
  //const [transactions, setTransactions] = useState(null);
  const [currentUserId, setCurrentUserId] = useState();
  const [items, setItems] = useState([]);

  // useEffect(() => {
  //   const messaging = getMessaging();
  //   const requestForToken = async () => {
  //     return getToken(messaging, {vapidKey: 'BFTmtoZCM54xFTelZpApGcQ9_hQYhViw2-nTxgIznoQKj68mwZNtWVzv65GKxEwDdr-W_zboLcOiYsm4eSxxSzA'})
  //     .then(async (token) => {
  //       console.log('FCM Token:', token);
  //       // You can now send the token to your server and update the UI if necessary
  //       const response = await axios.post('http://localhost:3000/users/fcm',{fcmToken:token},{headers: {"authorization": localStorage.getItem("token"),'Content-Type': 'multipart/form-data'}});
  //       if (response.status === 200) {
  //         console.log('FCM Token saved successfully');
  //       } else {
  //         console.log('Error saving FCM Token');
  //         console.log(response)
  //       }
  //     }
  //     )
  //     .catch((err) => {
  //       console.log('Unable to get permission to notify.', err);
  //     }
  //     );
  //   }
  //   requestForToken();
  // }, []);

  useEffect(()=>{
    const fetchUserData = async () => {
      const response = await fetch('http://localhost:3000/me',{method: 'GET', 
      headers: {'Content-Type': 'application/json',"authorization": localStorage.getItem("token"),},
      
    });
      const data = await response.json();
      setUserData(data.user);
      setCurrentUserId(data.user._id);
    }
    fetchUserData();
  })
  
  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch('http://localhost:3000/items',{method: 'GET', 
      headers: {'Content-Type': 'application/json',"authorization": localStorage.getItem("token"),},
      
    });
      const data = await response.json();
      const gotItems = data.items;
      const userItems = gotItems.filter(item => item.seller == currentUserId);
      setItems(userItems);
    };
    fetchItems();
  }, [currentUserId, items]);

  // useEffect(()=>{
  //   fetch(`http://localhost:3000/user/${currentUserId}/transactions`,{
  //     'authorization': localStorage.getItem('token'),
  //     'Content-Type': 'application/json',
  //   })
  //     .then(response => response.json())
  //     .then(data => setTransactions(data));
  // })

  const handleCardClick = (item) => {
    if(item.seller != currentUserId){
      alert('You are not the seller of this item');
      return;
    }
    if(item.auctionEndTime < new Date()){
      alert('The auction for this item has ended');
      return;
    }
    if(item.auctionStartTime > new Date()){
      alert('The auction for this item has not started yet');
      return;
    }
    redirect(`/updateItem/${item._id}`)
  }
  return (
    <div style={{ flexGrow: 1, padding: '20px',marginTop:'100px',overflow:'auto' }}>
      <Typography variant='h4' style={{ marginBottom: '20px',color:'black',textAlign:'center' }}>Your profile</Typography>
      <Typography variant='h6' style={{ marginBottom: '20px',color:'black',textAlign:'center' }}>Name: {userData?.name}</Typography>
      <Typography variant='h4' style={{ marginBottom: '20px',color:'black',textAlign:'center' }}>Your items</Typography>

      {items.length == 0 ? <Typography variant='h6' style={{ marginBottom: '20px',color:'black',textAlign:'center' }}>You have not added any items yet</Typography>
      :
      (<Grid container spacing={3}>
        {items.map(item => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
          <Link to={`/updateItem/${item._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Card style={{ maxWidth: 345 }} onClick={() => handleCardClick(item)}>
              <CardMedia
                style={{ height: 200 }}
                title={item.name}
                image={`http://localhost:3000/uploads/${item.images[0]}`}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="h2">
                  {item.name}
                </Typography>
                <Typography variant="body2" padding='0px' color="textSecondary" component="p">
                  {item.description}
                </Typography>
              </CardContent>
            </Card>
          </Link>
          </Grid>
        ))}
      </Grid>)}
    </div>
  );
}
