import '../App.css';
function Banner() {
  return (
    <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">

    <div className="carousel-item active">
          <img 
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShZlfWUaYo_-GznDVJ4b6XV19EHeEzHW3XfQ&s "
            className="d-block w-100 banner-img"
            alt="slide1"
          />
        </div>
        <div className="carousel-item">
          <img 
            src="https://images.unsplash.com/photo-1491553895911-0055eca6402d"
            className="d-block w-100 banner-img"
            alt="slide2"
          />
        </div>

        <div className="carousel-item">
          <img 
            src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
            className="d-block w-100 banner-img"
            alt="slide3"
          />
        </div>

      </div>
    </div>
  );
}
export default Banner;