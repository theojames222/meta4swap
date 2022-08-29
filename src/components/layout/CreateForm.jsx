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
  });
  const [taskForm, setTaskForm] = useState(false);
  const [serviceForm, setServiceForm] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [messageName, setMessageName] = useState("");
  const [messageDescription, setMessageDescription] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [value, setValue] = useState("");

  if (window.ethereum) {
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
    } 
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
  console.log(btnDisabled);

  const onClick = () => {
    setServiceForm(true);
    setTaskForm(false);
    setHidden(false);
    setFormData((prevState) => ({
      ...prevState,
      category: "service",
    }));

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
 
  return (
    <>
      <div className="content ">
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
                  placeholder={`enter a name for the ${
                    serviceForm === true ? "service" : "task"
                  }`}
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
                      ? "describe your service in more detail and include what the buyer will receive."
                      : `describe the task in more detail and include what you need help with.`
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
                  placeholder={`how many days to complete the ${
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
                  placeholder={`${
                    serviceForm === true ? "service" : "task"
                  } price in USD`}
                  className="input input-bordered w-full"
                  id="price"
                  onChange={onChange}
                />
              </label>
              {formData.price !== 0 ? (
                <h3>{`Price in ETH: ${(
                  (((Number(formData.price.replace(/\,/g, "")) * 10 ** 18) /
                    window.ethPrice) *
                    10 ** 8) /
                  10 ** 18
                ).toFixed(3)}`}</h3>
              ) : (
                ""
              )}
            </div>
            <header className="mt-6">
              <h2 className="smallHeader">{`Contact Info `}</h2>
              <h4 className="">at least one form of contact required</h4>
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
                  className="input input-bordered w-full"
                  defaultCountry="US"
                  placeholder="enter phone number"
                  value={value}
                  onChange={value === null ? "" : setValue}
                  id="whatsapp"
                />
              
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
