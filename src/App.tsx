import {BrowserRouter as Router ,Routes, Route, Link } from "react-router-dom"
import { Layout,Typography, Space } from "antd"
import { NavBar } from "./components/NavBar"
import { HomePage } from "./components/HomePage"
import { Cryptocurrencies } from "./components/Cryptocurrencies"
import { CryptoDetails } from "./components/CryptoDetails"
import { News } from "./components/News"

function App() {
 

  return (
   <Router>
      <div className="app">
       <div className="navbar">
        <NavBar />
       </div>
       
       <div className="main">
        <Layout>
          <div className="routes">
        <Routes>

        
  <Route path="/" element={<HomePage />} />
  <Route path="/cryptocurrencies" element={<Cryptocurrencies minified={false}  />} />
  <Route path="/crypto/:uuid" element={<CryptoDetails />} />
  <Route path="/news" element={<News minified={false}  />} />



        </Routes>
        </div>
        </Layout>

        <div className="footer">
        <Typography.Title style={{color:"#a5f3fc",display:"flex",flexDirection:"column", justifyContent:"center",alignItems:"center"}} level={5}>
         <span> Cryptonian </span> 
          All rights reserved
        </Typography.Title>
        <Space>
         <Link to="/">Home</Link>
         <Link to="/news">News</Link>
        </Space>
       </div>
       </div>
       
      </div>
      </Router>
  )
}

export default App
