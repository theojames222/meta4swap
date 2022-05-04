import { Link } from "react-router-dom";
import Meta4Swap from "../assets/Meta4Swap.png";
import useWindowDimensions from "../hooks/useWindowDimensions";

function Navbar() {
  const { height, width } = useWindowDimensions();
  // Button handler button for handling a
  // request event for metamask
  const btnhandler = () => {
    // Asking if metamask is already present or not
    if (window.ethereum) {
      // res[0] for fetching a first wallet
      window.ethereum.request({ method: "eth_requestAccounts" });
    } else {
      alert("install metamask extension!!");
    }
  };

  return (
    <div className="flex">
      <nav className="navbar mb-0 shadow-lg" width={width}>
        <div className="container mx-auto">
          <Link to="/" className="flex px-2 mx-2 ">
            <img src={Meta4Swap} alt="" className="logo" />
            {/* <Link to="/" className="text-lg font-bold align-middle">
      {title}
    </Link> */}
          </Link>
          <nav className="nav2">
            <div className="nav2">
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
              <nav className="navbar-end">
                <button
                  className="btnConnect text-white text-xl flex-end"
                  onClick={btnhandler}
                >
                  Connect
                </button>
              </nav>
            </div>
          </nav>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
