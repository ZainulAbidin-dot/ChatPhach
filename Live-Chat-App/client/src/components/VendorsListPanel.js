import axios from "axios";
import React, { useState, useEffect } from "react";

const VendorsListPanel = () => {
  const [vacant, setvacant] = useState([]);
  const [notvacant, setnotvacant] = useState([]);
  const [client, setclient] = useState([]);

  useEffect(() => {
    return async () => {
      await axios
        .get("http://localhost:3004/clients/vacant")
        .then((response) => setvacant(response.data))
        .then((json) => json);

      await axios
        .get("http://localhost:3004/clients/notvacant")
        .then((response) => setnotvacant(response.data))
        .then((json) => json);

      await axios
        .get("http://localhost:3004/clients")
        .then((response) => setclient(response.data))
        .then((json) => json);
    };
  }, []);

  return (
    <div className="container">
      <div className="joinChatContainer">
        <h3>Waiting List</h3>
      </div>
      <div className="vendors-list-panel">
        <div className="vendors-list">
          <h3>Available Vendors</h3>
          <ul>
            {vacant !== null ? (
              vacant.map((item) => <li>{item.name}</li>)
            ) : (
              <h1>None...</h1>
            )}
          </ul>
          <h3>Not Available Vendors </h3>
          <ul>
            {notvacant ? (
              notvacant.map((item) => <li>{item.name}</li>)
            ) : (
              <h1>None...</h1>
            )}
          </ul>
        </div>
        <div className="users-list">
          <h3>Clients Waiting </h3>
          <ul>
            {client ? (
              client.map((item) => <li>{item.name}</li>)
            ) : (
              <h1>None...</h1>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VendorsListPanel;
