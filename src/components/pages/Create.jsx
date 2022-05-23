import { Container } from "react-bootstrap";
import { useState } from "react";
// import ItemCard from "../layout/ItemCard";
import { JsonUpload } from "../actions/JsonUpload";
import { ImageUpload } from "../actions/ImageUpload";
function Create({ connected, userAddress }) {
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  // const [btnDisabled, setbtnDisabled] = useState(true);
  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    description: "",
    unit: "",
    quantity: 0,
    price: 0,
    priceUnit: "USD",
  });
  // const { productName, description, unit, quantity, price, imageLink } =
  //   formData;
  if (window.ethereum) {
    // res[0] for fetching a first wallet
    window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then((result) => {
        accountChangedHandler(result[0]);
      });
  } else {
    alert("install metamask extension!!");
  }
  const accountChangedHandler = (newAccount) => {
    setDefaultAccount(newAccount);
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  // const handleInputImageChange = (e) => {
  //   if (imageUrl === "") {
  //     setbtnDisabled(true);
  //   } else {
  //     setbtnDisabled(false);
  //   }
  // };

  // const onClick = () => {
  //   console.log(formData);
  // };

  return (
    <>
      <div className="content ">
        <div className="container w-1/4 pl-10 pt-4 text-black font-bold fixed ">
          <h2> Quick Guide :</h2>
          <p>{`1. Connect to MetaMask(required)`}</p>
          <p>{`2. Fill out all form fields`} </p>
          <p>{`3. Upload product image`} </p>
          <p>{`4. Upload metadata`} </p>
          <p>{`5. Upload to blockchain! `} </p>
        </div>
        <div className="formContainer ">
          <header>
            <p className="smallHeader text-5xl mb-5">Create Listing</p>
          </header>
          <form className="">
            <header className="mt-6">
              <h2 className="smallHeader">Item Info</h2>
            </header>
            <div className="form-control">
              <label className="input-group pb-0.5">
                <span className="formLabel3">Product Name</span>
                <input
                  type="text"
                  placeholder="Name of Product"
                  className="input input-bordered w-full"
                  id="productName"
                  onChange={onChange}
                />
              </label>
            </div>
            <div className="form-control">
              <div>
                <label className="input-group pb-0.5">
                  <span className="formLabel2">Category</span>
                  <div className="form-control">
                    <label className="label cursor-pointer">
                      <span className="label-text">Product/Goods</span>
                      <input
                        type="radio"
                        name="radio-6"
                        className="radio checked:bg-orange-500"
                        defaultChecked={false}
                        onChange={onChange}
                        value="product"
                        id="category"
                      />
                    </label>

                    <label className="label cursor-pointer">
                      <span className="label-text">Service</span>
                      <input
                        type="radio"
                        name="radio-6"
                        className="radio checked:bg-green-500"
                        onChange={onChange}
                        value="service"
                        id="category"
                      />
                    </label>
                  </div>
                </label>
              </div>
            </div>
            <div className="form-control">
              <label className="input-group pb-12">
                <span className="formLabel">Description</span>
                <textarea
                  className="textarea textarea-bordered w-full"
                  placeholder="Brief product description"
                  id="description"
                  onChange={onChange}
                ></textarea>
              </label>
            </div>
            <header>
              <h2 className="smallHeader"> Selling Info</h2>
            </header>
            <div className="form-control">
              <label className="input-group pb-0.5">
                <span className="formLabel4">Unit</span>
                <select
                  className="select select-bordered w-max-content"
                  onChange={onChange}
                  id="unit"
                >
                  <option disabled selected>
                    Units for Selling Price
                  </option>
                  <option>per hour</option>
                  <option>per item</option>
                  <option>per pound</option>
                  <option>per day</option>
                </select>
                {/* <input
                  type="text"
                  placeholder="Unit(per hour, per item, per pound)"
                  className="input input-bordered w-full"
                  id="unit"
                  onChange={onChange}
                /> */}
              </label>
            </div>
            <div className="form-control">
              <label className="input-group pb-0.5">
                <span className="formLabel5">Quantity</span>
                <input
                  type="text"
                  placeholder="Quantity"
                  className="input input-bordered w-full"
                  id="quantity"
                  onChange={onChange}
                />
              </label>
            </div>
            <div className="form-control">
              <label className="input-group pb-20">
                <span className="formLabel6">Price</span>
                <input
                  type="text"
                  placeholder="20"
                  className="input input-bordered w-full"
                  id="price"
                  onChange={onChange}
                />
                <span>
                  <select
                    className="select select-ghost max-w-xs"
                    onChange={onChange}
                    id="priceUnit"
                  >
                    <option>USD</option>
                    <option>EUR</option>
                  </select>
                </span>
              </label>
            </div>
          </form>
          <Container className="pb-2">
            <div>
              <p className="smallHeader">
                Please view Image Url after upload to Complete Form
              </p>
              <ImageUpload setUrl={setImageUrl} connected={connected} />

              <h3>Image Url:</h3>
              <a
                // onClick={handleInputImageChange}
                id="imageLink"
                href={imageUrl}
                target="_blank"
                rel="noopener noreferrer"
                value={imageUrl}
                className="text-primary"
              >
                {`${
                  imageUrl === ""
                    ? ""
                    : `${imageUrl.substring(0, 44)}...
                `
                }`}
              </a>
            </div>

            <hr />
          </Container>

          <JsonUpload
            metaData2={formData}
            imageUrl={imageUrl}
            id={defaultAccount}
            userAddress={userAddress}
          />

          {/* <button className="btn btn-primary" onClick={onClick}>
            Create on Blockchain
          </button> */}
        </div>
      </div>
    </>
  );
}

export default Create;
