import React from 'react'
import { useEffect, useState, useCallback } from "react";
import socket from '../socket.js';
import StartGame from '../Startgame/StartGame.jsx';
import ChessBoard from '../Chessboard/ChessBoard.jsx';
import './User.css';
function User() {

    const [username, setUsername] = useState('');

  // indicates if a username has been submitted
  const [usernameSubmitted, setUsernameSubmitted] = useState(false);

  const [room, setRoom] = useState("");
  const [orientation, setOrientation] = useState("");
  const [players, setPlayers] = useState([]);

  // resets the states responsible for initializing a game
  const cleanup = useCallback(() => {
    setRoom("");
    setOrientation("");
    setPlayers("");
  }, []);

  useEffect(() => {
    // const username = prompt("Username");
    // setUsername(username);
    // socket.emit("username", username);

    socket.on("opponentJoined", (roomData) => {
      console.log("roomData", roomData);
    //   setRoom(roomData.roomId); // Update room state
    // setOrientation("white");
      setPlayers(roomData.players);
    });
  }, []);

  const handleContinue=(() => { // fired when continue is clicked
    if (!username) return; // if username hasn't been entered, do nothing
    socket.emit("username", username); // emit a websocket event called "username" with the username as data
    setUsernameSubmitted(true); // indicate that username has been submitted
  })
  return (
    <div className='main'>
       {!usernameSubmitted && (
  <div className='main2'>
    <div className="main3">
    <label>Username</label>
    <input
      id="username"
      label="Username"
      name="username"
      value={username}
      required
      onChange={(e) => setUsername(e.target.value)}
      type="text"
    />
    <button onClick={handleContinue}>Submit</button>
    </div>
  </div>
)}
        {room ? (
        <ChessBoard
          room={room}
          orientation={orientation}
          username={username}
          players={players}
          // the cleanup function will be used by Game to reset the state when a game is over
          cleanup={cleanup}
        />
      ) : (
        <StartGame
          setRoom={setRoom}
          setOrientation={setOrientation}
          setPlayers={setPlayers}
        />
      )}
    </div>
  )
}

export default User