import React from "react";
import eth from "../assets/Ethereum-Symbol.png";
import { Link } from "react-router-dom";

function ListingItem({ listing, id }) {
  const ethSym = <img className="eth" src={eth} alt="eth" />;

  console.log(listing.imageUrl);
  return (
    <>
      <div style={{ display: "flex" }}>
        <Link to={`/category/${listing.category}/${id}`}>
          <div>
            <div className="card w-auto bg-base-100 ">
              <figure className="shadow-2xl">
                <img src={listing.imageUrl} alt={listing.productName} />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title font-bold text-xl">
                  {listing.productName}
                </h2>
                <p className="text-accent-focus text-lg font-bold">Price:</p>
                <div
                  className="flex"
                  style={{
                    justifyContent: "space-evenly",
                  }}
                >
                  <p className="text font-bold mr-3">{`${
                    listing.priceUnit === "USD" ? "$" : "€"
                  } ${listing.price}`}</p>
                  <p className="text ">(.075 {ethSym})</p>
                </div>
                <div className="card-actions">
                  <button className="btn btn-primary">Buy Now</button>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}

export default ListingItem;
