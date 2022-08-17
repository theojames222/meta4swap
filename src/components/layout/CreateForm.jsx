import { useState } from "react";
import { JsonUpload } from "../actions/JsonUpload";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

function CreateForm({ connected, userAddress }) {
  const [defaultAccount, setDefaultAccount] = useState(null);

  const [formData, setFormData] = useState({
    itemName: "",
    category: "",
    description: "",
    eta: "",
    price: 0,
    priceUnit: "USD",
    telegram: "t.me/",
    discord: "https://discord.gg/",
    // whatsapp: "https://wa.me/",
  });

  const [taskForm, setTaskForm] = useState(false);
  const [serviceForm, setServiceForm] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [messageName, setMessageName] = useState("");
  const [messageDescription, setMessageDescription] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [value, setValue] = useState("");

  //   if (window.ethereum) {
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
  let ethPrice = 0;
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onChange2 = (e) => {
    if (e.target.id === "telegram" && e.target.value.trim().length >= 5) {
      setBtnDisabled(false);
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: `t.me/${e.target.value}`,
      }));
    } else if (e.target.id === "discord" && e.target.value.trim().length >= 2) {
      setBtnDisabled(false);
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: `https://discord.gg/${e.target.value}`,
      }));
    } //else if (e.target.id === "whatsapp" && value !== "") {
    //   setBtnDisabled(false);
    //   setFormData((prevState) => ({
    //     ...prevState,
    //     [e.target.id]: `https://wa.me/${value}`,
    //   }));
    // }
  };
  const onChange3 = (e) => {
    if (e.target.value === "" || 0) {
      setBtnDisabled(true);
      setMessageName(null);
    } else if (
      e.target.id === "itemName" &&
      e.target.value.trim().length <= 10
    ) {
      setBtnDisabled(true);
      setMessageName(`Must be at least 10 characters in length`);
    } else {
      setMessageName(null);
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.value,
      }));
    }
  };
  const onChange4 = (e) => {
    if (e.target.value === "" || 0) {
      setBtnDisabled(true);
      setMessageDescription(null);
    } else if (
      e.target.id === "description" &&
      e.target.value.trim().length <= 15
    ) {
      setBtnDisabled(true);
      setMessageDescription(`Must be at least 15 characters in length`);
    } else {
      setMessageDescription(null);
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.value,
      }));
    }
  };

  function handeOnChange(value) {
    this.setValue({
      whatsapp: value,
    });
  }

  const onClick = () => {
    setServiceForm(true);
    setTaskForm(false);
    setHidden(false);
    setFormData((prevState) => ({
      ...prevState,
      category: "service",
    }));
    //set hidden required in both click functions for task and service buttons
  };
  const onClick2 = () => {
    setTaskForm(true);
    setServiceForm(false);
    setHidden(false);
    setFormData((prevState) => ({
      ...prevState,
      category: "task",
    }));
  };

  // console.log(formData, value);
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
            <p className="smallHeader text-5xl mb-5 px-5">Create Listing</p>
          </header>
          <div className="flex justify-center align-center mt-3">
            <button
              className={`btn btn-outline btn-primary btn-${
                serviceForm === true ? "active" : ""
              } w-1/2 ${serviceForm === true ? "text-white" : ""}`}
              onClick={onClick}
            >
              Service
            </button>
            <button
              className={`btn btn-outline btn-primary btn-${
                taskForm === true ? "active" : ""
              } w-1/2  `}
              onClick={onClick2}
            >
              Task
            </button>
          </div>
          <form className="" hidden={hidden}>
            <div className="form-control">
              <header className="mt-6">
                <h2 className="smallHeader">{`${
                  serviceForm === true ? "Service Name" : "Task Name"
                }`}</h2>
              </header>
              <label className="input-group pb-0.5">
                <input
                  type="text"
                  placeholder={`Enter a name for the ${
                    serviceForm === true ? "service" : "task"
                  }(min 10 characters)*`}
                  className="input input-bordered w-full"
                  id="itemName"
                  onChange={onChange3}
                />
              </label>
              {messageName && (
                <div className="text-sm" style={{ color: "red" }}>
                  {messageName}
                </div>
              )}
            </div>

            <div className="form-control">
              <header className="mt-6">
                <h2 className="smallHeader">{`${
                  serviceForm === true ? "Service" : "Task"
                } Description`}</h2>
              </header>
              <label className="input-group pb-0.5">
                <textarea
                  className="textarea textarea-bordered w-full h-28"
                  placeholder={`${
                    serviceForm === true
                      ? "Describe your service in more detail. Include what the final product looks like and the technologies used.(min 15 characters)*"
                      : `Describe the task in more detail. Include what you need completed and what skills and technologies are required.(min 15 characters)*`
                  }`}
                  id="description"
                  onChange={onChange4}
                ></textarea>
              </label>
              {messageDescription && (
                <div className="text-sm" style={{ color: "red" }}>
                  {messageDescription}
                </div>
              )}
            </div>
            <div className="form-control">
              <header className="mt-6">
                <h2 className="smallHeader">{`${
                  serviceForm === true ? "Service" : "Task"
                } ETA`}</h2>
              </header>
              <label className="input-group pb-0.5">
                <input
                  type="text"
                  placeholder={`How many days to complete the ${
                    serviceForm === true ? "service" : "task"
                  }`}
                  className="input input-bordered w-full"
                  id="eta"
                  onChange={onChange}
                />
              </label>
            </div>
            <div className="form-control">
              <header className="mt-6">
                <h2 className="smallHeader">{`Price`}</h2>
              </header>
              <label className="input-group pb-5">
                <input
                  type="text"
                  placeholder="Price in USD"
                  className="input input-bordered w-full"
                  id="price"
                  onChange={onChange}
                />
              </label>
              {formData.price !== 0 ? (
                <h3>{`Price in ETH: ${Number(formData.price) + 1200}`}</h3>
              ) : (
                ""
              )}
            </div>
            <header className="mt-6">
              <h2 className="smallHeader">{`Contact Info `}</h2>
              <h4 className="">At least on form of contact required</h4>
              <h4 className="text-sm pb-2" style={{ color: "red" }}>
                *Input username only
              </h4>
            </header>
            <div className="form-control">
              <label className="input-group pb-0.5">
                <span className="formLabel7">Telegram</span>
                <input
                  type="text"
                  placeholder="username"
                  className="input input-bordered w-full"
                  id="telegram"
                  onChange={onChange2}
                />
              </label>
            </div>
            <div className="form-control">
              <label className="input-group pb-0.5">
                <span className="formLabel8">Discord</span>
                <input
                  type="text"
                  placeholder={`servername`}
                  className="input input-bordered w-full"
                  id="discord"
                  onChange={onChange2}
                />
              </label>
            </div>
            <div className="form-control">
              <label className="input-group pb-10">
                <span className="formLabel9">WhatsApp</span>
                <PhoneInput
                  placeholder="Enter phone number"
                  value={value}
                  onChange={value === null ? "" : setValue}
                  id="whatsapp"
                />
                {/* <input
                  type="text"
                  placeholder={`phone # (ex. 1112223333)`}
                  className="input input-bordered w-full"
                  id="whatsapp"
                  onChange={onChange2}
                /> */}
              </label>
            </div>
          </form>

          <JsonUpload
            metaData2={formData}
            whatsapp={value}
            id={defaultAccount}
            userAddress={userAddress}
            hidden={hidden}
          />
        </div>
      </div>
    </>
  );
}

export default CreateForm;
