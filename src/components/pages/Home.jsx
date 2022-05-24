import Hero from "../layout/Hero";
import Content from "../layout/Content";
import FeaturedProduct from "../layout/FeaturedProduct";
import FeaturedService from "../layout/FeaturedService";
import { ethers } from "ethers";
import m4sAbi from "../abi/m4s_abi.json";
import { useEffect } from "react";
// import Explore from "../layout/Explore";

function Home({ eth }) {
  useEffect(() => {
    const fetchEthPrice = async () => {
      const provider = new ethers.providers.JsonRpcProvider(
        "https://rinkeby.infura.io/v3/18c3956af9734c289bfed9eee03ee1a7"
      );
      const addr = "0x8a037283fb181ee1bCEeCF1734E136C677fC2311";
      const priceFeed = new ethers.Contract(addr, m4sAbi, provider);
      // We get the data from the last round of the contract
      const chainLinkPrice = await priceFeed.getLatestPrice();
      const ethPrice = ethers.utils.formatEther(chainLinkPrice) * 10 ** 18;
      console.log(ethPrice);
      window.ethPrice = ethPrice;
      console.log(window.ethPrice);
    };

    fetchEthPrice();
  }, []);
  return (
    <>
      <Hero />
      {/* <Explore /> */}
      <FeaturedProduct eth={eth} />
      <FeaturedService eth={eth} />
      <Content />
    </>
  );
}

export default Home;
