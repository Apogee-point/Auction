import SearchIcon from '@mui/icons-material/Search';
import { AppBar, Toolbar, IconButton, InputBase, ListItemText } from '@mui/material';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useState ,useEffect} from 'react';
import { Drawer, List, ListItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';


export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [onLoggedIn, setOnLoggedIn] = useState("");
  const [search,setSearch] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
		const token = localStorage.getItem("token");
		setOnLoggedIn(token ? true:false);
	}, [onLoggedIn]);
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleSearch = async (e) => {
    const itemName = e.target.value;
    const response = await fetch(`http://localhost:3000/searchItems?name=${encodeURIComponent(itemName)}`,{
                              method:'POST',
                              headers:{"authorization":localStorage.getItem("token")}});
    const data = await response.json();
    setSearch(itemName)
    console.log(data)
  }

  const handleSearchClick = async () =>{
    const itemName = search;
    const response = await fetch(`http://localhost:3000/searchItems?name=${encodeURIComponent(itemName)}`,{
      method:'POST',
      headers:{"authorization":localStorage.getItem("token")}
    });
    const data = await response.json();
    console.log(data)
    if (data != null){
      navigate(`/items/${data._id}`)
    }
    else{
      alert('The item doesnot exist')
    }
  }

  const drawer = (
    <div>
      <List>
        {['Home', 'About', 'Sign Up'].map((text) => (
          <ListItem button key={text} component={Link} to={`/${text.toLowerCase()}`}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const logoutUser = () => {
    localStorage.removeItem("token");
    setOnLoggedIn(false);
  }

  return (
    <div style={{ flexGrow: 1 }}>
      <AppBar position="fixed" style={{ width: '100%',background:'#424242' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
          <Button color="inherit" component={Link} to="/" style={{ marginRight: '16px' }}>
            Home
          </Button>
          <Button color="inherit" component={Link} to="/about" style={{ marginRight: '16px' }}>
            About
          </Button>
          <Button color="inherit" component={Link} to="/contact" style={{ marginRight: '16px' }}>
            contact
          </Button>
          {!onLoggedIn && (
            <Button color="inherit" component={Link} to="/signup" style={{ marginRight: '16px' }}>
              Sign Up
            </Button>
          )}
          {!onLoggedIn && (
            <Button color="inherit" component={Link} to="/login" style={{ marginRight: '16px' }}>
              Login
            </Button>
          )}
          {onLoggedIn && (
            <>
            <Button color='inherit' component={Link} to="/" style={{marginRight:'16px'}} onClick={logoutUser}>Logout</Button>
            <Button color="inherit" component={Link} to="/profile" style={{ marginRight: '16px' }}>
              Profile</Button>
            <Button color='inherit' component={Link} to="/additem" style={{marginRight:'16px'}}>Add Item</Button>
            </>
            )}
          <div style={{ position: 'relative', borderRadius: '4px', backgroundColor: '#ffffff24', marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
            <div style={{ padding: '0 16px', position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <SearchIcon />
            </div>
            <div style={{ position: 'relative', borderRadius: '4px', backgroundColor: '#ffffff24', marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
            <div style={{ padding: '0 16px', position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <SearchIcon />
            </div>
            <Button sx={{backgroundColor:'lightgrey',font:'menu','&:hover':{backgroundColor:'lightgrey'}}} onClick={handleSearchClick}>Search</Button>
            <label>
              <InputBase
                placeholder="Search…"
                style={{ color: 'inherit', paddingLeft: '40px', width: '100%' }}
                inputProps={{ 'aria-label': 'search' }}
                onChange={(e) => handleSearch(e)}
              />
            </label>
          </div>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
        {drawer}
      </Drawer>
    </div>
  );
}