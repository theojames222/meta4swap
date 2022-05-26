import React from "react";
import { useEffect, useState, useCallback } from "react";
import ListingItem from "../layout/ListingItem";
const Moralis = require("moralis");
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
      const Item = Moralis.Object.extend("ItemCreated");
      const query = new Moralis.Query(Item);
      query.equalTo("productType", "1");
      const results = await query.find();
      await Promise.all(
        results.map(async (item) => {
          const metadata = item.get("metadata");
          const itemId = item.get("itemId");
          const ipfsURL = metadata;
          const response = await fetch(ipfsURL)
            .then((resp) => resp.json())
            .then((response) => response);
          services.push({ id: itemId, data: response });
        })
      );
      setListings(services);
      setLoading(false);
    } catch (error) {
      console.log("error");
    }
  }, [setLoading, setListings]);

  useEffect(() => {
    getServices();

    console.log(listings);
    // console.log(listings);
    setLoading(false);
  }, []);
  // console.log(productsData);
  // console.log(listings);
  return (
    <div className="category mb-10">
      {loading ? (
        <h1>Loading...</h1>
      ) : listings && listings.length > 0 ? (
        <>
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
        <p>No listings available for Products</p>
      )}
    </div>
  );
}

export default CategoryService;
