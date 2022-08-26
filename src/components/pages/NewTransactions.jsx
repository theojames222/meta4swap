import React from "react";
import Headlines from "../layout/Headlines";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import UserPage from "./UserPage";
import TransactionsTable from "../layout/TransactionsTable";

function NewTransactions({ userAddress }) {
  const [listing, setListings] = useState(false);
  const [transactions, setTransactions] = useState(true);
  const [tasks, setTasks] = useState(false);
  const [services, setServices] = useState(true);
  const params = useParams();

  const onClick = () => {
    setListings(true);
    setTransactions(false);
  };
  const onClick2 = () => {
    setTransactions(true);
    setListings(false);
  };
  const onClick3 = () => {
    setServices(true);
    setTasks(false);
  };
  const onClick4 = () => {
    setTasks(true);
    setServices(false);
  };
  return (
    <>
      {listing === true ? (
        <>
          <div className="flex justify-center align-center mt-3 mx-5">
            <button
              className={`btn btn-outline btn-primary btn-${
                listing === true ? "active" : ""
              } w-1/2 ${listing === true ? "text-white" : ""}`}
              onClick={onClick}
            >
              Listings
            </button>
            <button
              className={`btn btn-outline btn-primary btn-${
                transactions === true ? "active" : ""
              } w-1/2  `}
              onClick={onClick2}
            >
              Transactions
            </button>
          </div>
          {/* <div className="content mx-20 ">
            <div className="">
              <Headlines
                text="My Account :"
                content={`${"0xA209d66169840b201e56a80a2C73EB6d0427575d".substring(
                  0,
                  5
                )}...${"0xA209d66169840b201e56a80a2C73EB6d0427575d".substring(
                  "0xA209d66169840b201e56a80a2C73EB6d0427575d".length - 4
                )}`}
              />
              <div className="flex justify-center align-center mt-3">
                <button
                  className={`btn btn-outline btn-primary btn-${
                    listing === true ? "active" : ""
                  } w-1/2 ${listing === true ? "text-white" : ""}`}
                  onClick={onClick}
                >
                  Listings
                </button>
                <button
                  className={`btn btn-outline btn-primary btn-${
                    transactions === true ? "active" : ""
                  } w-1/2  `}
                  onClick={onClick2}
                >
                  Transactions
                </button>
              </div>
              <div className="flex justify-center align-center mt-3">
                <button
                  className={`btn btn-link btn-${
                    listing === true ? "active" : ""
                  } w-1/2 ${
                    listing === true ? "text-white" : ""
                  } smallHeader text-2xl font-bold rounded-btn mx-10 px-10`}
                  onClick={onClick3}
                >
                  Services
                </button>
                <button
                  className={`btn btn-link btn-${
                    tasks === true ? "active" : ""
                  } w-1/2 smallHeader text-2xl font-bold rounded-btn mx-10 px-10  `}
                  onClick={onClick4}
                >
                  Tasks
                </button>
              </div>
            </div>
          </div> */}
          <UserPage userAddress={userAddress} />
        </>
      ) : (
        <div className="content mx-20 pb-10">
          <div className="pb-10">
            <Headlines text="My Account :" content={`${userAddress}`} />
            <div className="flex justify-center align-center mt-3">
              <button
                className={`btn btn-outline btn-primary btn-${
                  listing === true ? "active" : ""
                } w-1/2 ${listing === true ? "text-white" : ""}`}
                onClick={onClick}
              >
                Listings
              </button>
              <button
                className={`btn btn-outline btn-primary btn-${
                  transactions === true ? "active" : ""
                } w-1/2  `}
                onClick={onClick2}
              >
                Transactions
              </button>
            </div>
          </div>
          {/* ADD TOGGLE FOR SERVICES AND TASKS INSTEAD OF BUTTONS */}
          <TransactionsTable />
        </div>
      )}
    </>
  );
}

export default NewTransactions;
