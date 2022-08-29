import Headlines from "./Headlines";
import ListingItem from "./ListingItem";
import { useEffect, useState, useCallback } from "react";
import Spinner from "../shared/Spinner";
const Moralis = require("moralis-v1");

function LatestServices() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const page = window.location.href;

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
      query.limit(4);
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
          setListings(services);
          setLoading(false);
        })
      );
      // setListings(services);
      // setLoading(false);
    } catch (error) {
      console.log("error");
    }
  }, [setLoading, setListings]);

  useEffect(() => {
    getServices();

    console.log(listings);

    setLoading(false);
  }, []);

  return (
    <div className="category drop-shadow-lg">
      <Headlines
        text="Latest Services"
        content="Most recently created services"
      />
      {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <>
          <div
            className="container items-center mx-2 justify-center"
            style={{
              // justifyContent: "space-evenly",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 ">
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
        <Spinner />
      )}
    </div>
  );
}

export default LatestServices;
