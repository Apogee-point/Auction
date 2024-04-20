import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar'
import HomePage from './components/HomePage'
import LoginPage from './components/LoginPage'
import SignupPage from './components/SignupPage'
import ItemsPage from './components/ItemsPage';
import ItemDetails from './components/ItemDetails';
import UserPage from './components/UserPage';
import ContactPage from "./components/ContactPage";
import AddItem from "./components/AddItem";
import './App.css';
import ProfilePage from "./components/ProfilePage";
import UpdateItemPage from "./components/UpdateItemPage"


const App = () => {

  // const firebaseConfig = {
  //   apiKey: "AIzaSyDCuERAOIdoprb-tGaoaF4gBGsvvI9T9DA",
  //   authDomain: "auction-ac6ca.firebaseapp.com",
  //   projectId: "auction-ac6ca",
  //   storageBucket: "auction-ac6ca.appspot.com",
  //   messagingSenderId: "119876906482",
  //   appId: "1:119876906482:web:8bb5027344d50c0c47cf6b",
  //   measurementId: "G-J2QE686B86"
  // };
 
  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/items" element={<ItemsPage />} />
        <Route path="/items/:id" element={<ItemDetails />} />
        <Route path="/orders/:pid" element={<UserPage />} />
        <Route path="/additem" element={<AddItem />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/updateItem/:id" element={<UpdateItemPage/>}/>
        <Route path="*" element={<div>404 Page Not Found</div>} />
    </Routes>
  </BrowserRouter>
  )
}

export default App
