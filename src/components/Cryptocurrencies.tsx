import millify from "millify" 
import { Link } from "react-router-dom"
import { Card, Row, Col, Input } from "antd"
import { useGetCryptosQuery } from "../services/cryptoApi"
import { useEffect, useState } from "react"
import { Loader } from "./Loader"


type currency = {
  uuid: string;
  rank: number;
  name: string;
  iconUrl: string;
  price:number;
  marketCap:number;
  change: number;
};


type Cryptocurrenciesprops = {
  minified:boolean
}

type coin = {
  name:string;
}



export const Cryptocurrencies = ({minified}:Cryptocurrenciesprops) => {
   const count = minified ? 10 : 100
   const {data : cryptosList, isFetching } = useGetCryptosQuery(count)
   const [cryptos, setCryptos] = useState([])
   
   const [searchItem, setSearchItem] = useState('')

   useEffect(() => {

     const filteredData = cryptosList?.data?.coins.filter(
      (coin:coin) => coin.name.toLowerCase().includes(searchItem.toLowerCase()))

     setCryptos(filteredData);

   },[cryptosList,searchItem])

   if (isFetching) return <Loader/>
   
  return (
    <> 
   {!minified && ( <div className="search-crypto">
       <Input type="text" placeholder="Search Cryptocurrency"
          onChange = {(event) => setSearchItem(event.target.value)}
        />
     </div>) }
    


     <Row gutter={[31,31]} className="crypto-card-container">
         {
          cryptos?.map((currency:currency)=>(
           <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.uuid} >
             <Link to={`/crypto/${currency.uuid}`}>
               <Card 
                 title={`${currency.rank}. ${currency.name}`}
                 extra={<img alt={`${currency.name}`} className="crypto-image" src={currency.iconUrl} />}
                 hoverable
                 >
                  <p>Price: {millify(currency.price)} </p>
                  <p>Market Cao: {millify(currency.marketCap)} </p>
                  <p>Daily Change: {millify(currency.change)} </p>

               </Card>
             </Link>        
           </Col>

          ))
         }
     </Row>
    </>
  )
}
