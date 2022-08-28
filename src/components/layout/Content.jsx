import form from "../assets/PinClipart.com_jobs-clipart_5272372.png";
import market from "../assets/pngegg.png";
import wallet from "../assets/wallet.png";
import payment from "../assets/payment.png";
import Headlines from "./Headlines";

function Content() {
  const contentsArr = [
    {
      icon: form,
      header: "Create Listing",
      content: `Use Meta4Swap create form to immediately list freelance
  services or create a task to find talent for your next project right on Ethereum!`,
    },
    {
      icon: market,
      header: "Shop Freelance Services",
      content: ` Shop Meta4Swap platform to find talent w/services priced in USD and pay in USD or ETH. Freelancers can shop tasks to get paid in USD or ETH`,
    },
    {
      icon: wallet,
      header: "Connect Wallet",
      content: `Effortlessly connect your Metamask wallet or Coinbase wallet and purchase services in one transaction! No approval transactions needed.`,
    },
    {
      icon: payment,
      header: "Fast & Effortless Transaction",
      content: ` Your money is protected and held in escrow until the order is completed. Dispute transactions if unhappy with the order.`,
    },
  ];
  return (
    <div className="category">
      <Headlines
        text="Meta4Swap Benefits"
        content="Effortlessly find talent, create and list freelance services on the Blockchain"
      />

      <>
        <div
          className="container items-center mx-auto justify-center "
          style={{
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 ">
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
  );
}

export default Content;
