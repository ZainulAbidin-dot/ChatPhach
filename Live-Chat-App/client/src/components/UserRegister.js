import React, { useState } from "react";
import io from "socket.io-client";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ChatBox from "./ChatBox";

const socket = io.connect("http://localhost:5000");

const UserRegister = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [room, setroom] = useState("");
  const [availableRoom, setavailableRoom] = useState("");
  const navigate = useNavigate();
  const [showChat, setShowChat] = useState(false);
  const avail = false;

  const JoinRoom = async () => {

    if (username !== "" && email !== "") {
      
      await axios
      .post("http://localhost:3004/clients", {
        name: username,
        email: email,
        waiting: true,
      })
      .then((response) => console.log(response.data))
      .then((json) => json);
      
      await axios
      .post("http://localhost:3004/clients/checkroom", {
        room: room,
      })
      .then((response) => setavailableRoom(response.data))
      .then((json) => json);
      
      const num = availableRoom[0].availabler1;
      if (num === 0) {
        console.log("room available");
        socket.emit("join_room", room);
        setShowChat(true);
        await axios
        .put(`http://localhost:3004/vendors/room`,{"available": 0})
        .then((response) => (response.data))
        .then((json) => json);
      
        // navigate("/chatbox",{state:{socket:'socket', username:'username', room:'room'}});
      } else {
        console.log("room is not available",email);
        await axios
        .put(`http://localhost:3004/clients/${email}`,{"waiting": false})
        .then((response) => (response.data))
        .then((json) => json);
      
        navigate("/waitinglist");
      }
    } else {
      console.log("Please fill all the fields");
    }
  };

  return (
    <div className="App">
      {!showChat ? (
      <div className="joinChatContainer">
        <h3>User Registration</h3>
        <input
          type="text"
          placeholder="Enter your Name..."
          onChange={(event) => {
            setUsername(event.target.value);
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
          placeholder="Enter your Room..."
          onChange={(event) => {
            setroom(event.target.value);
          }}
        />
        <button onClick={JoinRoom}>Join Room</button>
      </div>
      ) : (
        <ChatBox socket={socket} username={username} room={room} email={email} />
      )}
    </div>
  );
};

export default UserRegister;
