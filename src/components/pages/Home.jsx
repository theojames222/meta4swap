import Hero from "../layout/Hero";
import Content from "../layout/Content";
import FeaturedProduct from "../layout/FeaturedProduct";
import FeaturedService from "../layout/FeaturedService";
import Explore from "../layout/Explore";

function Home() {
  return (
    <>
      <Hero />
      {/* <Explore /> */}
      <FeaturedProduct />
      <FeaturedService />
      <Content />
    </>
  );
}

export default Home;
