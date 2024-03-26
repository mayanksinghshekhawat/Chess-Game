import React from 'react'
import './Home.css'
import { useNavigate } from 'react-router-dom';
function Home() {

    const navigate = useNavigate();

    const handlePlayVsFriendClick = () => {
      // Navigate to the '/vsFriend' page
      navigate('/vsFriend');
    };

  return (
    <div>
        <div className="first">
            <div className="board-img">
            <img 
                    src='/src/assets/hero-img.jpg'
                    className='img_board'
                    alt='logo'
                />
            </div>
            <div className="playing-options">
                <div className="hero-text">
                    <h1>
                        <span>Play Chess</span>
                        <span> Online </span>
                        <span>on the #1 Site!</span>
                    </h1>
                </div>
                <div className="play-vs">
                    <button className='home-buttons' onClick={handlePlayVsFriendClick}>Play vs friend</button>
                    <button className='home-buttons'>Play vs computer</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home