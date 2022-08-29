import React from "react";
import Headlines from "../layout/Headlines";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import UserPage from "./UserPage";
import TransactionsTable from "../layout/TransactionsTable";
import { useCallback } from "react";
import { useEffect } from "react";
import Switch from "../actions/Switch";
import Spinner from "../shared/Spinner";

const Moralis = require("moralis-v1");

function NewTransactions({ userAddress }) {
  const [listing, setListings] = useState(false);
  const [transactions, setTransactions] = useState(true);
  const [listingsBuyer, setListingsBuyer] = useState([]);
  const [listingsSeller, setListingsSeller] = useState([]);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(false);
  const params = useParams();
  const page = window.location.href;

  const getOrdersBuyer = useCallback(async () => {
    let ordersBuyer = [];
    try {
      const serverUrl = "https://gu15uqsbipep.usemoralis.com:2053/server";
      const appId = "F28xSksEmA0YDFTQskgodpG3W5JSZK0uBm9Abnde";
      const masterKey = "G5799rbYbzVEjmd9B2tFNfgX184JryV3ntW283dy";
      await Moralis.start({ serverUrl, appId, masterKey });
      const Item = Moralis.Object.extend("m4orders1");
      const query = new Moralis.Query(Item);
      //replace my address with user's address
      const user = params.userId;
      //Delete user2 for final version
      // const user2 = "0x5f5b7c5c23f2826b0fdc25d21944bceaf146fd78";
      // console.log(typeof user2);
      query.equalTo("buyer", user);
      const results = await query.find();
      console.log(results.length);
      for (let i = 0; i < results.length; i++) {
        const object = results[i];
        const orderId = object.get("orderId");
        const itemId = object.get("itemId");
        const price = object.get("price");
        const serviceType = object.get("serviceType");
        console.log(orderId);
        console.log(itemId);
        console.log(price);
        console.log(serviceType);

        ordersBuyer.push({
          orderId: orderId,
          itemId: itemId,
          price: price,
          serviceType: serviceType,
        });
      }
      setListingsBuyer(ordersBuyer);
      setLoading(false);
    } catch (error) {
      console.log("error");
    }
  }, [setLoading, setListingsBuyer, params.userId]);

  const getOrdersSeller = useCallback(async () => {
    let ordersSeller = [];
    try {
      const serverUrl = "https://gu15uqsbipep.usemoralis.com:2053/server";
      const appId = "F28xSksEmA0YDFTQskgodpG3W5JSZK0uBm9Abnde";
      const masterKey = "G5799rbYbzVEjmd9B2tFNfgX184JryV3ntW283dy";
      await Moralis.start({ serverUrl, appId, masterKey });
      const Item = Moralis.Object.extend("m4orders1");
      const query = new Moralis.Query(Item);
      //replace my address with user's address
      const user = params.userId;
      // const user2 = "0x5f5b7c5c23f2826b0fdc25d21944bceaf146fd78";
      query.equalTo("seller", user);
      const results = await query.find();
      console.log(results.length);
      for (let i = 0; i < results.length; i++) {
        const object = results[i];
        const orderId = object.get("orderId");
        const itemId = object.get("itemId");
        const price = object.get("price");
        const serviceType = object.get("serviceType");
        console.log(orderId);
        console.log(itemId);
        console.log(price);
        console.log(serviceType);

        ordersSeller.push({ orderId: orderId, itemId: itemId, price: price });
      }
      setListingsSeller(ordersSeller);
      setLoading(false);
    } catch (error) {
      console.log("error");
    }
  }, [setLoading, setListingsSeller, params.userId]);
  useEffect(() => {
    getOrdersBuyer();
    getOrdersSeller();

    setLoading(false);
  }, []);

  const onClick = () => {
    setListings(true);
    setTransactions(false);
  };
  const onClick2 = () => {
    setTransactions(true);
    setListings(false);
  };

  return (
    <>
      {listing === true ? (
        <>
          <div className="flex justify-center align-center mt-3 mx-5">
            <button
              className={`btn btn-outline btn-ghost btn-${
                listing === true ? "active" : ""
              } w-1/2 ${listing === true ? "text-white" : ""}`}
              onClick={onClick}
            >
              Listings
            </button>
            <button
              className={`btn btn-outline btn-ghost btn-${
                transactions === true ? "active" : ""
              } w-1/2  `}
              onClick={onClick2}
            >
              Transactions
            </button>
          </div>

          <UserPage userAddress={userAddress} />
        </>
      ) : (
        <div className="content mx-20 pb-10">
          <div className="pb-10">
            <div className="flex justify-center align-center mt-3">
              <button
                className={`btn btn-outline btn-ghost btn-${
                  listing === true ? "active" : ""
                } w-1/2 ${listing === true ? "text-white" : ""}`}
                onClick={onClick}
              >
                Listings
              </button>
              <button
                className={`btn btn-outline btn-ghost btn-${
                  transactions === true ? "active" : ""
                } w-1/2  `}
                onClick={onClick2}
              >
                Transactions
              </button>
            </div>
            <Headlines text="My Account :" content={`${userAddress}`} />
            <div className="divider"></div>
          </div>
          {/* ADD TOGGLE FOR SERVICES AND TASKS INSTEAD OF BUTTONS */}
          {/* <TransactionsTable /> */}
          <div className="category mb-10">
            {loading ? (
              <Spinner />
            ) : (listingsBuyer && listingsBuyer.length > 0) ||
              (listingsSeller && listingsSeller.length > 0) ? (
              <>
                <div>
                  <Switch isOn={value} handleToggle={() => setValue(!value)} />

                  <div className={value === true ? "hidden" : ""}>
                    <div className=" infoHeader mt-5 pb-3">
                      Purchased Orders
                    </div>
                    <div className=" flex justify-center">
                      <div className="overflow-x-auto w-full">
                        <thead
                          className="table w-full "
                          style={{
                            backgroundColor: "lightgray",
                            alignContent: "center",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <tr>
                            <th className="px-5 text-center">Order Id</th>
                            <th className="text-center">Item Id</th>
                            <th className="text-center">Amount</th>
                            <th className="text-center">Block #</th>
                            <th className="pl-5 justify-center text-center">
                              Status
                            </th>
                          </tr>
                        </thead>
                        <table className="table-auto w-full ">
                          <main>
                            <ul>
                              {listingsBuyer.map((listing) => (
                                <TransactionsTable
                                  listing={listing}
                                  id={listing.orderId}
                                  key={listing.orderId}
                                />
                              ))}
                            </ul>
                          </main>
                        </table>
                      </div>
                    </div>
                  </div>
                  {listingsSeller && listingsSeller.length > 0 ? (
                    <>
                      <div className=" infoHeader mt-8">Items Sold</div>
                      <div className=" flex justify-center">
                        <div className="overflow-x-auto w-full">
                          <thead
                            className="table w-full "
                            style={{
                              backgroundColor: "lightgray",
                              alignContent: "center",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <tr>
                              <th className="px-5 text-center">Order Id</th>
                              <th className="text-center">Item Id</th>
                              <th className="text-center">Amount</th>
                              {/* <th className="text-center">Date</th> */}
                              <th className="pl-5 justify-center text-center">
                                Status
                              </th>
                            </tr>
                          </thead>
                          <table className="table-auto w-full ">
                            <main>
                              <ul>
                                {listingsSeller.map((listing) => (
                                  <TransactionsTable
                                    listing={listing}
                                    id={listing.orderId}
                                    key={listing.orderId}
                                  />
                                ))}
                              </ul>
                            </main>
                          </table>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className=" flex justify-center mt-5">
                      No Tasks or Services Sold
                    </div>
                  )}
                </div>
              </>
            ) : (
              <Spinner />
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default NewTransactions;
