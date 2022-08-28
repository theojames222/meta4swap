import Spinner from "../shared/Spinner";
// import ethSymbol from "../assets/Ethereum-Symbol.png";

import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import m4sAbi from "../abi/m4s_abi.json";
import Web3 from "web3/dist/web3.min.js";
import OfferTable from "../layout/OfferTable";
function ServicePage({ userAddress }) {
  // const ethSym = <img className="eth" src={ethSymbol} alt="eth" />;
  const page = window.location.href;
  const [loading, setLoading] = useState(true);

  const [quantity, setQuantity] = useState({ quantity: 1 });
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
        "0xC06130dB84fe3840c4CdB207EDd4b4e800aA957d"
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
        "0xC06130dB84fe3840c4CdB207EDd4b4e800aA957d"
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
      "0xC06130dB84fe3840c4CdB207EDd4b4e800aA957d",
      {
        from: account,
      }
    );

    const orderPrice =
      ((listingData.price * 10 ** 18) / window.ethPrice) *
      10 ** 8 *
      quantity["quantity"];
    const slippage = parseInt((orderPrice * 100) / 10000);
    console.log(orderPrice);
    console.log(slippage);
    console.log(orderPrice / 10 ** 18);

    M4SContract.methods
      .buy(itemId)
      .send({
        from: account,
        value: orderPrice + slippage,
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
      "0xC06130dB84fe3840c4CdB207EDd4b4e800aA957d",
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

  const getOffers = useCallback(async () => {
    let offers = [];
    try {
      const serverUrl = "https://gu15uqsbipep.usemoralis.com:2053/server";
      const appId = "F28xSksEmA0YDFTQskgodpG3W5JSZK0uBm9Abnde";
      const masterKey = "G5799rbYbzVEjmd9B2tFNfgX184JryV3ntW283dy";
      await Moralis.start({ serverUrl, appId, masterKey });
      const Item = Moralis.Object.extend("m4offers1");
      const query = new Moralis.Query(Item);
      //replace my address with user's address
      const user = params.userId;
      //Delete user2 for final version
      const user2 = "0x5f5b7c5c23f2826b0fdc25d21944bceaf146fd78";
      console.log(user);
      query.equalTo("itemId", itemId);
      const results = await query.find();
      console.log(results.length);
      for (let i = 0; i < results.length; i++) {
        const object = results[i];
        const worker = object.get("worker");
        console.log(worker);

        offers.push({
          worker: worker,

        });
      }
      //setListingsBuyer(ordersBuyer);
      //setLoading(false);
    } catch (error) {
      console.log("error");
    }
  }, [setLoading, setListingsBuyer, params.userId]);


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
                  <OfferTable listingData={listingData} />
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
