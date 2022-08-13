import React from "react";

import { Link } from "react-router-dom";

function CardLayout() {
  return (
    <>
      <div
        className="container items-center mx-auto justify-center"
        style={{
          justifyContent: "space-evenly",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 ">
          {/* Change Route /listing/:type/:listingId */}
          <Link to="/listing/service/testServicePage">
            <div className="card  bg-base-100 shadow-xl  mx-5 mt-5">
              <div className="card-body">
                <div className="">
                  <h2 className="card-title justify-center text-center">
                    Website Design with React
                  </h2>
                  <div class="divider"></div>
                </div>
                <p className="justify-center text-center">
                  The description goes here and can take up three lines ...
                </p>
                <h3 className="card-title justify-center"> $1200 or 1 ETH</h3>
                <div className="card-actions justify-center">
                  <button className="btn btn-primary">Buy Now</button>
                </div>
              </div>
            </div>
          </Link>
          <Link to="/listing/service/testServicePage">
            <div className="card  bg-base-100 shadow-xl  mx-5 mt-5">
              <div className="card-body">
                <div className="">
                  <h2 className="card-title justify-center text-center">
                    Website Design with React
                  </h2>
                  <div class="divider"></div>
                </div>
                <p className="justify-center text-center">
                  The description goes here and can take up three lines ...
                </p>
                <h3 className="card-title justify-center"> $1200 or 1 ETH</h3>
                <div className="card-actions justify-center">
                  <button className="btn btn-primary">Buy Now</button>
                </div>
              </div>
            </div>
          </Link>
          <Link to="/listing/service/testServicePage">
            <div className="card  bg-base-100 shadow-xl  mx-5 mt-5">
              <div className="card-body">
                <div className="">
                  <h2 className="card-title justify-center text-center">
                    Optimize opt-in conversion rates
                  </h2>
                  <div class="divider"></div>
                </div>
                <p className="justify-center text-center">
                  The description goes here and can take up three lines ...
                </p>
                <h3 className="card-title justify-center"> $1200 or 1 ETH</h3>
                <div className="card-actions justify-center">
                  <button className="btn btn-primary">Buy Now</button>
                </div>
              </div>
            </div>
          </Link>
          <Link to="/listing/service/testServicePage">
            <div className="card  bg-base-100 shadow-xl  mx-5 mt-5">
              <div className="card-body">
                <div className="">
                  <h2 className="card-title justify-center text-center">
                    NFT Smart Contract in Solidity
                  </h2>
                  <div class="divider"></div>
                </div>
                <p className="justify-center text-center">
                  The description goes here and can take up three lines ...
                </p>
                <h3 className="card-title justify-center"> $1200 or 1 ETH</h3>
                <div className="card-actions justify-center">
                  <button className="btn btn-primary">Buy Now</button>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default CardLayout;
