import Spinner from "../shared/Spinner";

import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import m4sAbi from "../abi/m4s_abi.json";
import Web3 from "web3/dist/web3.min.js";
import OfferTable from "../layout/OfferTable";
// const Moralis = require("moralis-v1");

function ServicePage({ userAddress }) {
  const page = window.location.href;
  const [loading, setLoading] = useState(true);

  const [listingData, setListingData] = useState({});
  const [isLive, setIsLive] = useState(null);

  const navigate = useNavigate();
  const params = useParams();
  let itemId = params.listingId;
  let fLCapital = (s) => (s = s.charAt(0).toUpperCase() + s.slice(1));
  useEffect(() => {
    const fetchEthPrice = async () => {
      const web3 = new Web3(
        new Web3.providers.HttpProvider(
          "https://goerli.infura.io/v3/18c3956af9734c289bfed9eee03ee1a7"
        )
      );
      const M4SContract = new web3.eth.Contract(
        m4sAbi,
        "0xC774Cf50715DCF2d50b7333e1c216bEF67E7D4E4"
      );

      const ethPrice = await M4SContract.methods.getLatestPrice().call();

      console.log(ethPrice);
      window.ethPrice = ethPrice;
    };

    const getItem = async () => {
      // const itemId = 1;
      const web3 = new Web3(
        new Web3.providers.HttpProvider(
          "https://goerli.infura.io/v3/18c3956af9734c289bfed9eee03ee1a7"
        )
      );
      const M4SContract = new web3.eth.Contract(
        m4sAbi,
        "0xC774Cf50715DCF2d50b7333e1c216bEF67E7D4E4"
      );

      const itemInfo = await M4SContract.methods.itemInfo(itemId).call();

      console.log(itemInfo["id"]);
      console.log(itemInfo["metadata"]);
      console.log(itemInfo["owner"]);
      console.log(itemInfo["isLive"]);
      console.log(itemInfo["price"]);
      console.log(itemInfo["serviceType"]);
      setIsLive(itemInfo["isLive"]);

      fetch(itemInfo["metadata"])
        .then((response) => response.json())
        .then((data) => {
          setListingData(data);
          setLoading(false);
        });
    };

    fetchEthPrice();

    getItem();
  }, [navigate, params.listingId]);

  const buyNow = async (e) => {
    e.preventDefault();
    const web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    var account = accounts[0];

    const M4SContract = new web3.eth.Contract(
      m4sAbi,
      "0xC774Cf50715DCF2d50b7333e1c216bEF67E7D4E4",
      {
        from: account,
      }
    );

    console.log(listingData.price);
    console.log(window.ethPrice);

    const orderPrice =
      ((listingData.price * 10 ** 18) / window.ethPrice) * 10 ** 8;
    const slippage = parseInt((orderPrice * 100) / 10000);
    console.log(orderPrice);
    console.log(slippage);
    console.log(orderPrice / 10 ** 18);

    M4SContract.methods
      .buy(itemId)
      .send({
        from: account,
        value: Math.round(orderPrice) + slippage,
      })
      .on("receipt", function () {
        navigate(`/transactions/${userAddress}`);
      });
  };

  const offerNow = async (e) => {
    e.preventDefault();
    const web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    var account = accounts[0];

    const M4SContract = new web3.eth.Contract(
      m4sAbi,
      "0xC774Cf50715DCF2d50b7333e1c216bEF67E7D4E4",
      {
        from: account,
      }
    );
    M4SContract.methods
      .offer(itemId)
      .send()
      .on("receipt", function () {
        navigate(`/transactions/${userAddress}`);
      });
  };

  console.log(listingData);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <div
            className="container items-center mx-auto justify-center"
            style={{
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <div className="grid grid-cols-3 gap-10 mx-auto px-10 h-screen">
              <div class=" overscroll-contain overflow-x-auto col-span-2">
                <div className="container pb-5">
                  <h2 className="smallHeader text-xl">{`Service Name:`}</h2>
                  <h3 className="text-xl">{`${fLCapital(
                    listingData.itemName
                  )}`}</h3>
                </div>
                <div className="container pb-5">
                  <h2 className="smallHeader">{`Creator: `}</h2>
                  <Link to={`/listings/account/${listingData.id}`}>
                    <h3>{listingData.id}</h3>
                  </Link>
                </div>
                <div className="container flex pb-5">
                  <div className="pr-10">
                    <h2 className="smallHeader justify-center align-center">{`Status:`}</h2>
                    <h3 className="justify-center align-center item-center">
                      {`${isLive === true ? "Open" : "Closed"}`}
                    </h3>
                  </div>
                  <div className="pr-10">
                    <h2 className="smallHeader">{`ETA Days`}</h2>
                    <h3>{listingData.eta} </h3>
                  </div>
                  <div className="">
                    <h2 className="smallHeader">{`Date Posted`}</h2>
                    <h3> {`${listingData.date.substring(0, 10)}`}</h3>
                  </div>
                </div>

                <h2 className="smallHeader">{`Service Description`}</h2>
                <p className="Description w-3/4 pb-10">
                  {`${fLCapital(listingData.description)}`}
                </p>
                {page.includes("task") ? (
                  <OfferTable
                    id={itemId}
                    userAddress={userAddress}
                    listingData={listingData}
                  />
                ) : (
                  ""
                )}
              </div>

              <div className="fixed right-0 mr-10">
                <div className="card w-96 bg-base-100 shadow-xl ">
                  {/* <figure>
                  <img src="https://placeimg.com/400/225/arch" alt="Shoes" />
                </figure> */}
                  <div className="card-body">
                    <h2
                      className="card-title text-2xl text-center justify-center pb-5"
                      style={{ color: "gray" }}
                    >
                      {`${fLCapital(listingData.itemName)}`}
                    </h2>
                    <h2 className="card-title text-2xl justify-center pb-2 ">
                      Price:
                    </h2>
                    <h2 className="card-title text-3xl font-bold justify-center">
                      {`$${Number(listingData.price).toFixed(2)}`}
                    </h2>
                    <h2 className="text-center justify-center pb-5">
                      {`${(
                        (((listingData.price * 10 ** 18) / window.ethPrice) *
                          10 ** 8) /
                        10 ** 18
                      ).toFixed(3)} ETH`}
                      {/* {ethSym} */}
                    </h2>
                    <div className="card-actions justify-center">
                      <button
                        className="btn btn-primary"
                        onClick={
                          listingData.category === "task" ? offerNow : buyNow
                        }
                      >
                        {`${
                          listingData.category === "task"
                            ? "Offer Now"
                            : "Buy Now"
                        }`}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ServicePage;
