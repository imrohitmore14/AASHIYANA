// 
import React, { useState } from "react";
import Header from "./components/Header";
import Filter from "./components/Filter";
import Cards from "./components/Cards";
import { list, list2 } from "./assets/cards-list";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLogin from "./components/Auth/UserLogin";
import Footer from "./components/Footer/Footer";
import UserRegister from "./components/Auth/UserRegister";
import HotelLogin from "./components/Auth/HotelLogin";
import HotelRegister from "./components/Auth/HotelRegister";

export default function App() {
  const [selectedFilter, setSelectedFilter] = useState(0);

  return (
    <div className="Home">
      <h1>Aashiyana</h1>
      <Header/>
      <Filter
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />
      {selectedFilter === 0 ? <Cards list={list} /> : <Cards list={list2} />}
      <BrowserRouter>
         <Routes>
           <Route path='/UserLogin' element={<UserLogin />} />
           <Route path='/UserRegister' element={<UserRegister />} />
           <Route path='/HotelRegister' element={<HotelRegister />} />
           <Route path='/HotelLogin' element={<HotelLogin/>}/>
         </Routes>
         <Footer/>
     </BrowserRouter>
    </div>
  );
}
