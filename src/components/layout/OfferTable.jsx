import React from "react";
import { useState, useCallback, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import m4sAbi from "../abi/m4s_abi.json";
import Web3 from "web3/dist/web3.min.js";
const Moralis = require("moralis-v1");
function OfferTable({ id, userAddress, listingData }) {
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState({ quantity: 1 });
  const [offersArr, setOffersArr] = useState([]);
  const [btnDisabled, setbtnDisabled] = useState(true);

  const params = useParams();
  const navigate = useNavigate();
  let itemId = id;
  console.log(itemId);
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
      // const user = params.userId;
      // //Delete user2 for final version
      // const user2 = "0x5f5b7c5c23f2826b0fdc25d21944bceaf146fd78";
      // console.log(user);
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
        console.log(offers);
      }
      setOffersArr(offers);
      setLoading(false);
    } catch (error) {
      console.log("error");
    }
  }, [setLoading, setOffersArr, itemId]);

  const acceptOffer = async (itemId, worker) => {
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

    const orderPrice =
      ((listingData.price * 10 ** 18) / window.ethPrice) *
      10 ** 8 *
      quantity["quantity"];
    const slippage = parseInt((orderPrice * 100) / 10000);
    console.log(orderPrice);
    console.log(slippage);
    console.log(orderPrice / 10 ** 18);

    M4SContract.methods
      .acceptOffer(itemId, worker)
      .send({
        from: account,
        value: orderPrice + slippage,
      })
      .on("receipt", function () {
        navigate(`/transactions/${userAddress}`);
      });
  };

  useEffect(() => {
    // getItem();
    getOffers();
    userAddress === listingData.id
      ? setbtnDisabled(false)
      : setbtnDisabled(true);
    setLoading(false);
  }, []);
  console.log(offersArr);

  return (
    <>
      <h1 className="smallHeader pb-3">Current Offers</h1>
      <div className="overflow-x-auto">
        <table className="table table-compact w-3/4">
          <thead>
            <tr>
              <th className="">User</th>
            </tr>
          </thead>
          <tbody>
            <table className="table-auto table-compact w-full">
              {offersArr.map((item) => (
                <>
                  <tr className="">
                    <td key={item.id} className="">
                      {item.worker}
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-primary mr-3"
                        onClick={() => acceptOffer(itemId, item.worker)}
                        disabled={btnDisabled}
                      >
                        Accept Offer
                      </button>
                    </td>
                  </tr>
                </>
              ))}
            </table>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default OfferTable;
