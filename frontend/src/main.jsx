import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import './index.css'
import Header from './components/Header.jsx'
import Layout from './Layout.jsx'
import Footer from './components/footer/Footer.jsx'
import Home from './components/Home/Home.jsx'
import ChessBoard from './components/Chessboard/ChessBoard.jsx'
import User from'./components/Username/User.jsx'
const router = createBrowserRouter([{
  path:"/",
  element:<Layout/>,
  children: [
    {
      path: "",
      element: <Home />
    },
    {
      path: "vsFriend",
      element: <User />
    },
    {
      path: "/vsComp",
      element: <ChessBoard />
    },
  ]
}])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router= {router}></RouterProvider>
  </React.StrictMode>,
)
