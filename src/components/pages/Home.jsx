import Hero from "../layout/Hero";
import Content from "../layout/Content";
import FeaturedProduct from "../layout/FeaturedProduct";
import FeaturedService from "../layout/FeaturedService";
// import { useState, useEffect } from "react";
// // import Explore from "../layout/Explore";
// const Moralis = require("moralis");
function Home() {
  // const [listings, setListings] = useState(null);
  // const [loading, setLoading] = useState(true);

  // let productsData = [];
  // const params = useParams();
  // useEffect(() => {
  //   const getProducts = async () => {
  //     try {
  //       const serverUrl = "https://gu15uqsbipep.usemoralis.com:2053/server";
  //       const appId = "F28xSksEmA0YDFTQskgodpG3W5JSZK0uBm9Abnde";
  //       const masterKey = "G5799rbYbzVEjmd9B2tFNfgX184JryV3ntW283dy";
  //       await Moralis.start({ serverUrl, appId, masterKey });
  //       const Item = Moralis.Object.extend("ItemCreated");
  //       const query = new Moralis.Query(Item);
  //       query.equalTo("productType", "0");
  //       const results = await query.find();
  //       console.log(results);
  //       results.forEach(async (result) => {
  //         const metadata = result.get("metadata");
  //         const itemId = result.get("itemId");
  //         const ipfsURL = metadata;
  //         const response = await fetch(ipfsURL);
  //         const data = await response.json();
  //         console.log(data);
  //         return productsData.push({ id: itemId, data: data });
  //       });
  //       console.log(productsData);
  //       setListings(productsData);
  //       setLoading(false);
  //     } catch (error) {
  //       console.log("error");
  //     }
  //   };

  //   getProducts();
  // }, []);
  // console.log(listings);
  // useEffect(() => {
  //   const fetchEthPrice = async () => {
  //     const provider = new ethers.providers.JsonRpcProvider(
  //       "https://rinkeby.infura.io/v3/18c3956af9734c289bfed9eee03ee1a7"
  //     );
  //     const addr = "0x8a037283fb181ee1bCEeCF1734E136C677fC2311";
  //     const priceFeed = new ethers.Contract(addr, m4sAbi, provider);
  //     // We get the data from the last round of the contract
  //     const chainLinkPrice = await priceFeed.getLatestPrice();
  //     const ethPrice = ethers.utils.formatEther(chainLinkPrice) * 10 ** 18;
  //     console.log(ethPrice);
  //     window.ethPrice = ethPrice;
  //     console.log(window.ethPrice);
  //   };

  //   fetchEthPrice();
  // }, []);
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
