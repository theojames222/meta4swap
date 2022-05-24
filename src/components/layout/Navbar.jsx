import { Link } from "react-router-dom";
import useWindowDimensions from "../hooks/useWindowDimensions";
import Logo from "../assets/logo2.png";
import accountIcon from "../assets/user-286 (1).svg";
// import { useParams } from "react-router-dom";

function Navbar({ connected, userAddress }) {
  // eslint-disable-next-line no-unused-vars
  const { height, width } = useWindowDimensions();
  // const params = useParams();

  const isConnected = connected;
  const reloadPage = () => {
    window.location.reload();
  };
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
    setTimeout(reloadPage, 10000);
  };

  return (
    // <div className="">
    <nav className="navbar mb-0 shadow-lg " width={width}>
      <Link to="/" className="flex ml-5 ">
        <img src={Logo} alt="" className="logo" />
      </Link>

      <div className="nav2">
        <div className="dropdown dropdown-hover">
          <button className="btn btn-link ">
            <Link
              to="/shop"
              className="navShop text-2xl font-bold rounded-btn mr-12"
            >
              Shop
            </Link>
          </button>
          <ul
            tabindex="0"
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a href="/category/product">Products</a>
            </li>
            <li>
              <a href="/category/service">Services</a>
            </li>
            <li>
              <Link to="/shop">Shop All</Link>
            </li>
          </ul>
        </div>
        <button className="btn btn-link">
          <Link
            to="/create"
            className="navShop text-2xl font-bold rounded-btn mr-12"
          >
            Create
          </Link>
        </button>
        {isConnected ? (
          <Link to={`/user/${userAddress}`}>
            {" "}
            <img src={accountIcon} alt="account" className="accountIcon" />
          </Link>
        ) : (
          <button
            className="btnConnect text-white text-2xl mr-2"
            onClick={btnhandler}
          >
            Connect
          </button>
        )}
      </div>
    </nav>
    // </div>
  );
}

export default Navbar;
