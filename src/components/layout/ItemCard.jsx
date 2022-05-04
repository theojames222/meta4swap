import React from "react";
import eth from "../assets/Ethereum-Symbol.png";

function ItemCard() {
  const ethSym = <img className="eth" src={eth} alt="eth" />;
  return (
    <>
      <div style={{ display: "flex" }}>
        <div>
          <div className="card w-auto bg-base-100 ">
            <figure className="shadow-2xl">
              <img
                src="https://api.lorem.space/image/shoes?w=400&h=225"
                alt="Shoes"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title font-bold text-xl">Product Name</h2>
              <p className="text-accent-focus text-lg font-bold">Price:</p>
              <div
                className="flex"
                style={{
                  justifyContent: "space-evenly",
                }}
              >
                <p className="text font-bold mr-3"> $222 USD</p>
                <p className="text ">(.075 {ethSym})</p>
              </div>
              <div className="card-actions">
                <button className="btn btn-primary">Buy Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ItemCard;
