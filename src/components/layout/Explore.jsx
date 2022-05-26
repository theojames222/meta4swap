import { Link } from "react-router-dom";
import productCategoryImage from "../assets/productsCategoryImage.jpg";
import servicesCategoryImage from "../assets/servicesCategoryImage.jpg";
import Headlines from "./Headlines";
import useWindowDimensions from "../hooks/useWindowDimensions";

function Explore() {
  // eslint-disable-next-line no-unused-vars
  const { height, width } = useWindowDimensions();
  return (
    <>
      <div>
        <Headlines text="Shop" content="Categories" />
        <div className="flex  justify-center pt-5" height={height}>
          {/* <div className="exploreCategories">
            <Link to="/category/products">
              <img
                src={productCategoryImage}
                alt="products"
                className="categoryImg"
              />
            </Link>

            <div className="card-body">
              <h1 className="card-title">Products</h1>
            </div>
          </div> */}
          <Link className="flex px-10" to="/home">
            <div className="card w-full bg-base-100 shadow-xl image-full mx-auto">
              <figure className="">
                <img src={productCategoryImage} alt="Img" />
              </figure>
              <div className=" flex card-body justify-center ">
                <h1 className="card-title justify-center text-3xl">Products</h1>
              </div>
            </div>
          </Link>
          <Link className="flex px-10" to="/home">
            <div className="card w-full bg-base-200 shadow-xl image-full mx-auto ">
              <figure className="">
                <img src={servicesCategoryImage} alt="Img" />
              </figure>
              <div className="card-body justify-center">
                <h1 className="card-title justify-center text-3xl">Services</h1>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Explore;
