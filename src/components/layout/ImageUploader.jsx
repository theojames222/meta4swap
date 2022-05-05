import React, { useState } from "react";
import { ImageUpload } from "react-ipfs-uploader";

function ImageUploader() {
  const [imageUrl, setImageUrl] = useState("");

  return (
    <div>
      <ImageUpload setUrl={setImageUrl} />
      ImageUrl :{" "}
      <a href={imageUrl} target="_blank" rel="noopener noreferrer">
        {imageUrl}
      </a>
    </div>
  );
}

export default ImageUploader;
