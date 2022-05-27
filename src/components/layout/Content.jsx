import useWindowDimensions from "../hooks/useWindowDimensions";
import form from "../assets/PinClipart.com_jobs-clipart_5272372.png";
import market from "../assets/pngegg.png";
import wallet from "../assets/wallet.png";
import payment from "../assets/payment.png";
import Headlines from "./Headlines";

function Content() {
  const { height, width } = useWindowDimensions();
  const contentsArr = [
    {
      icon: form,
      header: "Create Listing",
      content: `Use Meta4Swap create form to immediately list goods and
  services on the Avalanche`,
    },
    {
      icon: market,
      header: "Shop Products & Services",
      content: ` Shop the Meta4Swap Marketplace to find the right product or
  service that meets your current needs and pay with AVAX`,
    },
    {
      icon: wallet,
      header: "Connect Wallet",
      content: `Effortlessly connect your Metamask wallet to purchase products
  and services from the blockchain!`,
    },
    {
      icon: payment,
      header: "Fast & Effortless Transaction",
      content: ` Just two short clicks away from transparent purchases on the
  Avalanche network with AVAX.`,
    },
  ];
  return (
    <div className="category">
      <Headlines
        text="Meta4Swap Benefits"
        content="Effortlessly Buy and Sell products and services on the Blockchain"
      />

      <>
        <div
          className="container "
          style={{
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 ">
            {contentsArr.map((card) => (
              <div className="card text-primary items-center">
                <div className="card-body justify-center items-center text-center">
                  <img className="icon pl-4" src={card.icon} alt="form" />
                  <div className="card-actions justify-center">
                    <h1 className="infoHeader"> {card.header}</h1>
                    <p className="infoContent"> {card.content}</p>
                  </div>
                </div>
              </div>
            ))}{" "}
          </div>
        </div>
      </>
    </div>
    // <>
    //   <Headlines
    //     text="Meta4Swap Benefits"
    //     content="Effortlessly Buy and Sell products and services on the Blockchain"
    //   />
    //    <div
    //         className="container "
    //         style={{
    //           alignItems: "center",
    //           justifyContent: "space-evenly",
    //         }}
    //       >
    //         <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 ">
    //     {/* {contentsArr.map((card) => (
    //       <div className="card text-primary items-center">
    //         <div className="card-body justify-center items-center text-center">
    //           <img className="icon pl-4" src={card.icon} alt="form" />
    //           <div className="card-actions justify-center">
    //             <h1 className="infoHeader"> {card.header}</h1>
    //             <p className="infoContent"> {card.content}</p>
    //           </div>
    //         </div>
    //       </div>
    //     ))} */}
    //     {/* <div className="card text-primary items-center">
    //       <div className="card-body justify-center items-center text-center">
    //         <img className="icon pl-4" src={form} alt="form" />
    //         <div className="card-actions justify-center">
    //           <h1 className="infoHeader"> Create Listing</h1>
    //           <p className="infoContent">
    //             {" "}
    //             Use the Meta4Swap create form to immediately list goods and
    //             services on the blockchain!
    //           </p>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="card text-primary items-center">
    //       <div className="card-body justify-center items-center text-center">
    //         <img className="icon pl-4" src={market} alt="market" />
    //         <div className="card-actions justify-center">
    //           <h1 className="infoHeader"> Shop Products & Services</h1>
    //           <p className="infoContent">
    //             {" "}
    //             Shop the Meta4Swap Marketplace to find the right product or
    //             service that meets your current needs!
    //           </p>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="card text-primary items-center">
    //       <div className="card-body justify-center items-center text-center">
    //         <img className="icon pl-4" src={wallet} alt="wallet" />
    //         <div className="card-actions justify-center">
    //           <h1 className="infoHeader"> Connect Wallet</h1>
    //           <p className="infoContent">
    //             {" "}
    //             Effortlessly connect your Metamask wallet to purchase products
    //             and services from the blockchain!
    //           </p>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="card  text-primary items-center">
    //       <div className="card-body justify-center items-center text-center">
    //         <img className="icon pl-4" src={payment} alt="payment" />
    //         <div className="card-actions justify-center">
    //           <h1 className="infoHeader"> Fast & Effortless Transaction</h1>
    //           <p className="infoContent">
    //             {" "}
    //             Just two short clicks away from transparent purchases on the
    //             Polygon network with Matic!
    //           </p>
    //         </div>
    //       </div>
    //     </div> */}
    //   </div>
    // </>
  );
}

export default Content;
