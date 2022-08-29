import { useState } from "react";

import { create } from "ipfs-http-client";
import m4sAbi from "../abi/m4s_abi.json";
import Web3 from "web3/dist/web3.min.js";

import { Buffer } from "buffer";

const projectId = "2DSQcwzwT76SmNIGvQhj2xU1lVW";
const projectSecret = "214d0b37f4845f97cbdf513eee8248ff";
const auth =
  "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

const client = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});
const abi = m4sAbi;
export const JsonUpload = ({
  disabled,
  metaData2,
  whatsapp,

  id,
  userAddress,
  hidden,
}) => {
  const metaData = {
    id: id,
    ...metaData2,
    whatsapp: whatsapp,

    date: new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(Date.now()),
  };

  if (metaData.whatsapp !== undefined || null) {
    metaData.whatsapp = `https://wa.me/${metaData.whatsapp.slice(1)}`;
  }
  console.log(metaData.whatsapp);
  const metaDataJSONString = JSON.stringify(metaData);
  const [uploaded, setUploaded] = useState(false);
  const [metaDataUrl, setMetaDataUrl] = useState("");
  const [live, setLive] = useState(true);
  const [price, setPrice] = useState(0);
  const [btnDisabled, setbtnDisabled] = useState(true);
  const [productType, setProductType] = useState(0);

  console.log(price, live, metaDataUrl, productType);

  const onClick = async (e) => {
    e.preventDefault();
    const web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    var account = accounts[0];

    const M4SContract = new web3.eth.Contract(
      abi,
      "0xC774Cf50715DCF2d50b7333e1c216bEF67E7D4E4",
      {
        from: account,
      }
    );
    //insert product type here
    console.log(M4SContract);
    console.log(metaDataUrl);
    console.log(live);
    console.log(web3.utils.toWei(price.replace(/\,/g, "")));
    console.log(productType);
    M4SContract.methods
      .create(
        metaDataUrl,
        live,
        web3.utils.toWei(price.replace(/\,/g, "")),
        productType
      )
      .send();
    // .on("receipt", navigate(`/account/${userAddress}`));
  };

  const uploadText = async (e) => {
    e.preventDefault();

    try {
      const added = await client.add(metaDataJSONString);
      const url = `https://meta4swap.infura-ipfs.io/ipfs/${added.path}`;
      setMetaDataUrl(url);
      console.log(metaDataUrl);
      setUploaded(true);
      console.log(uploaded);
      setPrice(metaData.price);
      setLive(true);
      if (metaData.category === "task") {
        setProductType(1);
      }
      setbtnDisabled(false);
    } catch (err) {
      console.log("Error uploading the file : ", err);
    }
  };

  return (
    <div hidden={hidden}>
      <button className="btn btn-primary" onClick={uploadText}>
        Upload Metadata
      </button>
      <br />
      <a
        href={metaDataUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary"
      >
        {metaDataUrl === ""
          ? ""
          : `MetaData Url ${metaDataUrl.substring(0, 44)}...`}
      </a>
      <button
        className="btn btn-primary"
        onClick={onClick}
        disabled={btnDisabled}
      >
        Create on Blockchain
      </button>
    </div>
  );
};
