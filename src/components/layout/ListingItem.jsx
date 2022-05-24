import React from "react";
import eth from "../assets/Ethereum-Symbol.png";
import { Link } from "react-router-dom";

function ListingItem({ listing, id }) {
  const ethSym = <img className="eth" src={eth} alt="eth" />;

  console.log(listing.imageUrl);
  return (
    <>
      <div className="container-sm justify-center" style={{ display: "flex" }}>
        <Link to={`/category/${listing.category}/${id}`}>
          <div>
            <div className="card bg-none items-center">
              <figure className="shadow-2xl itemImg ">
                <img src={listing.imageUrl} alt={listing.productName} />
              </figure>
              <div className="card-body items-center text-center pb-3">
                <h2 className="card-title pt-3 font-bold text-xl truncate">
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
                  <p className="text ">
                    (
                    {(
                      (((listing.price * 10 ** 18) / window.ethPrice) *
                        10 ** 8) /
                      10 ** 18
                    ).toFixed(3)}
                    {ethSym})
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="card-actions pt-2 btnBuyHome ">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </Link>
      </div>
    </>
  );
}

export default ListingItem;
