import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { collection, getDocs, query, where, limit } from "firebase/firestore";
// import { db } from "../../firebase.config";
import ListingItem from "../layout/ListingItem";
const Moralis = require("moralis");
function CategoryProducts() {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [d, setD] = useState([]);
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
        console.log(results);
        let r = [results];
        console.log(r);
        r.forEach();
        // results.forEach(async (result) => {
        //   const metadata = result.get("metadata");
        //   const itemId = result.get("itemId");
        //   const ipfsURL = metadata;
        //   const response = await fetch(ipfsURL);
        //   console.log(response);
        //   const data = await response.json();
        //   console.log(data);
        //   console.log(typeof data);
        //   return productsData.push({ id: itemId, data: data });
        // });
        // // console.log(productsData);
        // setListings(productsData);
        // for(let i=0;results.length <i; i++)

        // results.forEach(async (result) => {
        //   const metadata = result.get("metadata");
        //   const itemId = result.get("itemId");
        //   const ipfsURL = metadata;
        //   const response = await fetch(ipfsURL)
        //     .then((response) => response.json())
        //     .then((data) => productsData.push({ id: itemId, data: data }));
        //   // const data = await response.json();
        //   // console.log(data);
        //   // console.log(itemId);
        //   // return productsData.push([{ id: itemId, data: data }]);
        //   return;
        // });
        // console.log(productsData);
      } catch (error) {
        console.log("error");
      }
    };
    getProducts();
  }, []);
  //   console.log(listings);
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

export default CategoryProducts;
