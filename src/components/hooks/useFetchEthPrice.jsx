import { ethers } from "ethers";
import m4sAbi from "../abi/m4s_abi.json";

export const useFetchEthPrice = async () => {
  const provider = new ethers.providers.JsonRpcProvider(
    "https://goerli.infura.io/v3/18c3956af9734c289bfed9eee03ee1a7"
  );
  const addr = "0xC06130dB84fe3840c4CdB207EDd4b4e800aA957d";
  const priceFeed = new ethers.Contract(addr, m4sAbi, provider);
  // We get the data from the last round of the contract
  const chainLinkPrice = await priceFeed.getLatestPrice();
  const ethPrice = ethers.utils.formatEther(chainLinkPrice) * 10 ** 18;
  console.log(ethPrice);
  window.ethPrice = ethPrice;
};
