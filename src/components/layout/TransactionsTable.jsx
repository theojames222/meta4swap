import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
// import Switch from "../actions/Switch";

// Call the data base for usertransactions here
function TransactionsTable() {
  const [tasks, setTasks] = useState(false);
  const [services, setServices] = useState(true);
  //   const [value, setValue] = useState(false);

  //   Add on Toggle instead
  // Display data in map function in tbody

  const [listingsBuyer, setListingsBuyer] = useState([]);
  const [listingsSeller, setListingsSeller] = useState([]);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(false);
  const params = useParams();
  const page = window.location.href;

  const getOrdersBuyer = useCallback(async () => {
    let ordersBuyer = [];
    try {
      const serverUrl = "https://gu15uqsbipep.usemoralis.com:2053/server";
      const appId = "F28xSksEmA0YDFTQskgodpG3W5JSZK0uBm9Abnde";
      const masterKey = "G5799rbYbzVEjmd9B2tFNfgX184JryV3ntW283dy";
      await Moralis.start({ serverUrl, appId, masterKey });
      const Item = Moralis.Object.extend("m4orders1");
      const query = new Moralis.Query(Item);
      //replace my address with user's address
      const user = params.userId;
      query.equalTo("buyer", user);
      const results = await query.find();
      console.log(results.length);
      for (let i = 0; i < results.length; i++) {
        const object = results[i];
        const orderId = object.get("orderId");
        const itemId = object.get("itemId");
        const price = object.get("price");
        const serviceType = object.get("serviceType");
        console.log(orderId);
        console.log(itemId);
        console.log(price);
        console.log(serviceType);

        ordersBuyer.push({ orderId: orderId, itemId: itemId, price: price });
      }
      setListingsBuyer(ordersBuyer);
      setLoading(false);
    } catch (error) {
      console.log("error");
    }
  }, [setLoading, setListingsBuyer, params.userId]);

  const getOrdersSeller = useCallback(async () => {
    let ordersSeller = [];
    try {
      const serverUrl = "https://gu15uqsbipep.usemoralis.com:2053/server";
      const appId = "F28xSksEmA0YDFTQskgodpG3W5JSZK0uBm9Abnde";
      const masterKey = "G5799rbYbzVEjmd9B2tFNfgX184JryV3ntW283dy";
      await Moralis.start({ serverUrl, appId, masterKey });
      const Item = Moralis.Object.extend("m4orders1");
      const query = new Moralis.Query(Item);
      //replace my address with user's address
      const user = params.userId;
      query.equalTo("seller", user);
      const results = await query.find();
      console.log(results.length);
      for (let i = 0; i < results.length; i++) {
        const object = results[i];
        const orderId = object.get("orderId");
        const itemId = object.get("itemId");
        const price = object.get("price");
        const serviceType = object.get("serviceType");
        console.log(orderId);
        console.log(itemId);
        console.log(price);
        console.log(serviceType);

        ordersSeller.push({ orderId: orderId, itemId: itemId, price: price });
      }
      setListingsSeller(ordersSeller);
      setLoading(false);
    } catch (error) {
      console.log("error");
    }
  }, [setLoading, setListingsSeller, params.userId]);
  useEffect(() => {
    getOrdersBuyer();
    getOrdersSeller();

    setLoading(false);
  }, [])
  return (
    <>
      <div className="overflow-x-auto">
        <table className="table table-compact w-full">
          {/* <Switch isOn={value} handleToggle={() => setValue(!value)} /> */}
          <Link className="table table-compact w-full" to="/order">
            <thead>
              <tr>
                <th>Order Id</th>
                <th>Item Id</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
          </Link>
          <tbody></tbody>
        </table>
      </div>
    </>
  );
}

export default TransactionsTable;
