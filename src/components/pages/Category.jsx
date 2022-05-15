import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { db } from "../../firebase.config";
import ListingItem from "../layout/ListingItem";
function Category() {
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
          where("category", "==", params.categoryName),
          limit(16)
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
        <p>No listings available for {params.categoryName}</p>
      )}
    </div>
  );
}

export default Category;
