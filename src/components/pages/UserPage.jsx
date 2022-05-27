import React from "react";
import whatsapp from "../assets/whatsapp.png";
import discord from "../assets/discord.png";
import telegram from "../assets/telegram.png";
import { useEffect, useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
// import { collection, getDocs, query, where, limit } from "firebase/firestore";
// import { db } from "../../firebase.config";
import ListingItem from "../layout/ListingItem";
// import { Link } from "react-router-dom";
const Moralis = require("moralis");
function UserPage({ userAddress }) {
  const whatsappSym = (
    <img className="logoContact1" src={whatsapp} alt="whatsapp" />
  );
  const discordSym = (
    <img className="logoContact2" src={discord} alt="discord" />
  );
  const telegramSym = (
    <img className="logoContact3" src={telegram} alt="telegram" />
  );

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const getUserItems = useCallback(async () => {
    try {
      let userItems = [];
      const serverUrl = "https://gu15uqsbipep.usemoralis.com:2053/server";
      const appId = "F28xSksEmA0YDFTQskgodpG3W5JSZK0uBm9Abnde";
      const masterKey = "G5799rbYbzVEjmd9B2tFNfgX184JryV3ntW283dy";
      await Moralis.start({ serverUrl, appId, masterKey });
      const Item = Moralis.Object.extend("ItemCreated");
      const query = new Moralis.Query(Item);
      //replace my address with user's address
      query.equalTo("creator", params.userId);
      const results = await query.find();
      await Promise.all(
        results.map(async (item) => {
          const metadata = item.get("metadata");
          const itemId = item.get("itemId");
          const ipfsURL = metadata;
          const response = await fetch(ipfsURL)
            .then((resp) => resp.json())
            .then((response) => response);
          userItems.push({ id: itemId, data: response });
        })
      );
      setListings(userItems);
      setLoading(false);
    } catch (error) {
      console.log("error");
    }
  }, [setLoading, setListings, params.userId]);

  useEffect(() => {
    getUserItems();

    console.log(listings);
    // console.log(listings);
    setLoading(false);
  }, []);

  return (
    <div className="category mb-10">
      {loading ? (
        <h1>Loading...</h1>
      ) : listings && listings.length > 0 ? (
        <>
          {userAddress !== params.userId ? (
            ""
          ) : (
            <header className="infoHeader">
              <ul className=" mt-3 menu menu-horizontal  rounded-box items-">
                <li>
                  <Link to={`/user/listings/${params.userId}`} disabled={true}>
                    Listings
                  </Link>
                </li>
                <div class="divider divider-horizontal"></div>
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
          )}

          <header className="infoHeader">
            <div>
              <h1 className="  text-2xl homeHeader">User Store</h1>
            </div>
            <div>
              <h2 className=" text-xl font-bold">{params.userId}</h2>
            </div>
          </header>
          <header className="infoHeader">
            <div>
              <h1 className="  text-lg homeHeader">Contact</h1>
            </div>
            <div className="flex">
              {/* Validate this data before presenting */}
              <a href={`${listings[0].data.whatsapp}`}>{whatsappSym}</a>
              <a href={`${listings[0].data.discord}`}>{discordSym}</a>
              <a href={`https://${listings[0].data.telegram}`}>{telegramSym}</a>
            </div>
          </header>
          <main className="pt-10">
            <ul className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
              {listings.map((listing) => (
                <ListingItem
                  listing={listing.data}
                  id={listing.id}
                  key={listing.id}
                />
              ))}
            </ul>
          </main>
        </>
      ) : (
        <p>No listings available for {params.userId}</p>
      )}
    </div>
  );
}

export default UserPage;
