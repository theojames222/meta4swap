import React from "react";
import whatsapp from "../assets/whatsapp.png";
import discord from "../assets/discord.png";
import telegram from "../assets/telegram.png";
import { useEffect, useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import Spinner from "../shared/Spinner";

import ListingItem from "../layout/ListingItem";
import Headlines from "../layout/Headlines";

const Moralis = require("moralis-v1");
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
      const Item = Moralis.Object.extend("m4services1");
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
          setListings(userItems);
          setLoading(false);
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

    setLoading(false);
  }, []);

  return (
    <div className="category mb-10">
      {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <>
          {userAddress === params.userId ? (
            <Headlines text="My Account" content="Listings on Meta4Swap" />
          ) : (
            <>
              <header className="infoHeader">
                <div>
                  <h1 className="  text-2xl homeHeader">User Listings</h1>
                </div>
                <div>
                  <h2 className=" text-xl font-bold">{params.userId}</h2>
                </div>
              </header>
              <header className="infoHeader">
                <div>
                  <h1 className="  text-lg homeHeader">Contact</h1>
                </div>
              </header>{" "}
            </>
          )}

          <main className={`${userAddress === params.userId ? "" : "pt-10"}`}>
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
        <Spinner />
      )}
    </div>
  );
}

export default UserPage;
