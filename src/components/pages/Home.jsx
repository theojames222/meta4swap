import Content from "../layout/Content";
// import FeaturedProduct from "../layout/FeaturedProduct";
// import FeaturedService from "../layout/FeaturedService";
import LatestServices from "../layout/LatestServices";
import LatestTasks from "../layout/LatestTasks";
import NewHero from "../layout/NewHero";

function Home() {
  return (
    <>
      <NewHero />
      <LatestServices />
      <LatestTasks />
      <Content />
    </>
  );
}

export default Home;
