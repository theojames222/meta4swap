import React from "react";
import { useState, useEffect } from "react";
const TransactionItem = ({ transaction, id, listings }) => {
  const [item, setItem] = useState(null);

  useEffect(() => {
    // console.log(listings);
    const currentListing = listings
      .filter((listing) => listing.id === transaction.listing)
      .map((filteredListing) => filteredListing);
    setItem(currentListing);
  }, []);
  // console.log(item);
  // const itemData = item.map((it) => {
  //   return it.data;
  // });
  // console.log(itemData.price);
  const modalComplete = (
    <>
      <input type="checkbox" id="my-modal-3" class="modal-toggle" />
      <div class="modal">
        <div class="modal-box relative">
          <label
            for="my-modal-3"
            class="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 class="text-lg font-bold">
            Congratulations random Interner user!
          </h3>
          <p class="py-4">
            You've been selected for a chance to get one year of subscription to
            use Wikipedia for free!
          </p>
        </div>
      </div>
    </>
  );
  return (
    <>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <tbody>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>

              <td>
                <div className="flex ">
                  <div>
                    <div className="font-bold">Item Id</div>
                    <div className="text-sm opacity-50">Date</div>
                  </div>
                </div>
              </td>
              <td>
                {`${id.substring(0, 5)}...${id.substring(id.length - 4)}`}
                <br />
              </td>
              <td>
                {" "}
                <div>
                  <div className="font-bold">$100</div>
                  <div className="text-sm opacity-50">{`(0.051 avax)`}</div>
                </div>
              </td>
              <th className="px-1">
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
};

export default TransactionItem;
