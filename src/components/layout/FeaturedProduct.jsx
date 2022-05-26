import React, { useCallback } from "react";
import Headlines from "./Headlines";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ListingItem from "../layout/ListingItem";
import { v4 as uuidv4 } from "uuid";

const Moralis = require("moralis");

function FeaturedProduct() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  const getProducts = useCallback(async () => {
    try {
      let products = [];
      const serverUrl = "https://gu15uqsbipep.usemoralis.com:2053/server";
      const appId = "F28xSksEmA0YDFTQskgodpG3W5JSZK0uBm9Abnde";
      const masterKey = "G5799rbYbzVEjmd9B2tFNfgX184JryV3ntW283dy";
      await Moralis.start({ serverUrl, appId, masterKey });
      const Item = Moralis.Object.extend("ItemCreated");
      const query = new Moralis.Query(Item);
      query.equalTo("productType", "0");
      const results = await query.find();
      await Promise.all(
        results.map(async (item) => {
          const metadata = item.get("metadata");
          const itemId = item.get("itemId");
          const ipfsURL = metadata;
          const response = await fetch(ipfsURL)
            .then((resp) => resp.json())
            .then((response) => response);
          products.push({ id: itemId, data: response });
        })
      );
      setListings(products);
      setLoading(false);
    } catch (error) {
      console.log("error");
    }
  }, [setLoading, setListings]);

  useEffect(() => {
    getProducts();

    console.log(listings);
    // console.log(listings);
    setLoading(false);
  }, []);
  // console.log(productsData);
  // console.log(listings);
  return (
    <div className="category">
      <Headlines text="Featured Products" content="Latest products" />
      {loading ? (
        <h1 className="text-center">Loading...</h1>
      ) : listings && listings.length > 0 ? (
        <>
          <div
            className="container items-center mx-auto "
            style={{
              display: "flex",
              alignItems: "center",
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
            </div>
          </div>
        </>
      ) : (
        <p className="text-center">
          No listings available for {params.categoryName}
        </p>
      )}
    </div>
  );
}

export default FeaturedProduct;

// if(loading){
//   <h1>Loading...</h1>
// }else if(listings && listings.length >0)
