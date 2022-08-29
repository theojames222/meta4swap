import React from "react";
import { useEffect, useState, useCallback } from "react";
import ListingItem from "../layout/ListingItem";
import Headlines from "../layout/Headlines";
import Spinner from "../shared/Spinner";
const Moralis = require("moralis-v1");
function CategoryService() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  const getServices = useCallback(async () => {
    try {
      let services = [];
      const serverUrl = "https://gu15uqsbipep.usemoralis.com:2053/server";
      const appId = "F28xSksEmA0YDFTQskgodpG3W5JSZK0uBm9Abnde";
      const masterKey = "G5799rbYbzVEjmd9B2tFNfgX184JryV3ntW283dy";
      await Moralis.start({ serverUrl, appId, masterKey });
      const Item = Moralis.Object.extend("m4services1");
      const query = new Moralis.Query(Item);
      query.equalTo("itemType", "0");
      const results = await query.find();
      await Promise.all(
        await results.map(async (item) => {
          const metadata = item.get("metadata");
          const itemId = item.get("itemId");
          const ipfsURL = metadata;
          const response = await fetch(ipfsURL)
            .then((resp) => resp.json())
            .then((response) => response);
          services.push({ id: itemId, data: response });
          setLoading(false);
        })
      );
      setListings(services);
    } catch (error) {
      console.log("error");
    }
  }, [setLoading, setListings]);

  useEffect(() => {
    getServices();
  }, []);

  return (
    <>
      <Headlines
        text="Services Listings"
        content="Shop services with Meta4Swap"
      />
      <div
        className="container items-center mx-2 ml-auto mr-auto"
        style={{
          // justifyContent: "space-evenly",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <div className="category flex mb-10">
          {loading ? (
            <Spinner />
          ) : listings && listings.length > 0 ? (
            <>
              <ul
                className=" grid grid-cols-8 gap-4 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2"
                style={{}}
              >
                {listings.map((listing) => (
                  <ListingItem
                    listing={listing.data}
                    id={listing.id}
                    key={listing.id}
                  />
                ))}
              </ul>
            </>
          ) : (
            <Spinner />
          )}
        </div>
      </div>
    </>
  );
}

export default CategoryService;
