import StarRating from "../actions/StarRating";
function ServicePage() {
  return (
    <>
      <div>
        <div
          className="container items-center mx-auto justify-center"
          style={{
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <div className="grid grid-cols-3 gap-10 mx-auto px-10 h-screen">
            <div class=" overscroll-contain overflow-x-auto col-span-2">
              <div className="container pb-5">
                <h2 className="smallHeader text-xl">{`Service Name:`}</h2>
                <h3 className="text-xl">{`Name of Service`}</h3>
              </div>
              <div className="container pb-5">
                <h2 className="smallHeader">{`Creator: `}</h2>
                <h3>{`0xA209d66169840b201e56a80a2C73EB6d0427575d`}</h3>
              </div>
              <div className="container flex pb-5">
                <div className="pr-10">
                  <h2 className="smallHeader justify-center align-center">{`Status:`}</h2>
                  <h3 className="justify-center align-center item-center">
                    {" "}
                    {`Open/Closed`}
                  </h3>
                </div>
                <div className="pr-10">
                  <h2 className="smallHeader">{`ETA Days`}</h2>
                  <h3> 10</h3>
                </div>
                <div className="">
                  <h2 className="smallHeader">{`Date Posted`}</h2>
                  <h3> 02/22/22</h3>
                </div>
              </div>

              <h2 className="smallHeader">{`Service Description`}</h2>
              <p className="Description w-3/4">
                {" "}
                {`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt aliqua consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt aliqua consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt aliqua consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. `}
              </p>
            </div>

            <div className="fixed right-0 mr-10">
              <div className="card w-96 bg-base-100 shadow-xl ">
                {/* <figure>
                  <img src="https://placeimg.com/400/225/arch" alt="Shoes" />
                </figure> */}
                <div className="card-body">
                  <h2
                    className="card-title text-2xl justify-center pb-5"
                    style={{ color: "gray" }}
                  >
                    Name of service
                  </h2>
                  <h2 className="card-title text-2xl justify-center pb-2 ">
                    Price:
                  </h2>
                  <h2 className="card-title text-3xl font-bold justify-center pb-5">
                    $222
                  </h2>
                  <div className="card-actions justify-center">
                    <button className="btn btn-primary">Buy Now</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ServicePage;
