import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./components/Home/Home";
import UserLogin from "./components/Auth/UserLogin";
import UserSignup from "./components/Auth/UserSignup";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header";

export default function App() {
  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route path='/Home' element={<Home />} />
    //     <Route path='/UserLogin' element={<UserLogin />} />
    //     <Route path='/UserSignup' element={<UserSignup />} />
    //   </Routes>
    //   <Footer />
    // </BrowserRouter>
    <Home></Home>

  );
}
