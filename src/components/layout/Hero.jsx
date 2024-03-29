import React from "react";
import background from "../assets/Hero2.png";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { Link } from "react-router-dom";

function Hero() {
  const width = useWindowDimensions();
  return (
    <div
      className="hero h-96 align-center w-auto mx-10"
      style={{ backgroundImage: `url(${background})` }}
      width={width}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 mt-6 text-3xl font-bold">
            List your services or need talent for your next project?
          </h1>
          <p className="mb-5">
            Pay and get paid for freelancing directly on Blockchain!
          </p>
          <Link to="/create">
            <button className="btn btn-primary">Create Listing</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Hero;
