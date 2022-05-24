import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where, limit } from "firebase/firestore";
import { db } from "../../firebase.config";
import ListingItem from "../layout/ListingItem";
// import { Link } from "react-router-dom";

function UserPage() {
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
          where("id", "==", params.userId),
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
  }, []);
  console.log(listings);
  console.log(params.userId);
  return (
    <div className="category mb-10">
      {loading ? (
        <h1>Loading...</h1>
      ) : listings && listings.length > 0 ? (
        <>
          <header className="infoHeader">
            <ul className=" mt-3 menu menu-horizontal  rounded-box items-">
              <li>
                <a href={`/user/${params.userId}`}>Listings</a>
              </li>
              <div class="divider divider-horizontal"></div>
              <li>
                <a href="/transactions">Transactions</a>
              </li>
            </ul>
            {/* <div>
              <Link to={`/user/${params.userId}`}>Listings</Link>
              <br />
              <Link to="/transactions">Transactions</Link>
            </div> */}
          </header>
          <header className="infoHeader">
            <div>
              <h1 className="  text-2xl homeHeader">User Store</h1>
            </div>
            <div>
              <h2 className=" text-xl font-bold">{params.userId}</h2>
            </div>
          </header>
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

export default UserPage;
