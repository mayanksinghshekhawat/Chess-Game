import { useState } from "react";
import socket from "../socket";
import './startgame.css';
function StartGame({ setRoom, setOrientation, setPlayers }) {
    const [roomInput , setRoomInput] = useState('');
    const [roomError , setRoomError] = useState('');
    
    const handleContinue=(() => { // fired when continue is clicked
        if (!roomInput) return; // if given room input is valid, do nothing.
          socket.emit("joinRoom", { roomId: roomInput }, (r) => {
            // r is the response from the server
            if (r.error) return setRoomError(r.message); // if an error is returned in the response set roomError to the error message and exit
            console.log("response:", r);
            setRoom(r?.roomId); // set room to the room ID
            setPlayers(r?.players); // set players array to the array of players in the room
            setOrientation("black"); // set orientation as black
        })
      })

  return (
    <div className="main1">
      <div className="main4">
        <div className="startgame">
          <h4>Start New Game</h4>
        <button onClick={()=>{
            socket.emit('createRoom',(r)=>{
                console.log(r);
                setRoom(r);
                setOrientation("white");
            })

        }}>Start Game</button>
        </div>
        <div className="joingame">
        <h4>Enter the Game ID to join a Game</h4>
        <input 
         id="room"
         label="Room ID"
         name="room"
         value={roomInput}
         required
        onChange={(e) => setRoomInput(e.target.value)}
        type="text"
        // error={Boolean(roomError)}
        //   helperText={!roomError ? 'Enter a room ID' : `Invalid room ID: ${roomError}` }
        />
        <button onClick={handleContinue}>Join Game</button>
    </div>
    </div>
    </div>
  )
}

export default StartGame