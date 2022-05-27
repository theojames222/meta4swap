import useWindowDimensions from "../hooks/useWindowDimensions";
import form from "../assets/PinClipart.com_jobs-clipart_5272372.png";
import market from "../assets/pngegg.png";
import wallet from "../assets/wallet.png";
import payment from "../assets/payment.png";
import Headlines from "./Headlines";

function Content() {
  const { height, width } = useWindowDimensions();
  return (
    <>
      <Headlines
        text="Meta4Swap Benefits"
        content="Effortlessly Buy and Sell products and services on the Blockchain"
      />
      <div
        className="grid grid-cols-1 gap-3 xl:grid-cols-4 lg-grid-cols-4 md:grid-cols-2 "
        style={{
          display: "flex",
          alignItems: "center",
          width: { width },
          justifyContent: "space-evenly",
        }}
      >
        <div className="card text-primary items-center">
          <div className="card-body justify-center items-center text-center">
            <img className="icon pl-4" src={form} alt="form" />
            <div className="card-actions justify-center">
              <h1 className="infoHeader"> Create Listing</h1>
              <p className="infoContent">
                {" "}
                Use the Meta4Swap create form to immediately list goods and
                services on the blockchain!
              </p>
            </div>
          </div>
        </div>
        <div className="card text-primary items-center">
          <div className="card-body justify-center items-center text-center">
            <img className="icon pl-4" src={market} alt="market" />
            <div className="card-actions justify-center">
              <h1 className="infoHeader"> Shop Products & Services</h1>
              <p className="infoContent">
                {" "}
                Shop the Meta4Swap Marketplace to find the right product or
                service that meets your current needs!
              </p>
            </div>
          </div>
        </div>
        <div className="card text-primary items-center">
          <div className="card-body justify-center items-center text-center">
            <img className="icon pl-4" src={wallet} alt="wallet" />
            <div className="card-actions justify-center">
              <h1 className="infoHeader"> Connect Wallet</h1>
              <p className="infoContent">
                {" "}
                Effortlessly connect your Metamask wallet to purchase products
                and services from the blockchain!
              </p>
            </div>
          </div>
        </div>
        <div className="card  text-primary items-center">
          <div className="card-body justify-center items-center text-center">
            <img className="icon pl-4" src={payment} alt="payment" />
            <div className="card-actions justify-center">
              <h1 className="infoHeader"> Fast & Effortless Transaction</h1>
              <p className="infoContent">
                {" "}
                Just two short clicks away from transparent purchases on the
                Polygon network with Matic!
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Content;
