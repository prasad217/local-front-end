import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Slider.css'; // Ensure this is the correct path to your CSS file

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1, // Ensure this is set to 1 to show one slide at a time full width
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
};


const slideImages = [
  "https://img.freepik.com/free-vector/coming-soon-background_79603-1561.jpg",
  "https://www.richersounds.com/media/cms-content-images/promo_pages/offers/offers_page_header_m.jpg",
  "https://as2.ftcdn.net/v2/jpg/05/03/94/05/1000_F_503940511_lcbeHGEUTk9GWEMDSPoj0XqhmSbnhN5T.jpg",
];

function MySlider() {
  return (
    <Slider {...sliderSettings}>
      {slideImages.map((image, index) => (
        <div key={index}>
          <img src={image} alt={`Slide ${index + 1}`} className="sliderImage" />
        </div>
      ))}
    </Slider>
  );
}

export default MySlider;
