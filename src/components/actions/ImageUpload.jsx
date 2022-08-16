import React, { useState } from "react";
import { create } from "ipfs-http-client";
import { Buffer } from "buffer";

import {
  Form,
  Image,
  Button,
  ProgressBar,
  Container,
  Badge,
} from "react-bootstrap";

const projectId = '2DSQcwzwT76SmNIGvQhj2xU1lVW';
const projectSecret = '214d0b37f4845f97cbdf513eee8248ff';
const auth =
    'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

const client = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
      authorization: auth,
  },
});

export const ImageUpload = ({
  setUrl,
  setDefaultAccount,
  connected,
  disabled,
}) => {
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
    if (disabled === true) {
      alert("Please completely fill out form data to continue!");
    }
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
