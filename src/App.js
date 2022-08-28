import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./components/pages/Home";
import Create from "./components/pages/Create";
import Shop from "./components/pages/Shop";
import Product from "./components/pages/Product";
import Order from "./components/pages/Order";
import { useState, useEffect } from "react";
import UserPage from "./components/pages/UserPage";
import Transactions from "./components/pages/Transactions";
import Web3 from "web3/dist/web3.min.js";
import m4sAbi from "./abi/m4s_abi.json";
import CategoryTask from "./components/pages/CategoryTask";
import CategoryService from "./components/pages/CategoryService";
import CreateForm from "./components/layout/CreateForm";
import ServicePage from "./components/pages/ServicePage";
import NavbarTest from "./components/layout/NavbarTest";
import NewTransactions from "./components/pages/NewTransactions";
import OrderV2 from "./components/pages/OrderV2";

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
      "https://goerli.infura.io/v3/18c3956af9734c289bfed9eee03ee1a7"
    )
  );
  const M4SContract = new web3.eth.Contract(
    m4sAbi,
    "0xC06130dB84fe3840c4CdB207EDd4b4e800aA957d"
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
      <div className="flex flex-col ">
        {/* <div className="flex flex-col bg-primary-content"> */}
        <NavbarTest connected={connected} userAddress={userAddress} />
        {/* <Navbar connected={connected} userAddress={userAddress} /> */}
        <main className="mt-24">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/create"
              element={
                <CreateForm connected={connected} userAddress={userAddress} />
              }
            />
            <Route path="/services" element={<CategoryService />} />
            <Route path="/tasks" element={<CategoryTask />} />

            <Route
              path="/:type/:listingId"
              // path="/category/:categoryName/:listingId"
              element={<ServicePage userAddress={userAddress} />}
            />
            <Route
              path="/listings/account/:userId"
              element={<UserPage userAddress={userAddress} />}
            />
            <Route
              path="/account/:userId"
              element={<NewTransactions userAddress={userAddress} />}
            />
            <Route
              path="/order/:type/:orderId"
              // path="/order"
              element={<OrderV2 userAddress={userAddress} />}
            />
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
