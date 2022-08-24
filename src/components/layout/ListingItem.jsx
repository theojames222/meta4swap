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
        className="container-lg mx-0 justify-center pt-5 px-0"
        style={{ display: "flex" }}
      >
        <Link to={`/${listing.category}/${id}`}>
          <div className="card bg-base-100 shadow-xl   ">
            <div className="card-body ">
              <div className="justify-center text-center flex">
                <div className="w-60 h-20 justify-center text-center text-ellipsis overflow-hidden ... ">
                  <h2 className="h-26 max-h-full card-title justify-center text-center overflow-y-auto ...">
                    {listing.itemName}
                  </h2>
                  {/* <div class="divider"></div> */}
                </div>
              </div>
              <div className="h-20 pb-3 text-ellipsis overflow-hidden ... ">
                <p className=" h-26 max-h-full justify-center text-center overflow-y-auto ... scrollbar-hide ">
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
