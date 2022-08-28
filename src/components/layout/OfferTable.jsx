import React from "react";
import { useState, useCallback, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
const Moralis = require("moralis-v1");
function OfferTable({ id }) {
  const [loading, setLoading] = useState(true);
  const [offersArr, setOffersArr] = useState([]);
  const params = useParams();
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
  }, [setLoading, setOffersArr, params.userId]);
  useEffect(() => {
    // getItem();
    getOffers();

    setLoading(false);
  }, []);
  console.log(offersArr);
  const acceptOffer = () => {
    console.log("offer accepted");
  };
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
                        onClick={acceptOffer}
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
