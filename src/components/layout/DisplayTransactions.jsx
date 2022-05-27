import React from "react";

import avalanche from "../assets/avalanche-avax-logo.png";
import { Link } from "react-router-dom";

function DisplayTransactions({ listing, id }) {
  const avgSym = <img className="eth" src={avalanche} alt="avalanche" />;

  console.log(listing.imageUrl);
  console.log(id);
  return (
    <>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <tbody>
            <tr>
              <td>
                <div className="flex mx-10 ">
                  <div>
                    <div className="font-bold">{id}</div>
                    <div className="badge badge-ghost badge-sm">
                      {listing.category}
                    </div>
                  </div>
                </div>
              </td>
              <td>
                {listing.productName}
                <br />
              </td>
              <td>
                {" "}
                <div className="pl-20 pr-5">
                  <div className="font-bold">{`$ ${listing.price}`}</div>
                  <div className="text-sm opacity-50">
                    {" "}
                    (
                    {(
                      (((listing.price * 10 ** 18) / window.ethPrice) *
                        10 ** 8) /
                      10 ** 18
                    ).toFixed(3)}{" "}
                    {avgSym})
                  </div>
                </div>
              </td>
              <th className="px-10">
                {/* <button className="btn btn-ghost btn-xs">Actions Modal</button> */}
                <ul className="menu menu-compact ">
                  <li>
                    <button
                      for="complete-modal"
                      className="compBtn modal-button"
                    >
                      Complete
                    </button>
                  </li>
                  <li>
                    <button className="canBtn">Cancel</button>
                  </li>
                  <li>
                    <button className="disputeBtn">Dispute</button>
                  </li>
                </ul>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default DisplayTransactions;
