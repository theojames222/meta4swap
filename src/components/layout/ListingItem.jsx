import React from "react";
import avax from "../assets/avalanche-avax-logo.png";

import { Link } from "react-router-dom";

function ListingItem({ listing, id }) {
  const avaxSym = <img className="eth" src={avax} alt="avax" />;

  console.log(listing.imageUrl);
  console.log(id);
  return (
    <>
      <div
        className="container-sm justify-center pt-5"
        style={{ display: "flex" }}
      >
        <Link to={`/${listing.category}/${id}`}>
          <div className="card  bg-base-100 shadow-xl  ">
            <div className="card-body">
              <div className="">
                <h2 className="card-title justify-center text-center">
                  {listing.itemName}
                </h2>
                <div class="divider"></div>
              </div>
              <div className="h-1/3 pb-3 ">
                <p className="justify-center text-center">
                  {listing.description}
                </p>
              </div>
              <div className="container">
                <h3 className="card-title text-base justify-center">
                  {"Price: "}
                  {`$${listing.price}`}
                </h3>

                <h4 className="text-sm text-base justify-center text-center p-0">
                  {`(${(
                    (((listing.price * 10 ** 18) / window.ethPrice) * 10 ** 8) /
                    10 ** 18
                  ).toFixed(3)}) ETH`}
                </h4>
              </div>
              <div className="card-actions justify-center">
                <div className="card-actions pt-2 btnBuyHome ">
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
