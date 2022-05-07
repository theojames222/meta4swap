import { useState } from "react";
import { create } from "ipfs-http-client";
import { ImageUpload } from "./ImageUpload";

const client = create("https://ipfs.infura.io:5001/api/v0");

export const JsonUpload = ({ disabled, metaData2, imageUrl }) => {
  const metaData = {
    ...metaData2,
    " imageUrl": imageUrl,
  };
  const metaDataJSONString = JSON.stringify(metaData);
  const [uploaded, setUploaded] = useState(false);
  const [metaDataUrl, setMetaDataUrl] = useState("");

  const onClick = () => {
    // console.log(metaData2, imageUrl);
    console.log(metaDataJSONString);
  };
  const uploadText = async (e) => {
    e.preventDefault();

    try {
      const added = await client.add(metaDataJSONString);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setMetaDataUrl(url);
      console.log(metaDataUrl);
      setUploaded(true);
      console.log(uploaded);
    } catch (err) {
      console.log("Error uploading the file : ", err);
    }
  };

  return (
    <div>
      <button
        className="btn btn-primary"
        onClick={uploadText}
        disabled={disabled}
      >
        Create on Blockchain
      </button>
      <a href={metaDataUrl} target="_blank" rel="noopener noreferrer">
        {" "}
        {metaDataUrl}
      </a>
      {/* <button className="btn btn-primary" onClick={onClick}>
        Create on Blockchain
      </button> */}
    </div>
  );
};
