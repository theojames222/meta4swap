import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import m4sAbi from "../abi/m4s_abi.json";
import Web3 from "web3/dist/web3.min.js";



function TransactionsTable({ listing, id }) {

  const [orderCreated, setOrderCreated] = useState("");
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(true);
 
  const getOrder = async () => {
    const orderId = listing.orderId;
    const web3 = new Web3(
      new Web3.providers.HttpProvider(
        "https://goerli.infura.io/v3/18c3956af9734c289bfed9eee03ee1a7"
      )
    );
    const M4SContract = new web3.eth.Contract(
      m4sAbi,
      "0xC774Cf50715DCF2d50b7333e1c216bEF67E7D4E4"
    );

    const orderInfo = await M4SContract.methods.orderInfo(orderId).call();

    // console.log(orderInfo["id"]);
    // console.log(orderInfo["itemId"]);
    // console.log(orderInfo["orderTotal"]);
    // console.log(orderInfo["created"]);
    // console.log(orderInfo["fee"]);
    // console.log(orderInfo["itemPrice"]);
    // console.log(orderInfo["chainLinkPrice"]);
    // console.log(orderInfo["buyerState"]);
    // console.log(orderInfo["sellerState"]);
    // console.log(orderInfo["isLive"]);
    // console.log(orderInfo["buyer"]);
    // console.log(orderInfo["seller"]);

    window.itemId = orderInfo["itemId"];

    setIsLive(orderInfo["isLive"]);
    setOrderCreated(orderInfo["created"]);


  };

  useEffect(() => {
   
    getOrder();

    setLoading(false);
  }, []);
 
  return (
    <>
      <div className="overflow-x-auto">
        <table className="table  w-full">
          <tbody>
            <tr>
              <td>
                <div className="mx-5 text-center ">
                  <div className=" pr-10 px-8 text-center">
                    <Link
                      // path="/order/:type/:orderId"
                      to={`/order/${
                        listing.serviceType === 0 ? "service" : "task"
                      }/${listing.orderId}`}
                      className="font-bold"
                    >
                      {listing.orderId}
                    </Link>
                  </div>
                </div>
              </td>
              <td>
                <div className=" flex text-center align-center justify-center">
                  <div className="ml-5 pl-10 text-center align-center justify-center">
                    {listing.itemId}
                  </div>
                  <div className="badge badge-ghost badge-sm ml-5 mt-3 align-center justify-center">
                    {listing.serviceType === 0 ? "service" : "task"}
                  </div>
                </div>
              </td>
              <td className="text-center align-center justify-center px-5">
                <div className="ml-5 pl-10 ">
                  <div className=" text-center align-center justify-center">
                    <div className=" text-center mr-5">{`${Number(
                      listing.price / 10 ** 18
                    ).toFixed(8)} ETH`}</div>
                  </div>
                </div>
              </td>
              <td className="text-end align-end justify-end px-3">
                <div className="mx-5 text-center ">
                  <div className="  text-end align-end justify-end">
                    {orderCreated}
                  </div>
                </div>
              </td>
              <td>
                <div className="mx-5text-center ">
                  <div className=" text-center px-8">
                    <div>{isLive === true ? "Open" : "Closed"}</div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default TransactionsTable;
