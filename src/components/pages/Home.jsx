import Hero from "../layout/Hero";
import Content from "../layout/Content";
// import FeaturedProduct from "../layout/FeaturedProduct";
import FeaturedService from "../layout/FeaturedService";
import LatestServices from "../layout/LatestServices";

function Home() {
  return (
    <>
      <Hero />
      <LatestServices />
      <FeaturedService />
      <Content />
    </>
  );
}

export default Home;
