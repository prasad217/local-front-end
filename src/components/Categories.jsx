import React from 'react';
import { Link } from 'react-router-dom';
import './Categories.css';

function Categories() {
  return (
    <section className="categories">
      <div className="container">
        <div className="category">
          <Link to="/category/home-appliances">
            <img src="https://d13bbii8ozdt01.cloudfront.net/uploads/2022/11/Crompton-OTG-Amazon-A-Imgs-Bakers-Delight-970x600px-J5518-A4335.webp" alt="Home Appliances" />
            <h3>Home Appliances</h3>
          </Link>
        </div>

        <div className="category">
          <Link to="/category/electronics">
            <img src="https://static.toiimg.com/thumb/resizemode-4,width-1200,height-900,msid-84790472/84790472.jpg" alt="Electronics" />
            <h3>Electronics</h3>
          </Link>
        </div>

        <div className="category">
          <Link to="/category/laptops">
            <img src="https://www.91-cdn.com/hub/wp-content/uploads/2022/07/Top-laptop-brands-in-India-1200x675.jpg" alt="Laptops" />
            <h3>Laptops</h3>
          </Link>
        </div>

        <div className="category">
          <Link to="/category/mobiles">
            <img src="https://5.imimg.com/data5/SELLER/Default/2023/8/332325826/ID/FF/FK/115467798/all-brands-mobile-phones-500x500.jpg" alt="Mobiles" />
            <h3>Mobiles</h3>
          </Link>
        </div>

        <div className="category">
          <Link to="/category/fashion">
            <img src="https://www.shutterstock.com/image-photo/fashion-girl-guy-outlet-clothes-260nw-632357462.jpg" alt="Fashion" />
            <h3>Fashion</h3>
          </Link>
        </div>

        <div className="category">
          <Link to="/category/grocery">
            <img src="https://assets.aboutamazon.com/dims4/default/d573e3b/2147483647/strip/false/crop/1320x743+0+0/resize/1320x743!/quality/90/?url=https%3A%2F%2Famazon-blogs-brightspot.s3.amazonaws.com%2F92%2F06%2Fbb204a6842a49e7bdc66523a070c%2Fblog2.jpg" alt="Grocery" />
            <h3>Grocery</h3>
          </Link>
        </div>

        <div className="category">
          <Link to="/category/medicines">
            <img src="https://assets.telegraphindia.com/telegraph/2023/Aug/1691843964_drugs.jpg" alt="Medi Cart" />
            <h3>Medi Cart</h3>
          </Link>
        </div>

        <div className="category">
          <Link to="/category/toystore">
            <img src="https://i.pinimg.com/originals/f3/ef/37/f3ef37440f5018f3d3a13df3d35a9704.jpg" alt="Toy Store" />
            <h3>Toy Store</h3>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Categories;
