import React from "react";
import Headlines from "./Headlines";
import ItemCard from "./ItemCard";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { Link } from "react-router-dom";

function FeaturedProduct() {
  const { height, width } = useWindowDimensions();
  return (
    <>
      <Headlines text="Featured Products" content="Latest products" />
      <Link to="/product">
        <div
          className="container items-center mx-auto "
          style={{
            display: "flex",
            alignItems: "center",
            width: { width },
            justifyContent: "space-between",
          }}
        >
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
        </div>
      </Link>
    </>
  );
}

export default FeaturedProduct;
