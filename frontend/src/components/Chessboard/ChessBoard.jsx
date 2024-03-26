import './Board.css';
import { useState, useMemo, useCallback, useEffect } from "react";
import {Chessboard} from 'react-chessboard'
import {Chess} from 'chess.js'
// import socket from '../socket.js'
import socket from '../socket';
function ChessBoard({ players, room, orientation, cleanup }) {
  const chess = useMemo(() => new Chess(), []); // <- 1
  const [fen, setFen] = useState(chess.fen()); // <- 2
  const [over, setOver] = useState("");
  const [capturedWhite, setCapturedWhite] = useState({});
  const [capturedBlack, setCapturedBlack] = useState({});
  const makeAMove = useCallback(
    (move) => {
      try {
        const result = chess.move(move); // update Chess instance

        const obj1 = get_captured_pieces(chess, "white");
      
      setCapturedWhite(obj1);
      console.log(capturedWhite);
      const obj2 = get_captured_pieces(chess, "black");
      
      setCapturedBlack(obj2);
      console.log(capturedBlack);
        setFen(chess.fen()); // update fen state to trigger a re-render
  
        console.log("over, checkmate", chess.isGameOver(), chess.isCheckmate());
  
        if (chess.isGameOver()) { // check if move led to "game over"
          if (chess.isCheckmate()) { // if reason for game over is a checkmate
            // Set message to checkmate. 
            setOver(
              `Checkmate! ${chess.turn() === "w" ? "black" : "white"} wins!`
            ); 
            // The winner is determined by checking for which side made the last move
          } else if (chess.isDraw()) { // if it is a draw
            setOver("Draw"); // set message to "Draw"
          } else {
            setOver("Game over");
          }
        }
  
        return result;
      } catch (e) {
        return null;
      } // null if the move was illegal, the move object if the move was legal
    },
    [chess]
  );
  function get_captured_pieces(game, color) {
    const captured = {'p': 0, 'n': 0, 'b': 0, 'r': 0, 'q': 0}

    for (const move of game.history({ verbose: true })) {
        if (move.hasOwnProperty("captured") && move.color !== color[0]) {
            captured[move.captured]++
        }
    }

    return captured;
}
  // onDrop function
  function onDrop(sourceSquare, targetSquare) {
    // orientation is either 'white' or 'black'. game.turn() returns 'w' or 'b'
    if (chess.turn() !== orientation[0]) return false; // <- 1 prohibit player from moving piece of other player

    if (players.length < 2) return false; // <- 2 disallow a move if the opponent has not joined

    const moveData = {
      from: sourceSquare,
      to: targetSquare,
      color: chess.turn(),
      promotion: "q", // promote to queen where possible
    };

    const move = makeAMove(moveData);

    // illegal move
    if (move === null) return false;

    socket.emit("move", { // <- 3 emit a move event.
      move,
      room,
    }); // this event will be transmitted to the opponent via the server
    
    return true;
  }

  useEffect(() => {
    socket.on("move", (move) => {
      makeAMove(move); //
    });
  }, [makeAMove]);
  

  return (
    <div className='main5'>
    <p>Room ID: {room}</p>
    {players.map((p) => (             
                 <h3>{p.username}</h3>
            ))}
    <div className="app">
       <Chessboard position={fen} onPieceDrop={onDrop}  boardOrientation={orientation} />  {/**  <- 4 */}
    </div>
    </div>
  );
}

export default ChessBoard;