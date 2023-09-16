import { Select,Typography, Row, Col, Avatar, Card } from "antd"
import moment from "moment"
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { useState } from "react";
import { Loader } from "./Loader";

const {Text, Title} = Typography
const {Option} = Select;

type coin = {
  name:string
}
type newsProps = {
  minified:boolean
}
type image = {
   
  thumbnail:{
    contentUrl:string
  }
}

type news ={
  url:string;
  name:string;
  description:string;
  image:image;
  provider:[{image:image,name:string}];
  datePublished : Date
 
}



export const News = ({minified}:newsProps) => {
  const [newsCategory, setNewsCategory] =useState("cryptocurrency")
  const {data : cryptoNews} = useGetCryptoNewsQuery({newsCategory,
   count: minified ? 6 :12 })
   const { data} = useGetCryptosQuery(100);
    const defaultImage = "/assets/news.svg"
   if ( !cryptoNews?.value ) return <Loader/>
  return (
    <Row gutter={[24,24]}>
      {!minified && (
        <Select
        showSearch
        className="select-news"        
        placeholder="Select a coin"
        optionFilterProp="children"
        onChange={(value)=>(setNewsCategory(value))}
        filterOption={(input, option) =>
         option && option.value ? option.value.toString().toLowerCase().includes(input.toLowerCase())
          : false}
    
        >
         <Option value="cryptocurrency">Cryptocurrency</Option>
         {data?.data?.coins.map((coin:coin)=><Option value={coin.name}>{coin.name}</Option>)}
        </Select>
      )}

      {cryptoNews.value.map((news:news, index:number)=>(
        <Col xs={24} sm={12} lg={8} key={`${index}-${news.name}`}>
          <Card className="news-card" hoverable>
           <a href={news.url} target="_blank" rel="noreferrer" >
             <div className="news-image-container">
              <Title className="news-title" level={4}>
                {news.name}
              </Title>
              <img  src={news?.image?.thumbnail?.contentUrl || defaultImage } alt="news"  />
             </div>
             <p>{
               news.description.length > 100 ? `${news.description.substring(0,100)}...`
               :news.description
              }</p>
              <div className="provider-container">
                   <div>
                    <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || defaultImage} />
                    <Text className="provider-name">{news.provider[0]?.name}</Text>
                   </div>
                   <Text>{moment(news.datePublished).startOf("day").fromNow()}</Text>
              </div>
           </a>
          </Card>
        </Col>
      ))
    }</Row>
  )
}
