import eth from "../assets/Ethereum-Symbol.png";
// import { FaStar } from "react-icons/fa";
import StarRating from "../actions/StarRating";
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase.config";
// import shareIcon from "../assets/shareIcon.svg";
import m4sAbi from "../abi/m4s_abi.json";
import Web3 from "web3/dist/web3.min.js";
// import { ethers } from "ethers";
import { v4 as uuidv4 } from "uuid";

const Moralis = require("moralis");

function Product({ userAddress }) {
  const ethSym = <img className="eth" src={eth} alt="eth" />;
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [shareLinkCopied, setShareLinkCopied] = useState(false);
  const [quantity, setQuantity] = useState({ quantity: 1 });
  const [listingData, setListingData] = useState({});

  const navigate = useNavigate();
  const params = useParams();
  let itemId = params.listingId;

  useEffect(() => {
    console.log(`quantity: ${quantity}`);
    // const fetchListing = async () => {
    //   const docRef = doc(db, "listings", params.listingId);
    //   const docSnap = await getDoc(docRef);

    //   if (docSnap.exists()) {
    //     console.log(docSnap.data());

    //     setListing(docSnap.data());
    //   }
    // };

    const fetchEthPrice = async () => {
      const web3 = new Web3(
        new Web3.providers.HttpProvider(
          "https://rinkeby.infura.io/v3/18c3956af9734c289bfed9eee03ee1a7"
        )
      );
      const M4SContract = new web3.eth.Contract(
        m4sAbi,
        "0x0680A9396b1d54D1b2D393580E1B4BDB20f4D2F8"
      );

      const ethPrice = await M4SContract.methods.getLatestPrice().call();

      console.log(ethPrice);
      window.ethPrice = ethPrice;
      // setLoading(false);
    };

    // const getUserItems = async () => {
    //   const serverUrl = "https://gu15uqsbipep.usemoralis.com:2053/server";
    //   const appId = "F28xSksEmA0YDFTQskgodpG3W5JSZK0uBm9Abnde";
    //   const masterKey = "G5799rbYbzVEjmd9B2tFNfgX184JryV3ntW283dy";
    //   await Moralis.start({ serverUrl, appId, masterKey });
    //   const Item = Moralis.Object.extend("ItemCreated");
    //   const query = new Moralis.Query(Item);
    //   //replace my address with user's address
    //   query.equalTo("creator", "0x5f5b7c5c23f2826b0fdc25d21944bceaf146fd78");
    //   const results = await query.find();
    //   console.log(results.length);
    //   for (let i = 0; i < results.length; i++) {
    //     const object = results[i];
    //     console.log(object.get("metadata"));
    //     console.log(object.get("itemId"));
    //     const ipfsURL =
    //       "https://ipfs.infura.io/ipfs/QmcGaApMPcm7PPGNtFQYmdiNKkpANitFc1VTPStkQp843x";
    //     fetch(ipfsURL)
    //       .then((response) => response.json())
    //       .then((data) => console.log("This is your data: ", data));
    //   }
    // };

    // const getProducts = async () => {
    //   const serverUrl = "https://gu15uqsbipep.usemoralis.com:2053/server";
    //   const appId = "F28xSksEmA0YDFTQskgodpG3W5JSZK0uBm9Abnde";
    //   const masterKey = "G5799rbYbzVEjmd9B2tFNfgX184JryV3ntW283dy";
    //   await Moralis.start({ serverUrl, appId, masterKey });
    //   const Item = Moralis.Object.extend("ItemCreated");
    //   const query = new Moralis.Query(Item);
    //   query.equalTo("productType", "0");
    //   const results = await query.find();
    //   console.log(results.length);
    //   for (let i = 0; i < results.length; i++) {
    //     const object = results[i];
    //     console.log(object.get("metadata"));
    //     console.log(object.get("itemId"));
    //   }
    // };

    // const getServices = async () => {
    //   const serverUrl = "https://gu15uqsbipep.usemoralis.com:2053/server";
    //   const appId = "F28xSksEmA0YDFTQskgodpG3W5JSZK0uBm9Abnde";
    //   const masterKey = "G5799rbYbzVEjmd9B2tFNfgX184JryV3ntW283dy";
    //   await Moralis.start({ serverUrl, appId, masterKey });
    //   const Item = Moralis.Object.extend("ItemCreated");
    //   const query = new Moralis.Query(Item);
    //   query.equalTo("productType", "1");
    //   const results = await query.find();
    //   console.log(results.length);
    //   for (let i = 0; i < results.length; i++) {
    //     const object = results[i];
    //     console.log(object.get("metadata"));
    //     console.log(object.get("itemId"));
    //   }
    // };

    // const getAllItems = async () => {
    //   const serverUrl = "https://gu15uqsbipep.usemoralis.com:2053/server";
    //   const appId = "F28xSksEmA0YDFTQskgodpG3W5JSZK0uBm9Abnde";
    //   const masterKey = "G5799rbYbzVEjmd9B2tFNfgX184JryV3ntW283dy";
    //   await Moralis.start({ serverUrl, appId, masterKey });
    //   const Item = Moralis.Object.extend("ItemCreated");
    //   const query = new Moralis.Query(Item);
    //   const results = await query.find();
    //   console.log(results.length);
    //   for (let i = 0; i < results.length; i++) {
    //     const object = results[i];
    //     console.log(object.get("metadata"));
    //     console.log(object.get("itemId"));
    //   }
    // };

    const getItem = async () => {
      // const itemId = 1;
      const web3 = new Web3(
        new Web3.providers.HttpProvider(
          "https://rinkeby.infura.io/v3/18c3956af9734c289bfed9eee03ee1a7"
        )
      );
      const M4SContract = new web3.eth.Contract(
        m4sAbi,
        "0x0680A9396b1d54D1b2D393580E1B4BDB20f4D2F8"
      );
      //const itemId = 1;
      // const itemInfo = await M4SContract.methods
      // .itemInfo(window.itemId)
      // .call();

      // console.log(itemInfo['id']);
      // console.log(itemInfo['metadata']);
      // fetch(itemInfo['metadata'])
      //     .then((response) => response.json())
      //     .then((data) => console.log("This is your data: ", data));

      const itemInfo = await M4SContract.methods.itemInfo(itemId).call();

      console.log(itemInfo["id"]);
      console.log(itemInfo["metadata"]);
      fetch(itemInfo["metadata"])
        .then((response) => response.json())
        .then((data) => {
          setListingData(data);
          setLoading(false);
        });
      // setLoading(false);
    };

    // const getOrdersBuyer = async () => {
    //   const serverUrl = "https://gu15uqsbipep.usemoralis.com:2053/server";
    //   const appId = "F28xSksEmA0YDFTQskgodpG3W5JSZK0uBm9Abnde";
    //   const masterKey = "G5799rbYbzVEjmd9B2tFNfgX184JryV3ntW283dy";
    //   await Moralis.start({ serverUrl, appId, masterKey });
    //   const Item = Moralis.Object.extend("OrderCreatedBuyer");
    //   const query = new Moralis.Query(Item);
    //   //replace my address with user's address
    //   const user = "0x5f5b7c5c23f2826b0fdc25d21944bceaf146fd78";
    //   query.equalTo("buyer", user);
    //   const results = await query.find();
    //   console.log(results.length);
    //   for (let i = 0; i < results.length; i++) {
    //     const object = results[i];
    //     console.log(object.get("orderId"));
    //     console.log(object.get("itemId"));
    //     console.log(object.get("price"));
    //   }
    // };

    // const getOrdersSeller = async () => {
    //   const serverUrl = "https://gu15uqsbipep.usemoralis.com:2053/server";
    //   const appId = "F28xSksEmA0YDFTQskgodpG3W5JSZK0uBm9Abnde";
    //   const masterKey = "G5799rbYbzVEjmd9B2tFNfgX184JryV3ntW283dy";
    //   await Moralis.start({ serverUrl, appId, masterKey });
    //   const Item = Moralis.Object.extend("OrderCreatedSeller");
    //   const query = new Moralis.Query(Item);
    //   //replace my address with user's address
    //   const user = "0x5f5b7c5c23f2826b0fdc25d21944bceaf146fd78";
    //   query.equalTo("seller", user);
    //   const results = await query.find();
    //   console.log(results.length);
    //   for (let i = 0; i < results.length; i++) {
    //     const object = results[i];
    //     console.log(object.get("orderId"));
    //     console.log(object.get("itemId"));
    //     console.log(object.get("price"));
    //   }
    // };

    // fetchListing();
    fetchEthPrice();
    // getUserItems();
    // getProducts();
    // getServices();
    getItem();
    // getOrdersSeller();
    // getOrdersBuyer();
    // getAllItems();
  }, [navigate, params.listingId]);

  const onChange = (e) => {
    setQuantity(() => ({
      [e.target.id]: e.target.value,
    }));
  };
  const buyNow = async (e) => {
    console.log(quantity["quantity"]);
    e.preventDefault();
    const web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    var account = accounts[0];

    const M4SContract = new web3.eth.Contract(
      m4sAbi,
      "0x0680A9396b1d54D1b2D393580E1B4BDB20f4D2F8",
      {
        from: account,
      }
    );

    //const itemId = 1;
    //console.log((price));
    //console.log((window.ethPrice));
    const orderPrice =
      ((listingData.price * 10 ** 18) / window.ethPrice) *
      10 ** 8 *
      quantity["quantity"];
    const slippage = (orderPrice * 100) / 10000;

    console.log(orderPrice);
    //UI eth price for Theo
    console.log(orderPrice / 10 ** 18);

    M4SContract.methods.createOrder(itemId, quantity["quantity"]).send({
      from: account,
      value: orderPrice + slippage,
    });
  };

  // const onClick = async (e) => {
  //   e.preventDefault();
  //   const transactionId = uuidv4();
  //   const orderPrice = ((listing.price * 10 ** 18) / window.ethPrice) * 10 ** 8;
  //   const transaction = {
  //     order: transactionId,
  //     buyer: userAddress,
  //     seller: listing.id,
  //     listing: params.listingId,
  //     status: "active",
  //     price: listing.price,
  //     orderPrice: orderPrice,
  //   };
  //   try {
  //     await setDoc(doc(db, "transactions", transactionId), transaction);
  //   } catch (error) {
  //     console.log("unable to upload");
  //   }

  //   console.log(userAddress);
  //   console.log(listing.id);
  //   console.log(params.listingId);
  // };

  // const uploadText = async (e) => {
  //   e.preventDefault();
  //   const docId = uuidv4();
  //   try {
  //     const added = await client.add(metaDataJSONString);
  //     const url = `https://ipfs.infura.io/ipfs/${added.path}`;
  //     setMetaDataUrl(url);
  //     console.log(metaDataUrl);
  //     setUploaded(true);
  //     console.log(uploaded);
  //     setPrice(metaData.price);
  //     setLive(true);
  //     if (metaData.category === "service") {
  //       setProductType(1);
  //     }
  //     setbtnDisabled(false);
  //     await setDoc(doc(db, "listings", docId), metaData);
  //   } catch (err) {
  //     console.log("Error uploading the file : ", err);
  //   }
  // };
  console.log(listingData);
  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <div>
            <Link to={`/user/${listingData.id}`}>
              <h2 className="text-xl font-bold ml-5 pt-4">
                {`Creator : ${listingData.id.substring(
                  0,
                  5
                )}...${listingData.id.substring(listingData.id.length - 4)}`}
              </h2>
            </Link>
          </div>
          <div className="hero min-h-screen ">
            <div className="hero-content px-auto productImg flex-col lg:flex-row">
              <img src={listingData.imageUrl} alt="product" />
              <div className="card-body mx-20 pl-20 items-center text-center">
                <h1 className="text-5xl font-bold items-center">
                  {listingData.productName}
                </h1>
                <div>
                  <p className="text-2xl items-center py-3">Ratings</p>
                  <StarRating />
                </div>
                <p className="text-3xl font-bold mr-3 py-3">{`${
                  listingData.priceUnit === "USD" ? "$" : "€"
                }${listingData.price} ${listingData.priceUnit}`}</p>
                <div
                  className="flex"
                  style={{
                    justifyContent: "space-evenly",
                  }}
                >
                  <p className="text-2xl pb-8 ">
                    (
                    {(
                      (((listingData.price * 10 ** 18) / window.ethPrice) *
                        10 ** 8) /
                      10 ** 18
                    ).toFixed(3)}
                    {ethSym})
                  </p>
                </div>
                <div
                  className="flex"
                  style={{
                    justifyContent: "space-evenly",
                  }}
                >
                  <select
                    className="select select-ghost max-w-xs"
                    onChange={onChange}
                    id="quantity"
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                  </select>
                </div>
                <button
                  className="btnBuy btn-primary text-white text-2xl font-bold"
                  onClick={buyNow}
                >
                  Buy Now!
                </button>
                <h2 className="pt-6 text-xl font-bold ">Product Description</h2>
                <p className="py-6">{listingData.description}</p>
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
