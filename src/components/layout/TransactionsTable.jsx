import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
// import Switch from "../actions/Switch";

// Call the data base for usertransactions here
function TransactionsTable() {
  const [tasks, setTasks] = useState(false);
  const [services, setServices] = useState(true);
  //   const [value, setValue] = useState(false);

  //   Add on Toggle instead
  // Display data in map function in tbody
  return (
    <>
      <div className="overflow-x-auto">
        <table className="table table-compact w-full">
          {/* <Switch isOn={value} handleToggle={() => setValue(!value)} /> */}
          <Link className="table table-compact w-full" to="/order">
            <thead>
              <tr>
                <th>Order Id</th>
                <th>Item Id</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
          </Link>
          <tbody></tbody>
        </table>
      </div>
    </>
  );
}

export default TransactionsTable;
