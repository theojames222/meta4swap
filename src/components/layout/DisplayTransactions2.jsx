import React from "react";
import { useState, useEffect } from "react";
import avalanche from "../assets/avalanche-avax-logo.png";

import { Link } from "react-router-dom";
import m4sAbi from "../abi/m4s_abi.json";
import Web3 from "web3/dist/web3.min.js";
function DisplayTransactions2({ listing, id }) {
  const avaxSym = <img className="eth" src={avalanche} alt="matic" />;
  const price = listing.price / 10 ** 18;
  const [listingData, setListingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const getItem = async () => {
    const itemId = listing.itemId;
    const web3 = new Web3(
      new Web3.providers.HttpProvider(
        "https://rinkeby.infura.io/v3/18c3956af9734c289bfed9eee03ee1a7"
      )
    );
    const M4SContract = new web3.eth.Contract(
      m4sAbi,
      "0x0680A9396b1d54D1b2D393580E1B4BDB20f4D2F8"
    );
    //const itemId = 1;
    // const itemInfo = await M4SContract.methods
    // .itemInfo(window.itemId)
    // .call();

    // console.log(itemInfo['id']);
    // console.log(itemInfo['metadata']);
    // fetch(itemInfo['metadata'])
    //     .then((response) => response.json())
    //     .then((data) => console.log("This is your data: ", data));

    const itemInfo = await M4SContract.methods.itemInfo(itemId).call();

    console.log(itemInfo["id"]);
    console.log(itemInfo["metadata"]);
    fetch(itemInfo["metadata"])
      .then((response) => response.json())
      .then((data) => {
        setListingData(data);
        setLoading(false);
      });
    // setLoading(false);
  };
  useEffect(() => {
    getItem();

    // console.log(listings);
    setLoading(false);
  }, []);
  return (
    <>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <tbody>
            <tr>
              <td>
                <div className="mx-5 ">
                  <div className=" pr-10 px-8">
                    <Link
                      to={`/category/${listingData.category}/${listing.itemId}`}
                      className="font-bold"
                    >
                      {listing.itemId}
                    </Link>
                  </div>
                  <div className="badge badge-ghost badge-sm">
                    {listingData.category}
                  </div>
                </div>
              </td>
              <td>
                <div className="flex mx-10 ">
                  <div>
                    <div className="smallHeader pl-10 pt-5">
                      {listing.orderId}
                    </div>
                    {/* <div className="badge badge-ghost badge-sm">
                      {listing.category}
                    </div> */}
                  </div>
                </div>
                <br />
              </td>
              <td>
                {" "}
                <div className="pl-20 pr-5">
                  <div className="font-bold">{`$ ${price.toFixed(4)}`}</div>
                  <div className="text-sm opacity-50">
                    {" "}
                    (
                    {(
                      (((price * 10 ** 18) / window.ethPrice) * 10 ** 8) /
                      10 ** 18
                    ).toFixed(3)}{" "}
                    {avaxSym})
                  </div>
                </div>
              </td>
              <th className="px-10">
                {/* <button className="btn btn-ghost btn-xs">Actions Modal</button> */}
                <ul className="menu menu-compact ">
                  <li>
                    <button
                      for="complete-modal"
                      className="compBtn modal-button"
                    >
                      Complete
                    </button>
                  </li>
                  <li>
                    <button className="canBtn">Cancel</button>
                  </li>
                  <li>
                    <button className="disputeBtn">Dispute</button>
                  </li>
                </ul>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default DisplayTransactions2;
