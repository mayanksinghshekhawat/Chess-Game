import React from 'react'
import {Link, NavLink} from 'react-router-dom'
import './Header/Header.css'

function Header() {
  return (
    <header>
        <nav>
            <div className="head">
            <div className="logo">
                <Link>
                <img 
                    src='/src/assets/chess-logo.jpg'
                    className='img_logo'
                    alt='logo'
                /> </Link>  
            </div>
            <div className="menu">
                <ul>
                    <li>
                    <NavLink to="">
                                    Home
                                </NavLink>
                    </li>
                    <li>
                    <NavLink to="">
                                    Play
                                </NavLink>
                    </li>
                    <li>
                    <NavLink to="">
                                    Puzzles
                                </NavLink>
                    </li>
                </ul>
            </div>
            <div className="Enter">
                <button className='header-button'>Login</button>
                <button className='header-button'>Signup</button>
            </div>
            </div>
        </nav>
    </header>
  )
}

export default Header