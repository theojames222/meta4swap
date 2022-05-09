import eth from "../assets/Ethereum-Symbol.png";
import { FaStar } from "react-icons/fa";
import StarRating from "../actions/StarRating";

function Product() {
  const ethSym = <img className="eth" src={eth} alt="eth" />;
  return (
    <>
      <div>
        <h2 className="text-xl font-bold ml-5">Creator address/ user name</h2>
      </div>
      <div className="hero min-h-screen ">
        <div className="hero-content flex-col lg:flex-row">
          <img
            src="https://api.lorem.space/image/shoes?w=400&h=225"
            alt="product"
          />
          <div className="card-body items-center text-center">
            <h1 className="text-5xl font-bold items-center">Product Name</h1>
            <div>
              <p className="text-2xl font-bold items-center py-3">Ratings</p>
              <StarRating />
            </div>
            <p className="text-3xl font-bold mr-3 py-3"> $222 USD</p>
            <div
              className="flex"
              style={{
                justifyContent: "space-evenly",
              }}
            >
              <p className="text-2xl pb-8 ">(.075 {ethSym})</p>
            </div>
            <button className="btnBuy btn-primary text-white text-2xl font-bold">
              Buy Now!
            </button>
            <h2 className="pt-6 text-xl font-bold ">Product Description</h2>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;
