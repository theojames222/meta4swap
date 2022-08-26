import React from "react";

function OfferTable({ listingData }) {
  return (
    <>
      <h1 className="smallHeader pb-3">Current Offers</h1>
      <div className="overflow-x-auto">
        <table className="table table-compact w-3/4">
          <thead>
            <tr>
              <th className="smallHeader">User</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{listingData.id}</td>
              <td>
                <button className="btn-sm btn-primary">Buy</button>
              </td>
            </tr>
            <tr>
              <td>{listingData.id}</td>
              <td>
                <button className="btn-sm btn-primary">Buy</button>
              </td>
            </tr>
            <tr>
              <td>{listingData.id}</td>
              <td>
                <button className="btn-sm btn-primary">Buy</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default OfferTable;
