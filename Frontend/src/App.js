import { useState } from "react";
import "./App.css";
import { list, list2 } from "./assets/cards-list";
import Cards from "./components/Cards";
import Filter from "./components/Filter";
import Header from "./components/Header";
// import { Route } from "@mui/icons-material";
import UserLogin from "./components/Auth/UserLogin";
import UserSignup from "./components/Auth/UserSignup";
import { BrowserRouter, Router,Routes,Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";




export default function App() {
  return (
      // <BrowserRouter>
      //   <Routes>
      //       <Route path='/' element={<Home></Home>}></Route>
      //       <Route path='/UserLogin' element={<UserLogin></UserLogin>}></Route>
      //       <Route path='/UserSignup' element={<UserSignup></UserSignup>}></Route>
      //   </Routes>
      //   <Footer></Footer>
      // </BrowserRouter>
      <Home></Home>
      );
}

 // 
