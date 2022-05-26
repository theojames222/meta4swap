import React from "react";
import Headlines from "./Headlines";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ListingItem from "../layout/ListingItem";

const Moralis = require("moralis");

function FeaturedProduct() {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);

  let productsData = [];
  const params = useParams();
  useEffect(() => {
    const getProducts = async () => {
      try {
        const serverUrl = "https://gu15uqsbipep.usemoralis.com:2053/server";
        const appId = "F28xSksEmA0YDFTQskgodpG3W5JSZK0uBm9Abnde";
        const masterKey = "G5799rbYbzVEjmd9B2tFNfgX184JryV3ntW283dy";
        await Moralis.start({ serverUrl, appId, masterKey });
        const Item = Moralis.Object.extend("ItemCreated");
        const query = new Moralis.Query(Item);
        query.equalTo("productType", "0");
        const results = await query.find();
        console.log(results.length);
        results.forEach(async (result) => {
          const metadata = result.get("metadata");
          const itemId = result.get("itemId");
          const ipfsURL = metadata;
          const response = await fetch(ipfsURL);
          const data = await response.json();
          console.log(data);
          return productsData.push({ id: itemId, data: data });
        });
        console.log(productsData);
        setListings(productsData);
        setLoading(false);
      } catch (error) {
        console.log("error");
      }
    };

    getProducts();
  }, []);

  return (
    <div className="category">
      {loading ? (
        <h1>Loading...</h1>
      ) : listings && listings.length > 0 ? (
        <>
          <Headlines text="Featured Products" content="Latest products" />
          <div
            className="container items-center mx-auto "
            style={{
              display: "flex",
              alignItems: "center",
              // width: { width },
              justifyContent: "space-between",
            }}
          >
            <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
              {listings.map((listing) => (
                <ListingItem
                  listing={listing.data}
                  id={listing.id}
                  key={listing.id}
                />
              ))}{" "}
              {/* <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard /> */}
            </div>
          </div>
        </>
      ) : (
        <p>No listings available for {params.categoryName}</p>
      )}
    </div>
  );
}

export default FeaturedProduct;
