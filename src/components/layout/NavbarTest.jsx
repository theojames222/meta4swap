import { Link } from "react-router-dom";
// import Logo from "../assets/logo2.png";
import { useNavigate } from "react-router-dom";
import accountIcon from "../assets/user-286 (1).svg";
import NewLogo from "../assets/New Logo.png";

function NavbarTest({ connected, userAddress, childToParent, data }) {
  const isConnected = connected;
  const navigate = useNavigate();
  const reloadPage = () => {
    window.location.reload();
  };

  const btnhandler = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          if (result[0] !== "") {
            console.log(result[0]);
            childToParent(true, result[0]);
            //reloadPage();
          } else {
            alert("Sign into MetaMask to create and buy with Meta4Swap");
          }
        })
        .then(userAddress !== "" ? reloadPage() : "");
    } else {
      alert("install metamask extension!!");
    }
  };
  const btnhandler2 = () => {
    window.data = false;
    childToParent(false, "");
    navigate("/");
  };

  return (
    <header className="flex flex-col">
      <nav className="fixed z-50 w-full bg-white top-0 flex flex-wrap items-center justify-between px-2 py-3 shadow-lg">
        <Link to="/" className="flex ml-5 ">
          <img src={NewLogo} alt="" className="logo" />
        </Link>

        <div className="nav2 ">
          <div className="dropdown dropdown-hover">
            <button className="btn btn-link  ">
              <Link
                to="/services"
                className="navShop text-2xl font-bold rounded-btn mr-12 "
              >
                Services
              </Link>
            </button>
          </div>
          <button className="btn btn-link">
            <Link
              to="/tasks"
              className="navShop text-2xl font-bold rounded-btn mr-12"
            >
              Tasks
            </Link>
          </button>
          <button className="btn btn-link">
            <Link
              to="/create"
              className="navShop text-2xl font-bold rounded-btn mr-12"
            >
              Create
            </Link>
          </button>

          {isConnected && data ? (
            <Link to={`/account/${userAddress}`}>
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
          {data ? (
            <button
              className="btnConnect text-white text-2xl mr-2"
              onClick={btnhandler2}
            >
              Disconnect
            </button>
          ) : (
            ""
          )}
        </div>
      </nav>
    </header>
  );
}

export default NavbarTest;
