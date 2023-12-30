// 
import React, { useState } from "react";
import Header from "./components/Header";
import Filter from "./components/Filter";
import Cards from "./components/Cards";
import { list, list2 } from "./assets/cards-list";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLogin from "./components/Auth/UserLogin";
import UserSignup from "./components/Auth/UserSignup";
import Footer from "./components/Footer/Footer";

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
           <Route path='/UserSignup' element={<UserSignup />} />
         </Routes>
         <Footer/>
     </BrowserRouter>
    </div>
  );
}
