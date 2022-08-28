import React from "react";
// import Image1 from "../assets/5402207.jpg";
import Image2 from "../assets/6229495.jpg";

import { Link } from "react-router-dom";

function NewHero() {
  return (
    <div className="hero h-84 align-center w-auto mx-10 bg-primary-content ">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img
          src={Image2}
          alt="hero"
          className="max-w-lg rounded-lg shadow-2xl"
        />
        <div>
          <h1 className=" homeHeader text-5xl font-bold pb-5">
            Freelance with Meta4Swap
          </h1>
          <div className="list-disc pb-5 mx-4">
            <li> Want to list your freelancing services?</li>
            <li> Need to find talent for your next project?</li>
            <li> Want to pay and/or get paid in cryptocurrency?</li>
            <li>
              All using safe, secure and transparent transactions directly on
              the blockchain?
            </li>
          </div>
          <p className="pb-5 mx-4 font-bold">
            Try out Meta4Swap and get started!
          </p>
          <Link to="/create">
            <button className="btn btn-primary mx-4">Create Listing</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NewHero;
