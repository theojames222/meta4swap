import { Link } from "react-router-dom";
import Meta4Swap from "../assets/Meta4Swap.png";

function Navbar() {
  return (
    <nav className="navbar mb-12 shadow-lg">
      <div className="container">
        <Link to="/" className="flex-none px-2 mx-2 ">
          <img src={Meta4Swap} alt="" className="inline text-3xl" />
          {/* <Link to="/" className="text-lg font-bold align-middle">
      {title}
    </Link> */}
        </Link>
        <nav className="navRight">
          <div className="flex ">
            <Link
              to="/shop"
              className="navShop btn btn-ghost btn-lg text-xl rounded-btn mr-12"
            >
              Shop
            </Link>
            <Link
              to="/create"
              className="navShop btn btn-ghost btn-lg text-xl rounded-btn mr-12"
            >
              Create
            </Link>
            <nav className="flex mt-1">
              <button className="btnConnect text-white text-xl ">
                Connect
              </button>
            </nav>
          </div>
        </nav>
      </div>
    </nav>
  );
}

export default Navbar;
