import { useState } from "react";
import { list, list2 } from "../../assets/cards-list";
import Cards from "../Cards";
import Filter from "../Filter";
import Header from "../Header";

const Home = () => {
    const [selectedFilter, setSelectedFilter] = useState(0);

	return (
		<section>
			<div className="container">
            {/* <Header/> */}
                <Filter
                    selectedFilter={selectedFilter}
                    setSelectedFilter={setSelectedFilter}
                />
        {selectedFilter === 0 ? <Cards list={list} /> : <Cards list={list2} />}

			</div>
		</section>
	)
}

export default Home;