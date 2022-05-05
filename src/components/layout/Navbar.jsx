import { Link } from "react-router-dom";
import Meta4Swap from "../assets/Meta4SwapNB.png";
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
          <Link to="/" className="flex  ">
            <img src={Meta4Swap} alt="" className="logo" />
          </Link>
          <div>
            <div>
              <Link
                to="/shop"
                className="navShop text-2xl font-bold rounded-btn mr-12"
              >
                Shop
              </Link>
            </div>
            <div>
              <Link
                to="/create"
                className="navShop text-2xl font-bold rounded-btn mr-12"
              >
                Create
              </Link>
            </div>
          </div>
          <button
            className="btnConnect text-white text-xl "
            onClick={btnhandler}
          >
            Connect
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
