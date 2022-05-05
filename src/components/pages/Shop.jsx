import { Container } from "react-bootstrap";
import { useState } from "react";
import ItemCard from "../layout/ItemCard";
import { ImageUpload } from "../layout/ImageUpload";
function Shop() {
  const [imageUrl, setImageUrl] = useState("");

  return (
    <Container>
      <ImageUpload setUrl={setImageUrl} />

      <h5>
        ImageUrl :{" "}
        <a href={imageUrl} target="_blank" rel="noopener noreferrer">
          {imageUrl}
        </a>
      </h5>

      <hr />
    </Container>
  );
}

export default Shop;
