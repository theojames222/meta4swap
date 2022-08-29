import { ethers } from "ethers";
import m4sAbi from "../abi/m4s_abi.json";

export const useFetchEthPrice = async () => {
  const provider = new ethers.providers.JsonRpcProvider(
    "https://goerli.infura.io/v3/18c3956af9734c289bfed9eee03ee1a7"
  );
  const addr = "0xC774Cf50715DCF2d50b7333e1c216bEF67E7D4E4";
  const priceFeed = new ethers.Contract(addr, m4sAbi, provider);
  // We get the data from the last round of the contract
  const chainLinkPrice = await priceFeed.getLatestPrice();
  const ethPrice = ethers.utils.formatEther(chainLinkPrice) * 10 ** 18;
  console.log(ethPrice);
  window.ethPrice = ethPrice;
};
