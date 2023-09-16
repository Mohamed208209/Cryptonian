import {useState, useEffect} from "react"
import {Button, Menu, Typography, Avatar} from "antd"

import {Link } from "react-router-dom"


import {
    HomeTwoTone,
    BulbTwoTone,
    FundTwoTone,
    MenuOutlined,


    } from "@ant-design/icons"

import cryptoIcons from "/assets/cryptocurrency-icons.png"   


export const NavBar = () => {
  const [menuActive, setMenuActive] = useState(true);
  const [screenSize, setScreenSize] = useState<null | number>(null);

  useEffect(() => {
    const handleResize = ()=> setScreenSize(window.innerWidth)
    window.addEventListener("resize",handleResize)
    handleResize();
    return ()=> window.removeEventListener("resize",handleResize)

  },[])

  useEffect(() => {
    if( screenSize && screenSize < 768){
      setMenuActive(false);
    }
    else{
      setMenuActive(true)
    }
  },[screenSize])




  return (
    <div className="nav-container">
     <div className="logo-container">
      <Avatar src={cryptoIcons} size="large" />
      <Typography.Title level={2} className="logo" >
        Cryptonian
      </Typography.Title>
       <Button className="menu-control-container" onClick={()=> setMenuActive(!menuActive)}>
         <MenuOutlined />
       </Button>
     </div>
     
     {menuActive &&  <Menu theme="dark">
      <Menu.Item  key="Home-item" icon={<HomeTwoTone />}>
        <Link to="/">Home</Link>
      </Menu.Item>

      <Menu.Item  key="cryptocurrencies-item"  icon={<FundTwoTone />}>
        <Link to="/cryptocurrencies">Cryptocurrencies</Link>
      </Menu.Item>

   

      <Menu.Item  key="news-item" icon={<BulbTwoTone />}>
        <Link to="/news">News</Link>
      </Menu.Item>

     </Menu> }
     
    </div>
  )
}
