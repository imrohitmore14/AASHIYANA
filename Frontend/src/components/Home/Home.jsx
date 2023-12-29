import React, { useState } from "react";
import { Link } from "react-router-dom";
import { list, list2 } from "../../assets/cards-list";
import Header from "../Header";
import Filter from "../Filter";
import Cards from "../Cards";

export default function Home() {
  const [selectedFilter, setSelectedFilter] = useState(0);

  return (
    <div className="Home">
      <h1>Hello //////////</h1>
      <Header />
      <Filter
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />
      {selectedFilter === 0 ? <Cards list={list} /> : <Cards list={list2} />}
    </div>
  );
}
