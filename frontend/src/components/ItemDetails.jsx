import {  useEffect ,useState} from "react";
import { useParams } from "react-router-dom";
import {initializeApp} from "firebase/app";
import { getDatabase, ref, onValue, push } from "firebase/database";
import { Box, Typography, TextField, Button } from '@mui/material';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { Card, CardContent } from '@mui/material';
import {Carousel} from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './style.css';

//! web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDCuERAOIdoprb-tGaoaF4gBGsvvI9T9DA",
    authDomain: "auction-ac6ca.firebaseapp.com",
    projectId: "auction-ac6ca",
    storageBucket: "auction-ac6ca.appspot.com",
    messagingSenderId: "119876906482",
    appId: "1:119876906482:web:8bb5027344d50c0c47cf6b",
    measurementId: "G-J2QE686B86"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const ItemDetails =() =>{
    
    const [item,setItem]=useState({});
    const [timeLeft, setTimeLeft] = useState();
    const [biddings, setBiddings] = useState({});
    const [currentPrice, setCurrentPrice] = useState();
    const [currentBidding, setCurrentBiddingPrice] = useState(); //From the input
    const [currentHighestBidder, setcurrentHighestBidder] = useState();
    const [highestBidding,setHighestBidding] = useState({});
    const [fetchCompleted, setFetchCompleted] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [user,setUser] = useState({})
    
    const id = useParams().id;
    const [images,setImages] = useState([])
    const [isLive,setIsLive] = useState(false)

    useEffect(()=>{
      const getUser = async ()=>{
        const response = await fetch('http://localhost:3000/me', {
        method: 'GET',
        headers: {
          'authorization': localStorage.getItem('token'),
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      setUser(data.user)
      }
      getUser()
    },[])

    //! Use effect to fetch the biddings for the item with the given id from the firebase
    useEffect(() => {
      const dbRef = ref(db, 'biddings/' + id);
      onValue(dbRef, (snapshot) => {
        const data = snapshot.val();
        if (!data) return;
        setBiddings(data);
        const highestBid = Object.values(data).reduce((max, bid) => bid.amount > max.amount ? bid : max, { amount: currentPrice });
        setHighestBidding(highestBid)
      });
    }, [id, currentPrice]);

    //! Use effect to fetch the item with the given id from the backend
    useEffect(()=>{
      const fetchItem = async () => {
          const response = await fetch(`http://localhost:3000/items/${id}`,{method: 'GET', headers: {"authorization": localStorage.getItem("token"),'Content-Type': 'application/json'}});
          const data = await response.json();
          setItem(data.item);
          setTimeLeft(new Date(data.item.auctionEndTime).getTime() - new Date().getTime());
          setCurrentPrice(data.item.currentPrice)
          setImages(data.item.images)
      };
        fetchItem();
    },[id])

    useEffect(()=>{
      const timer = setInterval(()=>{
        if(new Date() >= new Date(item.auctionStartTime) && new Date() <= new Date(item.auctionEndTime)){
          setIsLive(true)
        }
      },1000);
      return () => clearInterval(timer);
    },[item])

    //! Function to format the time left
    const formatTimeLeft = (milliseconds) => {
        let seconds = Math.floor(milliseconds / 1000);
        const days = Math.floor(seconds / (24 * 60 * 60));
        seconds %= (24 * 60 * 60);
        const hours = Math.floor(seconds / (60 * 60));
        seconds %= (60 * 60);
        const minutes = Math.floor(seconds / 60);
        seconds %= 60;
        return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
    }   

    //! Function to place a bid
    const placeBid = (user, amount) => {
        const dbRef = ref(db, 'biddings/' + id);
        push(dbRef, {
          amount: amount,
          timestamp: new Date().getTime(),
          userId: user._id,
          username: user.name
        });
        // setCurrentPrice(amount);
        setcurrentHighestBidder(user._id);
    };
    //! Function to handle the click of the place bid button
    const handleClick = async () => {
      console.log(user._id)
      console.log(item.seller)
      if (!currentBidding) {
        alert('Please enter a bid.');
        return;
      }
      if (timeLeft <= 0) {
        alert('The auction has ended.');
        return;
      }

      if(user._id ==item.seller){
        alert('You cannot bid on your own item.');
        return;
      }

      if(user._id == currentHighestBidder){
        alert('You are already the highest bidder.');
        return;
      }
      
      if (currentBidding > currentPrice) {
          placeBid(user, currentBidding);
      } else {
        alert('Your bid must be higher than the current highest bid.');
      }
  };
    //! Function to handle the change in the bid amount
    const handleBidChange = (event) => {
        setCurrentBiddingPrice(event.target.value)
    }

    //! Use effect to update the time left every second
    useEffect(() => {
        if (!timeLeft && !fetchCompleted && (user._id == currentHighestBidder || (!currentHighestBidder))) {
          fetch(`http://localhost:3000/items/${id}/timeout`, { 
            method: 'POST',
            headers: { 'authorization': localStorage.getItem('token'), 'Content-Type': 'application/json' } ,
            body:JSON.stringify({userId:currentHighestBidder})})
            .then(()=>{
              setIsLive(false);
              setTimeLeft(0);
              setFetchCompleted(true);
            })
            .catch(err=>console.log(err))
            return;
        }
      
        const intervalId = setInterval(() => {
          setTimeLeft(prevTime => prevTime - 1000);
        }, 1000);
      
        return () => clearInterval(intervalId);
    }, [currentHighestBidder,isLive, fetchCompleted, id, item.seller, timeLeft, user._id]);

    const name=item.name;
    const startPrice=item.startingPrice;
    if (!item) return <div>Loading...</div>;
    const bidLength = Object.keys(biddings).length;

    return (
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', minHeight: '100vh' }}>
            <Carousel className="my-carousel">
            {images.map((image, index) => (
              <div key={index}>
              <img src={`http://localhost:3000/uploads/${image}`} alt={item.name} className="my-carousel-image" />
              </div>
            ))}
            </Carousel>
            <Box sx={{ 
            maxWidth: '400px', 
            margin: 'auto', 
            padding: '20px',
            paddingRight: '100px', 
            textAlign: 'left' 
            }}>
          <Typography variant="h4" align="center" sx={{
            marginBottom: '20px'
          }}>{name}</Typography>
          <Typography color="text.secondary" sx={{marginBottom: '10px'}}>Starting Price:<CurrencyRupeeIcon fontSize="sm" marginRight="6px"></CurrencyRupeeIcon> {startPrice}</Typography>
          <Typography color="text.secondary" sx={{marginBottom: '10px'}}>Auction Start Time:{new Date(item.auctionStartTime).toLocaleString()}</Typography>
          <Typography color="text.secondary" sx={{marginBottom: '10px'}}>Current Price:<CurrencyRupeeIcon fontSize="sm" marginRight="6px"></CurrencyRupeeIcon> {bidLength !=0 ? highestBidding.amount: startPrice}</Typography>
          <Typography color={timeLeft<=0 ? "error":"text.secondary"} sx={{marginBottom: '10px'}}>Highest Bidder: {bidLength !=0 ? highestBidding.username: "None"}</Typography>
          <Typography color={timeLeft<=0 ? "error":"text.secondary"} sx={{marginBottom: '10px'}}>Auction End Time: {new Date(item.auctionEndTime).toLocaleString()}</Typography>
            <Box>
              { isLive && <Typography variant="h6" color="error">Time Left: {formatTimeLeft(timeLeft)}</Typography>}
            </Box>
          <Typography variant="h5" color='CaptionText'>Highest bidding</Typography>
          {bidLength!=0 ? (
            <Card sx={{margin:'10px'}}>
                <CardContent>
                  <Typography >Bidder: {highestBidding.username}</Typography>
                  <Typography>Amount: <CurrencyRupeeIcon fontSize="sm" marginRight="6px"></CurrencyRupeeIcon>{highestBidding.amount}</Typography>
                  <Typography >Timestamp: {new Date(highestBidding.timestamp).toLocaleString()}</Typography>
                </CardContent>
            </Card>
          ) : <Typography variant="h3" sx={{margin:'10px'}}>No biddings yet.</Typography>}

          {isLive ?
          <>
          <Typography variant="h5" color='CaptionText'>Place your bid</Typography>
          <Typography>Enter your bid:</Typography>
          <CurrencyRupeeIcon ></CurrencyRupeeIcon>
          <TextField  type="number" onChange={handleBidChange}  sx={{ marginTop: '20px' }} />
          <Button variant="contained" color="secondary" onClick={handleClick} sx={{ marginTop: '20px',marginLeft:'30px' }}>Place Bid</Button>
          </>:(timeLeft<=0 && fetchCompleted ?
            <>
            <Typography variant="h3" sx={{margin:'10px'}}>Auction has ended.</Typography>
            </>:<Typography variant="h3" sx={{margin:'10px'}}>Auction has not started yet.</Typography>
          )
          
          }
    
          
        </Box>
        </div>
        
      );
}



export default ItemDetails;

// const placeBid = (user, amount) => {
//   const dbRef = ref(db, 'biddings/' + id + '/' + user._id);
//   set(dbRef, {
//     amount: amount,
//     timestamp: new Date().getTime(),
//   });
//   const biddingRef = ref(db, 'biddings/' + id);
//   update(biddingRef, {
//     highestBid: amount,
//     highestBidder: user._id
//   });
// };