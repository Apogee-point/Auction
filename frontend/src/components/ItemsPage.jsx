import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import {useState, useEffect} from 'react';

const ItemsPage = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch('http://localhost:3000/items',{method: 'GET', 
      headers: {'Content-Type': 'application/json',"authorization": localStorage.getItem("token"),},
      
    });
      const data = await response.json();
      // console.log(data)
      setItems(data.items);
    };
    fetchItems();
  }, []);

  const handleCardClick = (item) => {
    console.log(item);
  };

  return (
    <div style={{ flexGrow: 1, padding: '20px',marginTop:'100px',overflow:'auto' }}>
      <Typography variant='h4' style={{ marginBottom: '20px',color:'black',textAlign:'center' }}>Live Items for Auction</Typography>
      <Grid container spacing={3}>
        {items.map(item => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
          <Link to={`/items/${item._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
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
      </Grid>
    </div>
  );
};

export default ItemsPage;