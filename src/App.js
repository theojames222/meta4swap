import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./components/pages/Home";
import Create from "./components/pages/Create";
import Shop from "./components/pages/Shop";
import Product from "./components/pages/Product";
import Order from "./components/pages/Order";
import Category from "./components/pages/Category";
import { useState, useEffect } from "react";
import UserPage from "./components/pages/UserPage";
import Transactions from "./components/pages/Transactions";

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

function App() {
  const [userAddress, setUserAddress] = useState("");
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    checkIfWalletIsConnected(setUserAddress);
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
            <Route path="/category/:categoryName" element={<Category />} />
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
