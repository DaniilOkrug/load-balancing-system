import { FC } from "react";

import { Accordion } from "react-bootstrap";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const chartData = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

interface AccordionsProps {
  data: any[];
}

const Accordions: FC<AccordionsProps> = ({ data }) => {
  return (
    <Accordion defaultActiveKey="0">
      {data.map((item, index: number) => {
        const currentCPU = item.data[item.data.length - 1].cpu.toFixed(2);
        const currentRAM = item.data[item.data.length - 1].ram.toFixed(2);
        return (
          <Accordion.Item eventKey={`${index}`} key={`${index}`}>
            <Accordion.Header>
              <div className="metrics-header">
                <p>Server {item.address}</p>
                <p>
                  <b>
                    Current load: CPU: {currentCPU}% RAM: {currentRAM}%
                  </b>
                </p>
              </div>
            </Accordion.Header>
            <Accordion.Body className="metrics">
              <LineChart
                width={700}
                height={300}
                data={item.data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="ram"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="cpu" stroke="#82ca9d" />
              </LineChart>
            </Accordion.Body>
          </Accordion.Item>
        );
      })}
    </Accordion>
  );
};

export default Accordions;
