import Spinner from "../shared/Spinner";
// import ethSymbol from "../assets/Ethereum-Symbol.png";
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import m4sAbi from "../abi/m4s_abi.json";
import Web3 from "web3/dist/web3.min.js";

function OrderV2({ userAddress }) {
  // const ethSym = <img className="eth" src={ethSymbol} alt="eth" />;

  const [loading, setLoading] = useState(true);
  const [listingData, setListingData] = useState({});
  const [isLive, setIsLive] = useState(null);
  const [hidden, setHidden] = useState(true);
  const navigate = useNavigate();
  const params = useParams();
  //   let itemId = params.listingId;
  let itemId = 5;
  let orderId = 1;

  useEffect(() => {

    const getOrder = async () => {
      const web3 = new Web3(
        new Web3.providers.HttpProvider(
          "https://goerli.infura.io/v3/18c3956af9734c289bfed9eee03ee1a7"
        )
      );
      const M4SContract = new web3.eth.Contract(
        m4sAbi,
        "0xC06130dB84fe3840c4CdB207EDd4b4e800aA957d"
      );

      const orderInfo = await M4SContract.methods.orderInfo(orderId).call();

      console.log(itemInfo["id"]);
      console.log(itemInfo["itemId"]);
      console.log(itemInfo["orderTotal"]);
      console.log(itemInfo["created"]);
      console.log(itemInfo["fee"]);
      console.log(itemInfo["itemPrice"]);
      console.log(itemInfo["chainLinkPrice"]);
      console.log(itemInfo["buyerState"]);
      console.log(itemInfo["sellerState"]);
      console.log(itemInfo["isLive"]);
      console.log(itemInfo["buyer"]);
      console.log(itemInfo["seller"]);

      window.itemId = itemInfo["itemId"];

      //setIsLive(itemInfo["isLive"]);
      /*
      fetch(itemInfo["metadata"])
        .then((response) => response.json())
        .then((data) => {
          setListingData(data);
          setLoading(false);
        });
      */
    };

    const getItem = async () => {
      const web3 = new Web3(
        new Web3.providers.HttpProvider(
          "https://goerli.infura.io/v3/18c3956af9734c289bfed9eee03ee1a7"
        )
      );
      const M4SContract = new web3.eth.Contract(
        m4sAbi,
        "0xC06130dB84fe3840c4CdB207EDd4b4e800aA957d"
      );

      const itemInfo = await M4SContract.methods.itemInfo(window.itemId).call();

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

    getOrder();
    getItem();

  }, [navigate, params.listingId]);

  const disputeOrder = async (e) => {
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
      .dispute(orderId)
      .send()
      .on("receipt", function () {
        navigate(`/transactions/${userAddress}`);
      });

      console.log("order disputed");
  };
  const completeOrder = async (e) => {
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
      .complete(orderId)
      .send()
      .on("receipt", function () {
        navigate(`/transactions/${userAddress}`);
      });

      console.log("order completed");
  };
  const cancelOrder = async (e) => {
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
      .cancel(orderId)
      .send()
      .on("receipt", function () {
        navigate(`/transactions/${userAddress}`);
      });

      console.log("order cancelled");
  };

  const hideDescription = (e) => {
    e.preventDefault();
    hidden === true ? setHidden(false) : setHidden(true);
  };

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
                  <h3 className="text-xl">{`${listingData.itemName}`}</h3>
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

                <h2
                  className="smallHeader"
                  onClick={hideDescription}
                >{`Service Description`}</h2>
                <p className="Description w-3/4 pb-20" hidden={hidden}>
                  {listingData.description}
                </p>
                {/* <div className="overflow-x-auto">
                  <table className="table table-compact w-3/4">
                    <thead>
                      <tr>
                        <th>User</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{listingData.id}</td>
                        <td>
                          <button className="btn-sm btn-primary">Buy</button>
                        </td>
                      </tr>
                      <tr>
                        <td>{listingData.id}</td>
                        <td>
                          <button className="btn-sm btn-primary">Buy</button>
                        </td>
                      </tr>
                      <tr>
                        <td>{listingData.id}</td>
                        <td>
                          <button className="btn-sm btn-primary">Buy</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div> */}
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
                      {listingData.itemName}
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
                    <div
                      className="container items-center justify-center"
                      style={{
                        alignContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <ul
                        className="menu menu-compact items-center justify-center"
                        style={{
                          alignContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <li>
                          <button
                            for="complete-modal"
                            className="compBtn modal-button"
                            onClick={completeOrder}
                          >
                            Complete
                          </button>
                        </li>
                        <li>
                          <button className="canBtn" onClick={cancelOrder}>
                            Cancel
                          </button>
                        </li>
                        <li>
                          <button className="disputeBtn" onClick={disputeOrder}>
                            Dispute
                          </button>
                        </li>
                      </ul>
                    </div>
                    {/* <div className="card-actions justify-center">
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
                    </div> */}
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

export default OrderV2;
