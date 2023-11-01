import MySwiper from "@/components/sliderimg/page";

export default function Home() {

  return (
    <div className="bg">
      <div className="home-container">
      <h1 className="home-title">WELCOME, FIND YOUR RESTAURANT!</h1>
      <div className="Swiper-container"><MySwiper/></div>
      </div>
    </div>
  );
}