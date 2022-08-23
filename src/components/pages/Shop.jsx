import { useEffect, useState, useCallback } from "react";
import Spinner from "../shared/Spinner";
import ListingItem from "../layout/ListingItem";
import Headlines from "../layout/Headlines";
const Moralis = require("moralis-v1");
function Shop() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAll = useCallback(async () => {
    try {
      let listingsAll = [];
      console.log("yo");
      const serverUrl = "https://gu15uqsbipep.usemoralis.com:2053/server";
      const appId = "F28xSksEmA0YDFTQskgodpG3W5JSZK0uBm9Abnde";
      const masterKey = "G5799rbYbzVEjmd9B2tFNfgX184JryV3ntW283dy";
      await Moralis.start({ serverUrl, appId, masterKey });
      const Item = Moralis.Object.extend("m4services1");
      console.log(Item);
      const query = new Moralis.Query(Item);
      const results = await query.find();
      await Promise.all(
        results.map(async (item) => {
          const metadata = item.get("metadata");
          console.log(metadata);
          const itemId = item.get("itemId");
          console.log(itemId);
          const ipfsURL = metadata;
          const response = await fetch(ipfsURL)
            .then((resp) => resp.json())
            .then((response) => response);
          listingsAll.push({ id: itemId, data: response });
          console.log(listingsAll);
          setListings(listingsAll);
          setLoading(false);
        })
      );

      // setListings(listingsAll);
      // setLoading(false);
    } catch (error) {
      console.log("error");
      // console.log(error);
    }
  }, [setLoading, setListings]);

  useEffect(() => {
    getAll();

    setLoading(false);
  }, []);

  return (
    <>
      <Headlines
        text={"Products Listings & Services Listings"}
        content={"Shop Meta4Swap marketplace"}
      />
      <div className="category mb-10">
        {loading ? (
          <Spinner />
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
          <Spinner />
        )}
      </div>
    </>
  );
}

export default Shop;
