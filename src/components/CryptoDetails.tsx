import { useState } from "react";
import { useParams } from "react-router-dom";
import millify from "millify";
import { Col, Row, Typography, Select } from "antd";

import {
  MoneyCollectTwoTone,
  DollarCircleTwoTone,
  FundTwoTone,
  ExclamationCircleTwoTone,
  StopTwoTone,
  TrophyTwoTone,
  CheckCircleTwoTone,
  NumberOutlined,
  ThunderboltTwoTone,
} from "@ant-design/icons";

import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from "../services/cryptoApi";
import { MyLineChart } from "./LineChart";
import { Loader } from "./Loader";

const { Title, Text } = Typography;
const { Option } = Select;

type link = {
  name: string;
  type: string;
  url: string;
};

export const CryptoDetails = () => {
  const { uuid } = useParams();
  const [timePeriod, SetTimePeriod] = useState("7d");
  const { data, isFetching } = useGetCryptoDetailsQuery(uuid);
  const { data: coinData } = useGetCryptoHistoryQuery({ uuid, timePeriod });
  if (isFetching) return <Loader/>;

  const cryptoDetails = data?.data?.coin;
  

  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];

  const stats = [
    {
      title: "Price to USD",
      value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`,
      icon: <DollarCircleTwoTone />,
    },
    {
      title: "Rank",
      value: cryptoDetails?.rank,
      icon: <NumberOutlined style={{ color: "#0375e0" }} />,
    },
    {
      title: "24h Volume",
      value: `$ ${
        cryptoDetails &&
        cryptoDetails["24hVolume"] &&
        millify(cryptoDetails["24hVolume"])
      }`,
      icon: <ThunderboltTwoTone />,
    },
    {
      title: "Market Cap",
      value: `$ ${
        cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)
      }`,
      icon: <DollarCircleTwoTone />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${
        cryptoDetails?.allTimeHigh?.price &&
        millify(cryptoDetails?.allTimeHigh?.price)
      }`,
      icon: <TrophyTwoTone />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: cryptoDetails?.numberOfMarkets,
      icon: <FundTwoTone />,
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails?.numberOfExchanges,
      icon: <MoneyCollectTwoTone />,
    },
    {
      title: "Approved Supply",
      value: cryptoDetails?.supply?.confirmed ? (
        <CheckCircleTwoTone />
      ) : (
        <StopTwoTone />
      ),
      icon: <ExclamationCircleTwoTone />,
    },
    {
      title: "Total Supply",
      value: `$ ${
        cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)
      }`,
      icon: <ExclamationCircleTwoTone />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${
        cryptoDetails?.supply?.circulating &&
        millify(cryptoDetails?.supply?.circulating)
      }`,
      icon: <ExclamationCircleTwoTone />,
    },
  ];

  

  return (
    <Col className="coin-detail-container">
      <Col className="coin-heading-container">
        <Title level={2} className="coin-name">
          {cryptoDetails?.name} {cryptoDetails?.symbol} Price
        </Title>
        <p>
          {cryptoDetails?.name} Live Price in us dollar. View value statistics,
          market cap and supply.
        </p>
      </Col>
      <Select style={{position:"relative", left:"50px", top:"-35px"}}
        defaultValue="7d"
        className="select-timeperiod"
        placeholder="Select Time Period"
        onChange={(value) => SetTimePeriod(value)}
      >
        {time.map((date) => (
          <Option key={date}>{date}</Option>
        ))}
      </Select>
      <MyLineChart
        coinData={coinData}
        currentPrice={millify(cryptoDetails?.price)}
        coinName={cryptoDetails?.name}
      />
      <Col className="stats-container">
        <Col className="coin-value-statistics">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">
              {cryptoDetails?.name} Value Statistics
            </Title>
            <p>An overview showing the stats of {cryptoDetails?.name}</p>
          </Col>
          {stats.map(({ icon, title, value }) => (
            <Col key={`${title}-${value}`} className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>

        <Col className="other-stats-info">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">
              Other Statistics
            </Title>
            <p>An overview showing the stats of all cryptocurrencies</p>
          </Col>
          {genericStats.map(({ icon, title, value }) => (
            <Col key={`${title}-${value}`} className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>
      <Col className="coin-desk-link">
        <Row className="coin-desk">
          <Title style={{position:"relative",right:"-35px"}} level={3} className="coin-details-heading">
            What is {cryptoDetails?.name} ?
          </Title>
        <p style={{position:"relative",right:"-35px"}} >  {cryptoDetails?.description} </p>
        </Row>
        <Col className="coin-links">
          <Title level={3} className="coin-details-heading">
            {cryptoDetails?.name} Links
          </Title>
          {cryptoDetails?.links?.map((link: link) => (
            <Row className="coin-link" key={link.name}>
              <Title level={5} className="link-name">
                {link.type}
              </Title>
              <a href={link.url} target="_blank" rel="noreferrer">
                {link.name}
              </a>
            </Row>
          ))}
        </Col>
      </Col>
    </Col>
  );
};
