import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./components/pages/Home";
import Explore from "./components/layout/Explore";
import Create from "./components/pages/Create";
import Shop from "./components/pages/Shop";
import Product from "./components/pages/Product";
import Order from "./components/pages/Order";
import Category from "./components/pages/Category";
import { useState, useEffect } from "react";
import UserPage from "./components/pages/UserPage";
import Transactions from "./components/pages/Transactions";
import Web3 from "web3/dist/web3.min.js";
import m4sAbi from "./abi/m4s_abi.json";
import CategoryProducts from "./components/pages/CategoryProducts";
// async function connect(onConnected) {
//   if (!window.ethereum) {
//     alert("Get MetaMask!");
//     return;
//   }

//   const accounts = await window.ethereum.request({
//     method: "eth_requestAccounts",
//   });

//   onConnected(accounts[0]);
// }

async function checkIfWalletIsConnected(onConnected) {
  if (window.ethereum) {
    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });

    if (accounts.length > 0) {
      const account = accounts[0];
      onConnected(account);
      return;
    }
  }
}

const fetchEthPrice = async () => {
  const web3 = new Web3(
    new Web3.providers.HttpProvider(
      "https://rinkeby.infura.io/v3/18c3956af9734c289bfed9eee03ee1a7"
    )
  );
  const M4SContract = new web3.eth.Contract(
    m4sAbi,
    "0x0680A9396b1d54D1b2D393580E1B4BDB20f4D2F8"
  );

  const ethPrice = await M4SContract.methods.getLatestPrice().call();

  console.log(ethPrice);
  window.ethPrice = ethPrice;
};

function App() {
  const [userAddress, setUserAddress] = useState("");
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    checkIfWalletIsConnected(setUserAddress);
    fetchEthPrice();
  }, []);

  useEffect(() => {
    if (userAddress !== "") {
      setConnected(true);
    }
  }, [userAddress]);

  console.log(connected);
  return (
    <Router>
      <div className="flex flex-col">
        <Navbar connected={connected} userAddress={userAddress} />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/category/:categoryName"
              element={<CategoryProducts />}
            />
            <Route
              path="/create"
              element={
                <Create connected={connected} userAddress={userAddress} />
              }
            />
            <Route path="/shop" element={<Shop />} />
            <Route
              path="/category/:categoryName/:listingId"
              element={<Product userAddress={userAddress} />}
            />
            <Route path="/order" element={<Order />} />
            <Route path="/user/:userId" element={<UserPage />} />
            <Route
              path="/transactions/:userId"
              element={<Transactions userAddress={userAddress} />}
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
