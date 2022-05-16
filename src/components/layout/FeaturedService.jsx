import React from "react";
import Headlines from "./Headlines";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where, limit } from "firebase/firestore";
import { db } from "../../firebase.config";
import ListingItem from "../layout/ListingItem";
function FeaturedService() {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);

  const params = useParams();
  useEffect(() => {
    const fetchListings = async () => {
      try {
        //Get reference
        const listingsRef = collection(db, "listings");

        //Create a query
        const q = query(
          listingsRef,
          where("category", "==", "service"),
          limit(4)
        );

        //Execute query
        const querySnap = await getDocs(q);

        let listings = [];
        querySnap.forEach((doc) => {
          console.log(doc.data());
          console.log(doc.id);
          return listings.push({ id: doc.id, data: doc.data() });
        });
        setListings(listings);
        setLoading(false);
      } catch (error) {
        console.log("error");
      }
    };
    fetchListings();
    console.log(listings);
  }, []);
  return (
    <div className="category">
      {loading ? (
        <h1>Loading...</h1>
      ) : listings && listings.length > 0 ? (
        <>
          <Headlines text="Featured Services" content="Latest services" />
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

export default FeaturedService;
