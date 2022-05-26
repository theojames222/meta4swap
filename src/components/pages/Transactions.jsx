import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where, limit } from "firebase/firestore";
import { db } from "../../firebase.config";
import TransactionItem from "../layout/TransactionItem";
import { ethers } from "ethers";
import m4sAbi from "../abi/m4s_abi.json";

function Transactions({ userAddress }) {
  const [transactions, setTransactions] = useState(null);
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        //Get reference
        const transactionsRef = collection(db, "transactions");

        //Create a query
        const q = query(transactionsRef, where("seller", "==", params.userId));

        //Execute query
        const querySnap = await getDocs(q);

        let transactions = [];
        querySnap.forEach((doc) => {
          console.log(doc.data());
          console.log(doc.id);
          return transactions.push({ id: doc.id, data: doc.data() });
        });
        setTransactions(transactions);
      } catch (error) {
        console.log("error");
      }
    };

    const fetchListings = async () => {
      try {
        const listingsRef = collection(db, "listings");

        const q = query(listingsRef);
        const querySnap = await getDocs(q);

        let listings = [];
        querySnap.forEach((doc) => {
          console.log(doc.data());
          console.log(doc.id);
          return listings.push({ id: doc.id, data: doc.data() });
        });
        setListings(listings);
        setLoading(false);
      } catch (error) {}
    };
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
    };
    fetchEthPrice();
    fetchTransactions();
    fetchListings();
  }, [params.userId]);

  return (
    <div className="category mb-10">
      {loading ? (
        <h1>Loading...</h1>
      ) : transactions &&
        transactions.length > 0 &&
        listings &&
        listings.length > 0 ? (
        <>
          <header className="infoHeader">
            <ul className=" mt-3 menu menu-horizontal  rounded-box items-">
              <li>
                <a href={`/user/${params.userId}`}>Listings</a>
              </li>
              <div className="divider divider-horizontal"></div>
              <li>
                <a href={`/transactions/${params.userId}`}>Transactions</a>
              </li>
            </ul>

            {/* <div>
              <Link to={`/user/${params.userId}`}>Listings</Link>
              <br />
              <Link to="/transactions">Transactions</Link>
            </div> */}
          </header>

          <h1 className="infoHeader2 text-2xl">Recent Transactions</h1>
          <div className="overflow-x-auto w-full">
            <thead className="table w-full">
              <tr>
                <th className="align-center">
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>

                <th>Item Id.</th>
                <th>Order No.</th>
                <th className="px-10">Price</th>
                <th className="px-7">Actions</th>
              </tr>
            </thead>
          </div>
          <div className="overflow-x-auto w-full">
            <table className="table w-full">
              <main>
                <ul>
                  {transactions.map((transaction) => (
                    <TransactionItem
                      transaction={transaction.data}
                      listings={listings}
                      id={transaction.id}
                      key={transaction.id}
                      ethPrice={window.ethPrice}
                    />
                  ))}
                </ul>
              </main>
              <div className="overflow-x-auto w-full">
                <thead className="table w-full">
                  <tr>
                    <th>
                      <label>
                        <input type="checkbox" className="checkbox" />
                      </label>
                    </th>
                    <th>Order No.</th>
                    <th>Item</th>
                    <th>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
              </div>
            </table>
          </div>
        </>
      ) : (
        <p>No listings available for {params.categoryName}</p>
      )}
    </div>
  );
}

export default Transactions;
