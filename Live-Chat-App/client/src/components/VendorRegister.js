import React, { useState, useEffect } from "react";
import axios from "axios";

const VendorRegister = () => {
  const [vendor, setVendor] = useState("");
  const [room1, setRoom] = useState("");
  const [room2, setRoom2] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    if (
      vendor !== "" &&
      room1 !== "" &&
      room2 !== "" &&
      email !== "" &&
      password !== ""
    ) {
      // socket.emit("join_room", room);
      await axios
        .post("http://localhost:3004/vendors", {
          room1: room1,
          room2: room2,
          name: "vendor",
          email: "email",
          password: "password",
          availabler1: true,
          availabler2: true,
        })
        .then((response) => console.log(response.data))
        .then((json) => json);
    }
  };

  return (
    <div className="App">
      <div className="joinChatContainer">
        <h3>Register as a Vendor</h3>
        <input
          type="text"
          placeholder="Enter your name..."
          onChange={(event) => {
            setVendor(event.target.value);
          }}
        />
        <input
          type="email"
          placeholder="Enter your Email..."
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <input
          type="number"
          placeholder="Room 1..."
          onChange={(event) => {
            setRoom(event.target.value);
          }}
        />
        <input
          type="number"
          placeholder="Room 2..."
          onChange={(event) => {
            setRoom2(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Enter your Password..."
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <button onClick={(e) => handleRegister(e)}>Register</button>
      </div>
    </div>
  );
};

export default VendorRegister;
