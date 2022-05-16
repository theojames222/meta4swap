import React, { useState } from "react";
import { create } from "ipfs-http-client";
import {
  Form,
  Image,
  Button,
  ProgressBar,
  Container,
  Badge,
} from "react-bootstrap";

const client = create("https://ipfs.infura.io:5001/api/v0");

export const ImageUpload = ({ setUrl, setDefaultAccount, connected }) => {
  const [image, setImage] = useState({});
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [btnEnabled, setbtnEnabled] = useState(false);

  const createPreview = (e) => {
    if (e.target.value !== "") {
      setImage(e.target.files[0]);
      const src = URL.createObjectURL(e.target.files[0]);
      setImagePreview(src);
    } else {
      setImagePreview("");
    }
  };
  // const btnhandler = () => {
  //   // Asking if metamask is already present or not
  //   if (window.ethereum) {
  //     // res[0] for fetching a first wallet
  //     window.ethereum.request({ method: "eth_requestAccounts" });
  //   } else {
  //     alert("install metamask extension!!");
  //   }
  // };
  // const connectMetaMask = () => {
  //   if (window.ethereum) {
  //     // res[0] for fetching a first wallet
  //     window.ethereum
  //       .request({ method: "eth_requestAccounts" })
  //       .then((result) => {
  //         accountChangedHandler(result[0]);
  //       });
  //   } else {
  //     alert("install metamask extension!!");
  //   }
  //   const accountChangedHandler = (newAccount) => {
  //     setDefaultAccount(newAccount);
  //   };
  // };

  const uploadFile = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const added = await client.add(image);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setUrl(url);
      setImagePreview(url);
      setUploaded(true);
    } catch (err) {
      console.log("Error uploading the file : ", err);
    }
    setLoading(false);
  };

  console.log(connected);
  const previewAndUploadButton = () => {
    if (imagePreview !== "") {
      if (!loading) {
        return (
          <div>
            {uploaded ? (
              <h5>
                ✅{" "}
                <a
                  href={imagePreview}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Image
                </a>{" "}
                Uploaded Successfully ✅{" "}
              </h5>
            ) : (
              <div>
                {/* {connected !== true ? (
                  <button
                    className="btnConnect text-white text-2xl mr-2"
                    onClick={btnhandler}
                  >
                    Connect
                  </button>
                ) : (
                  <Button type="submit" className="mb-3">
                    Upload Image
                  </Button>
                )} */}
                <Button type="submit" className="mb-3">
                  Upload Image
                </Button>
                <br />
                <h5>
                  {image.name} <Badge pill>{image.size} kb</Badge>
                </h5>

                <Image
                  style={{ height: "300px" }}
                  className="mb-3"
                  src={imagePreview}
                  thumbnail
                />
              </div>
            )}
          </div>
        );
      } else {
        return (
          <Container>
            <h4>Uploading Image</h4>
            <ProgressBar animated now={100} />
            <h4>Please Wait ...</h4>
          </Container>
        );
      }
    }
  };

  return (
    <div>
      <Form onSubmit={uploadFile}>
        <Form.Control
          required
          type="file"
          accept="image/*"
          onChange={(e) => createPreview(e)}
          className="mb-3"
          disabled={!connected}
        />

        {previewAndUploadButton()}
      </Form>
    </div>
  );
};
