import { Link } from "react-router-dom";
import Meta4Swap from "../assets/Meta4SwapNB.png";
import useWindowDimensions from "../hooks/useWindowDimensions";
import Logo from "../assets/logo2.png";

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
    // <div className="flex">
    <nav className="navbar mb-0 shadow-lg  " width={width}>
      <Link to="/" className="flex ml-5 ">
        <img src={Logo} alt="" className="logo" />
      </Link>
      <div className="nav2">
        <button className="btn btn-ghost">
          <Link
            to="/shop"
            className="navShop text-2xl font-bold rounded-btn mr-12"
          >
            Shop
          </Link>
        </button>
        <button className="btn btn-ghost">
          <Link
            to="/create"
            className="navShop text-2xl font-bold rounded-btn mr-12"
          >
            Create
          </Link>
        </button>
        <button
          className="btnConnect text-white text-2xl mr-2"
          onClick={btnhandler}
        >
          Connect
        </button>
      </div>
    </nav>
    // </div>
  );
}

export default Navbar;
