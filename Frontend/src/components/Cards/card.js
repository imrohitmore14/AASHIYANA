import React from "react";
import "./styles.css";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Card({ card }) {
  const navigate = useNavigate();

  const handleBookNow = () => {
    // Add logic for booking here
    navigate("/booking"); // Corrected path
    console.log(`Book Now clicked for ${card.title}`);
  };

  return (
    <div className="card-box">
      <Swiper
        slidesPerView={1}
        spaceBetween={15}
        loop={true}
        mousewheel={true}
        cssMode={true}
        pagination
        modules={[Pagination, Navigation]}
        className="swiper-container"
      >
        {card.imgSrc.map((src, i) => (
          <SwiperSlide key={i}>
            <img src={src} className="card-img" alt={`Slide ${i + 1}`} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="card-info-flex">
        <h3 className="card-title">{card.title}</h3>
        <div className="card-rating">
          <StarRateRoundedIcon />
          <p>{card.rating}</p>
        </div>
      </div>
      <p style={{ margin: 0, color: "var(--font-grey)" }}>{card.desc}</p>
      <p style={{ margin: 0, color: "var(--font-grey)" }}>{card.date}</p>
      <p style={{ margin: "0.2rem", fontSize: "1rem", color: "var(--black)" }}>
        <span style={{ fontWeight: "600" }}>₹{card.price}</span> per night
      </p>
      <Button className="btn btn-danger" onClick={handleBookNow}>
        Book Now
      </Button>
    </div>
  );
}

export default Card;
