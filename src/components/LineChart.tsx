import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Col, Row, Typography } from "antd";
import millify from 'millify';
const { Title } = Typography;

type LineChartProps = {
    coinData: {
        data: { history: Array<{ price: string, timestamp: number }>; change: string; }
    };
    currentPrice: string;
    coinName: string;
}

export const MyLineChart = ({ coinData, currentPrice, coinName }: LineChartProps) => {
    console.log(coinData?.data?.change);
    const data = [];

    for (let i = 0; i < coinData?.data?.history.length; i++) {
        data.push({
            price: coinData?.data?.history[i].price,
            name: new Date(coinData?.data?.history[i].timestamp).toLocaleDateString()
        });
    }

    const prices = data.map(item => parseFloat(item.price));
    const minPrice = Math.min(...prices) - 500;
    const maxPrice = Math.max(...prices) + 500;

    return (
        <>
            <Row className="chart-header">
                <Title style={{position:"relative", left:"50px", top:"-30px"}} level={2} className="chart-title">{coinName} Price Chart</Title>
                <Col style={{position:"relative", right:"-90px",top:"-10px"}} className="price-container">
                    <Title level={5} className="price-change">
                    {coinName} change: {coinData?.data?.change}
                    </Title>
                    <Title level={5} className="current-price">
                        Current  {coinName} Price:${currentPrice}
                    </Title>
                    <Title>

                    </Title>

                </Col>
            </Row>
            <LineChart
            
                width={640}
                height={440}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis  tickFormatter={(tickItem) => millify(tickItem)} domain={[minPrice, maxPrice]} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="price" stroke="#7a75dd" activeDot={{ r: 8 }} />
            </LineChart>
        </>
    )
}