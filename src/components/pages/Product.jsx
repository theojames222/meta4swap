import eth from "../assets/Ethereum-Symbol.png";
// import { FaStar } from "react-icons/fa";
import StarRating from "../actions/StarRating";
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase.config";
import shareIcon from "../assets/shareIcon.svg";

function Product() {
  const ethSym = <img className="eth" src={eth} alt="eth" />;
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, "listings", params.listingId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log(docSnap.data());
        setListing(docSnap.data());
        setLoading(false);
      }
    };

    fetchListing();
  }, [navigate, params.listingId]);

  const buyNow = () => {
    console.log("Buy Now");
  };

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <div>
            <Link to={`/user/${listing.id}`}>
              <h2 className="text-xl font-bold ml-5 pt-4">
                {`Creator : ${listing.id.substring(
                  0,
                  5
                )}...${listing.id.substring(listing.id.length - 4)}`}
              </h2>
            </Link>
          </div>
          <div className="hero min-h-screen ">
            <div className="hero-content flex-col lg:flex-row">
              <img src={listing.imageUrl} alt="product" />
              <div className="card-body items-center text-center">
                <h1 className="text-5xl font-bold items-center">
                  {listing.productName}
                </h1>
                <div>
                  <p className="text-2xl items-center py-3">Ratings</p>
                  <StarRating />
                </div>
                <p className="text-3xl font-bold mr-3 py-3">{`${
                  listing.priceUnit === "USD" ? "$" : "€"
                }${listing.price} ${listing.priceUnit}`}</p>
                <div
                  className="flex"
                  style={{
                    justifyContent: "space-evenly",
                  }}
                >
                  <p className="text-2xl pb-8 ">(.075 {ethSym})</p>
                </div>
                <button
                  className="btnBuy btn-primary text-white text-2xl font-bold"
                  onClick={buyNow}
                >
                  Buy Now!
                </button>
                <h2 className="pt-6 text-xl font-bold ">Product Description</h2>
                <p className="py-6">{listing.description}</p>
              </div>
            </div>
          </div>
          )
        </>
      )}
    </>
  );
}

export default Product;
